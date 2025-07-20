# Abstract Factory Pattern in C# - Full Notes

## ✅ Purpose

The Abstract Factory Pattern provides an interface for creating **families of related or dependent objects** without specifying their concrete classes.

It promotes consistency among products and enables switching between product families easily.

---

## ✅ When to Use

* You want to create multiple families of related objects.
* You want to isolate the client code from concrete implementations.
* You want to support theme, platform, or brand-specific object variations.

---

## ✅ Real-World Analogy

A UI toolkit with different themes:

* **DarkUIFactory** creates `DarkButton`, `DarkTextBox`, etc.
* **LightUIFactory** creates `LightButton`, `LightTextBox`, etc.

The client works only with interfaces like `IButton`, `ITextBox`, and `IUIFactory`.

---

## ✅ Structure

1. **Abstract Product Interfaces**
2. **Concrete Products** (Group into families)
3. **Abstract Factory Interface**
4. **Concrete Factories** (One per product family)
5. **Client Code** (Consumes abstract factory)
6. **Factory Selector** (Optional: used to select factory dynamically)

---

## ✅ Full C# Implementation

### 1. Product Interfaces

```csharp
public interface IButton
{
    void Paint();
}

public interface ITextBox
{
    void Render();
}
```

---

### 2. Concrete Products (Two families: Dark and Light)

```csharp
// Dark Family
public class DarkButton : IButton
{
    public void Paint()
    {
        Console.WriteLine("Dark Button");
    }
}

public class DarkTextBox : ITextBox
{
    public void Render()
    {
        Console.WriteLine("Dark TextBox");
    }
}

// Light Family
public class LightButton : IButton
{
    public void Paint()
    {
        Console.WriteLine("Light Button");
    }
}

public class LightTextBox : ITextBox
{
    public void Render()
    {
        Console.WriteLine("Light TextBox");
    }
}
```

---

### 3. Abstract Factory Interface

```csharp
public interface IUIFactory
{
    IButton CreateButton();
    ITextBox CreateTextBox();
}
```

---

### 4. Concrete Factories

```csharp
public class DarkUIFactory : IUIFactory
{
    public IButton CreateButton() => new DarkButton();
    public ITextBox CreateTextBox() => new DarkTextBox();
}

public class LightUIFactory : IUIFactory
{
    public IButton CreateButton() => new LightButton();
    public ITextBox CreateTextBox() => new LightTextBox();
}
```

---

### 5. Client Code

```csharp
public class Application
{
    private readonly IButton _button;
    private readonly ITextBox _textBox;

    public Application(IUIFactory factory)
    {
        _button = factory.CreateButton();
        _textBox = factory.CreateTextBox();
    }

    public void RenderUI()
    {
        _button.Paint();
        _textBox.Render();
    }
}
```

---

### 6. Factory Selector (Dynamic Switching Based on Request)

```csharp
public interface IUIFactorySelector
{
    IUIFactory GetFactory();
}

public class UIBasedFactorySelector : IUIFactorySelector
{
    private readonly DarkUIFactory _darkFactory;
    private readonly LightUIFactory _lightFactory;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UIBasedFactorySelector(
        DarkUIFactory darkFactory,
        LightUIFactory lightFactory,
        IHttpContextAccessor httpContextAccessor)
    {
        _darkFactory = darkFactory;
        _lightFactory = lightFactory;
        _httpContextAccessor = httpContextAccessor;
    }

    public IUIFactory GetFactory()
    {
        var theme = _httpContextAccessor.HttpContext?.Request?.Query["theme"].ToString();
        return theme == "light" ? _lightFactory : _darkFactory;
    }
}
```

---

## ✅ Program.cs / Startup.cs Configuration

```csharp
builder.Services.AddSingleton<DarkUIFactory>();
builder.Services.AddSingleton<LightUIFactory>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<IUIFactorySelector, UIBasedFactorySelector>();

builder.Services.AddScoped<Application>(provider =>
{
    var selector = provider.GetRequiredService<IUIFactorySelector>();
    return new Application(selector.GetFactory());
});
```

---

## ✅ Controller Example

```csharp
public class HomeController : Controller
{
    private readonly Application _app;

    public HomeController(Application app)
    {
        _app = app;
    }

    public IActionResult Index()
    {
        _app.RenderUI();
        return View();
    }
}
```

---

## ✅ Example Request URLs

* `/home/index?theme=dark` → renders dark theme components
* `/home/index?theme=light` → renders light theme components

---

## ✅ Benefits of Abstract Factory Pattern

* Supports consistent object families (Dark/Light themes)
* Avoids hardcoding class names in client code
* Supports runtime switching (using Factory Selector)
* Simplifies testing and mocking by using interfaces

---

## ✅ Summary Table

| Component                         | Role                                  |
| --------------------------------- | ------------------------------------- |
| `IButton`, `ITextBox`             | Abstract product interfaces           |
| `DarkButton`, `LightButton`       | Concrete product families             |
| `IUIFactory`                      | Abstract factory interface            |
| `DarkUIFactory`, `LightUIFactory` | Concrete factories per family         |
| `Application`                     | Client that uses the abstract factory |
| `UIBasedFactorySelector`          | Selects factory based on context      |

---

Let me know if you'd like this exported as a PDF or want to add diagrammatic representation or test cases.
