In C#, **design patterns** are **proven solutions to common problems** in software design. They help you write **cleaner, reusable, and maintainable** code. Let's explore them in a structured, easy-to-remember way.

---

## 🧠 Classification of Design Patterns

Design patterns are broadly classified into **three categories**:

| Category       | Purpose                         | Examples                               |
| -------------- | ------------------------------- | -------------------------------------- |
| **Creational** | Object creation logic           | Singleton, Factory, Builder, Prototype |
| **Structural** | Class and object composition    | Adapter, Facade, Decorator, Proxy      |
| **Behavioral** | Object communication & behavior | Observer, Strategy, Command, State     |

---

## 🔧 1. **Creational Patterns**

| Pattern              | Purpose                                           | Example                            |
| -------------------- | ------------------------------------------------- | ---------------------------------- |
| **Singleton**        | Only one instance of a class                      | Logger, Configuration              |
| **Factory Method**   | Create object based on input                      | ShapeFactory: `GetShape("Circle")` |
| **Abstract Factory** | Create related objects without specifying classes | UI Toolkit for Windows/Mac         |
| **Builder**          | Step-by-step object construction                  | Building a complex `HtmlDocument`  |
| **Prototype**        | Clone an existing object                          | Copy game character or document    |

---

## 🏗️ 2. **Structural Patterns**

| Pattern       | Purpose                                        | Example                                     |
| ------------- | ---------------------------------------------- | ------------------------------------------- |
| **Adapter**   | Make two incompatible interfaces work together | `SqlDataReader` adapter                     |
| **Decorator** | Add behavior without changing original class   | Adding logging/auth to service              |
| **Facade**    | Simplify complex subsystem                     | `System.IO` wrapper, `DbFacade`             |
| **Proxy**     | Control access to another object               | Virtual proxy, Lazy loading, Security proxy |
| **Bridge**    | Separate abstraction from implementation       | UI rendering to different devices           |
| **Composite** | Treat individual and group of objects the same | Tree structure (files & folders)            |
| **Flyweight** | Share common state across instances            | Characters in a text editor                 |

---

## 🔄 3. **Behavioral Patterns**

| Pattern                     | Purpose                                              | Example                                  |
| --------------------------- | ---------------------------------------------------- | ---------------------------------------- |
| **Observer**                | Notify objects on state change                       | Event handling, `INotifyPropertyChanged` |
| **Strategy**                | Swap algorithms dynamically                          | Sorting strategies, Compression          |
| **Command**                 | Encapsulate request as object                        | Undo/Redo, Button click handling         |
| **State**                   | Change behavior based on state                       | UI button state, Workflow steps          |
| **Template Method**         | Base class defines skeleton, derived overrides steps | `OnStart`, `OnStop` in services          |
| **Mediator**                | Central class for communication                      | ChatRoom, Form control coordination      |
| **Chain of Responsibility** | Pass request through chain                           | Logging levels, Request filtering        |
| **Iterator**                | Traverse a collection                                | `foreach`, custom enumerators            |
| **Memento**                 | Save/restore object state                            | Undo feature                             |
| **Visitor**                 | Separate operation from object                       | File system structure + operation        |

---

## 🔥 Most Common Patterns in C# Interviews

| Pattern                                | Common Use                             |
| -------------------------------------- | -------------------------------------- |
| Singleton                              | Logging, Configuration                 |
| Factory                                | Object creation abstraction            |
| Strategy                               | Dynamic behavior                       |
| Observer                               | Event-driven design                    |
| Decorator                              | Extend behavior without modifying code |
| Repository + Unit of Work (Enterprise) | Data access patterns in ASP.NET Core   |

---

## ✅ Simple Example – **Factory Pattern**

```csharp
// Product interface
interface IShape {
    void Draw();
}

// Concrete products
class Circle : IShape {
    public void Draw() => Console.WriteLine("Circle drawn");
}
class Square : IShape {
    public void Draw() => Console.WriteLine("Square drawn");
}

// Factory
class ShapeFactory {
    public IShape GetShape(string type) {
        return type switch {
            "circle" => new Circle(),
            "square" => new Square(),
            _ => throw new ArgumentException("Invalid shape")
        };
    }
}
```

---

## 🧰 Tools & Frameworks Using Patterns

| Pattern   | Used In                                   |
| --------- | ----------------------------------------- |
| Singleton | `DbContext`, `HttpClientFactory`          |
| Observer  | Events, Delegates, INotifyPropertyChanged |
| Strategy  | DI with multiple implementations          |
| Decorator | Middleware in ASP.NET Core                |
| Factory   | `ILoggerFactory`, `IServiceProvider`      |

---

## 🧠 Memory Tip: **GoF → “Gang of Four” Patterns**

All of the above patterns are from the famous **"Gang of Four"** book: *Design Patterns – Elements of Reusable Object-Oriented Software*.

---

Would you like:

* A **PDF cheat sheet** of all patterns?
* C# code examples of each?
* A real-world **project with 5–6 patterns used together**?
