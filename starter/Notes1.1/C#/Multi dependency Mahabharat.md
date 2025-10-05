Here you go, Vatan 👑 — your entire Mahabharata-Themed Payment Strategy Pattern converted into a clean, copy-paste-ready Markdown file (PaymentStrategy_Mahabharata.md).

You can paste this directly into your project’s root folder and view it beautifully formatted in GitHub or VS Code.


---

# 🏹 Payment Strategy Pattern — Mahabharata Edition

## 📖 Story Summary

In the kingdom of **AryavartaPay**, payments are sacred duties.  
Each class in your architecture is embodied by a legendary **Mahabharata** character.  
Every character has a distinct role — no overlaps, no mixing.

---

## 🧠 Character–Class Mapping

| Class | Character | Role |
|-------|------------|------|
| `PaymentRequest` | **Yudhishthira** | Initiates the payment |
| `IPaymentStrategy` | **Ved Vyasa** | Defines the strategy contract |
| `CardPaymentStrategy` | **Arjuna** | Handles card payments |
| `UpiPaymentStrategy` | **Nakula** | Handles UPI payments |
| `WalletPaymentStrategy` | **Bhima** | Handles wallet payments |
| `PaymentStrategyResolver` | **Krishna** | Resolves the correct strategy |
| `PaymentProcessor` | **Brahma** | Executes the resolved strategy |
| `DI Container` | **Sabha** | Registers all characters |

---

## 🧭 Class Interaction Diagram

Yudhishthira (PaymentRequest) │ ▼ Brahma (PaymentProcessor) │ ▼ Krishna (PaymentStrategyResolver) │ ├──▶ Arjuna (CardPaymentStrategy) ├──▶ Nakula (UpiPaymentStrategy) └──▶ Bhima (WalletPaymentStrategy)

---

## 🧱 Dependency Injection Diagram

Sabha (DI Container) │ ├──▶ IPaymentStrategy │     ├──▶ Arjuna │     ├──▶ Nakula │     └──▶ Bhima │ ├──▶ Krishna (Resolver) │     └──▶ IEnumerable<IPaymentStrategy> │ └──▶ Brahma (Processor) └──▶ Krishna

---

## 📦 Folder Structure

AryavartaPay/ ├── Controllers/ │   └── PaymentsController.cs ├── Models/ │   ├── PaymentMethod.cs │   └── PaymentRequest.cs ├── Strategies/ │   ├── IPaymentStrategy.cs │   ├── CardPaymentStrategy.cs │   ├── UpiPaymentStrategy.cs │   └── WalletPaymentStrategy.cs ├── Services/ │   ├── PaymentStrategyResolver.cs │   └── PaymentProcessor.cs └── Program.cs

---

## 📦 Models

### `PaymentMethod.cs`

```csharp
namespace AryavartaPay.Models
{
    public enum PaymentMethod
    {
        Card,
        Upi,
        Wallet
    }
}

PaymentRequest.cs — Yudhishthira

namespace AryavartaPay.Models
{
    public class PaymentRequest
    {
        public PaymentMethod Method { get; set; }
        public decimal Amount { get; set; }
        public string CustomerId { get; set; }
    }
}


---

🧠 Strategy Interface — Ved Vyasa

IPaymentStrategy.cs

using AryavartaPay.Models;

namespace AryavartaPay.Strategies
{
    public interface IPaymentStrategy
    {
        PaymentMethod SupportedMethod { get; }
        void ProcessPayment(PaymentRequest request);
    }
}


---

⚔️ Strategy Implementations

CardPaymentStrategy.cs — Arjuna

using AryavartaPay.Models;

namespace AryavartaPay.Strategies
{
    public class CardPaymentStrategy : IPaymentStrategy
    {
        public PaymentMethod SupportedMethod => PaymentMethod.Card;

        public void ProcessPayment(PaymentRequest request)
        {
            Console.WriteLine($"[Arjuna] Card payment of ₹{request.Amount} for {request.CustomerId}");
        }
    }
}

UpiPaymentStrategy.cs — Nakula

using AryavartaPay.Models;

namespace AryavartaPay.Strategies
{
    public class UpiPaymentStrategy : IPaymentStrategy
    {
        public PaymentMethod SupportedMethod => PaymentMethod.Upi;

        public void ProcessPayment(PaymentRequest request)
        {
            Console.WriteLine($"[Nakula] UPI payment of ₹{request.Amount} for {request.CustomerId}");
        }
    }
}

WalletPaymentStrategy.cs — Bhima

using AryavartaPay.Models;

namespace AryavartaPay.Strategies
{
    public class WalletPaymentStrategy : IPaymentStrategy
    {
        public PaymentMethod SupportedMethod => PaymentMethod.Wallet;

        public void ProcessPayment(PaymentRequest request)
        {
            Console.WriteLine($"[Bhima] Wallet payment of ₹{request.Amount} for {request.CustomerId}");
        }
    }
}


---

🧠 Resolver — Krishna

PaymentStrategyResolver.cs

using AryavartaPay.Models;
using AryavartaPay.Strategies;

namespace AryavartaPay.Services
{
    public class PaymentStrategyResolver
    {
        private readonly IDictionary<PaymentMethod, IPaymentStrategy> _strategies;

        public PaymentStrategyResolver(IEnumerable<IPaymentStrategy> strategies)
        {
            _strategies = strategies.ToDictionary(s => s.SupportedMethod);
        }

        public IPaymentStrategy Resolve(PaymentMethod method)
        {
            if (_strategies.TryGetValue(method, out var strategy))
                return strategy;

            throw new NotSupportedException($"No strategy found for {method}");
        }
    }
}


---

🧑‍🎨 Processor — Brahma

PaymentProcessor.cs

using AryavartaPay.Models;

namespace AryavartaPay.Services
{
    public class PaymentProcessor
    {
        private readonly PaymentStrategyResolver _resolver;

        public PaymentProcessor(PaymentStrategyResolver resolver)
        {
            _resolver = resolver;
        }

        public void Process(PaymentRequest request)
        {
            var strategy = _resolver.Resolve(request.Method);
            strategy.ProcessPayment(request);
        }
    }
}


---

🌐 Controller

PaymentsController.cs

using AryavartaPay.Models;
using AryavartaPay.Services;
using Microsoft.AspNetCore.Mvc;

namespace AryavartaPay.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentProcessor _processor;

        public PaymentsController(PaymentProcessor processor)
        {
            _processor = processor;
        }

        [HttpPost]
        public IActionResult ProcessPayment([FromBody] PaymentRequest request)
        {
            _processor.Process(request);
            return Ok("Payment processed successfully");
        }
    }
}


---

🏛️ DI Setup — Sabha

Program.cs

using AryavartaPay.Strategies;
using AryavartaPay.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<IPaymentStrategy, CardPaymentStrategy>();   // Arjuna
builder.Services.AddTransient<IPaymentStrategy, UpiPaymentStrategy>();    // Nakula
builder.Services.AddTransient<IPaymentStrategy, WalletPaymentStrategy>(); // Bhima

builder.Services.AddSingleton<PaymentStrategyResolver>(); // Krishna
builder.Services.AddTransient<PaymentProcessor>();        // Brahma

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();
app.MapControllers();

app.Run();


---

📬 Sample Request — Yudhishthira’s Scroll

POST /api/payments
Content-Type: application/json

{
  "method": "Upi",
  "amount": 2500,
  "customerId": "vatan123"
}


---

✨ Optional Extensions

🧪 Add Draupadi as a unit-test orchestrator verifying each warrior’s payment.

📜 README.md with setup, build, and lore instructions.



---

> “In AryavartaPay, even a rupee flows through Dharma.”
— Ved Vyasa (System Architect)



---

Would you like me to also generate the **README.md** version (with setup instructions, running commands, and lore introduction at the top)?

