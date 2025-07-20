Absolutely, Vatan! Here's a clean and concise **SOLID Principles Notes** document with **C# examples**, based on everything we've discussed so far.

---

# ✅ **SOLID Principles with C# Examples**

---

## 🔸 1. **S — Single Responsibility Principle (SRP)**

> A class should have only **one reason to change**.

### ❌ Violation

```csharp
class Report
{
    public void Generate() { /* logic */ }
    public void SaveToFile() { /* file IO logic */ }
}
```

### ✅ SRP Applied

```csharp
class ReportGenerator { public void Generate() { /* logic */ } }
class ReportSaver     { public void SaveToFile() { /* file IO */ } }
```

---

## 🔸 2. **O — Open/Closed Principle (OCP)**

> Software should be **open for extension**, but **closed for modification**.

### ✅ Example using `interface`

```csharp
interface IShape { double Area(); }

class Circle : IShape
{
    public double Radius;
    public double Area() => Math.PI * Radius * Radius;
}

class Square : IShape
{
    public double Side;
    public double Area() => Side * Side;
}

class AreaCalculator
{
    public double TotalArea(IShape[] shapes) => shapes.Sum(s => s.Area());
}
```

✔ You can add new shapes without modifying `AreaCalculator`.

---

## 🔸 3. **L — Liskov Substitution Principle (LSP)**

> Subtypes must be **substitutable** for their base types **without breaking behavior**.

### ❌ Violation

```csharp
class Bird { public virtual void Fly() => Console.WriteLine("Flying"); }

class Ostrich : Bird
{
    public override void Fly() => throw new NotSupportedException();
}
```

Calling `Fly()` on `Bird` breaks if object is `Ostrich` → ❌ LSP violated.

---

### ✅ LSP Fix (by splitting interfaces)

```csharp
interface IBird { }
interface IFlyingBird : IBird { void Fly(); }

class Sparrow : IFlyingBird
{
    public void Fly() => Console.WriteLine("Sparrow flying");
}

class Ostrich : IBird { /* doesn't fly */ }
```

✔ Now, only flying birds implement `Fly()`.

---

## 🔸 4. **I — Interface Segregation Principle (ISP)**

> Clients should not be forced to depend on methods they **do not use**.

### ❌ Violation

```csharp
interface IMachine
{
    void Print(); void Scan(); void Fax();
}

class SimplePrinter : IMachine
{
    public void Print() { }
    public void Scan() => throw new NotSupportedException();
    public void Fax() => throw new NotSupportedException();
}
```

### ✅ ISP Applied

```csharp
interface IPrinter { void Print(); }
interface IScanner { void Scan(); }

class SimplePrinter : IPrinter
{
    public void Print() { Console.WriteLine("Print only"); }
}
```

✔ Classes implement only what they need.

---

## 🔸 5. **D — Dependency Inversion Principle (DIP)**

> High-level modules should not depend on low-level modules.
> Both should depend on **abstractions**.

### ❌ Violation

```csharp
class EmailService
{
    public void Send(string msg) => Console.WriteLine("Email: " + msg);
}

class NotificationManager
{
    private EmailService service = new EmailService(); // tightly coupled
    public void Notify() => service.Send("Hello");
}
```

---

### ✅ DIP with IoC/DI

```csharp
interface IMessageService
{
    void Send(string message);
}

class EmailService : IMessageService
{
    public void Send(string msg) => Console.WriteLine("Email: " + msg);
}

class NotificationManager
{
    private readonly IMessageService _service;
    public NotificationManager(IMessageService service) => _service = service;
    public void Notify() => _service.Send("Hello");
}
```

### 🔧 Dependency Injection in ASP.NET Core:

```csharp
services.AddScoped<IMessageService, EmailService>();
services.AddScoped<NotificationManager>();
```

✔ Now `NotificationManager` doesn't depend on `EmailService` directly — it depends on `IMessageService`.

---

## 🧠 Summary Table

| Principle | Focus            | Key Idea                                |
| --------- | ---------------- | --------------------------------------- |
| SRP       | Responsibility   | One reason to change                    |
| OCP       | Extensibility    | Add new code, don’t modify old          |
| LSP       | Behavior         | Subtypes must not break expectations    |
| ISP       | Interface Design | Favor small, specific interfaces        |
| DIP       | Dependency       | Depend on abstractions, not concretions |

---

Would you like me to export this as a PDF or Word file, or organize this into a slide deck for presentation?
