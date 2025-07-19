Absolutely, Vatan! Let’s go through a **real-life, practical C# example** of the **Liskov Substitution Principle (LSP)** — one that shows where things can go wrong **if you break it**, and how to fix it.

---

## ✅ **LSP Reminder**:

> **A derived class must be substitutable for its base class** without breaking the program’s correctness or expectations.

---

## 🧠 Real-World Scenario: **Document Saving System**

Suppose we have a document app that saves files. Most documents are **writable**, but **ReadOnlyDocuments** (like downloaded PDFs) should **not** be saved.

---

## ❌ LSP Violation: Misleading inheritance

```csharp
class Document
{
    public virtual void Save()
    {
        Console.WriteLine("Document saved.");
    }
}

class ReadOnlyDocument : Document
{
    public override void Save()
    {
        throw new InvalidOperationException("Read-only document cannot be saved.");
    }
}
```

### 🔥 Problem:

```csharp
Document doc = new ReadOnlyDocument();
doc.Save();  // ❌ Throws at runtime!
```

* The base class **promised** that `Save()` works.
* But the derived class **broke** that promise.
* ✅ **Inherits behavior** ❌ **But not substitutable** → **Violates LSP**

---

## ✅ LSP-Compliant Design (Fix)

Use **composition** or separate **interface hierarchy** instead of inheritance.

### Step 1: Define capability with an interface

```csharp
interface ISavable
{
    void Save();
}
```

### Step 2: Implement only where valid

```csharp
class Document { }  // Base type, no save implied

class WritableDocument : Document, ISavable
{
    public void Save()
    {
        Console.WriteLine("Writable document saved.");
    }
}

class ReadOnlyDocument : Document
{
    // no Save method — cannot be saved
}
```

### ✅ Usage:

```csharp
void TrySave(Document doc)
{
    if (doc is ISavable savable)
        savable.Save();
    else
        Console.WriteLine("Cannot save this document.");
}

TrySave(new WritableDocument());   // ✅ Saves
TrySave(new ReadOnlyDocument());  // ✅ Safe, won't crash
```

---

## ✅ LSP Preserved:

* We never call `Save()` on a `ReadOnlyDocument` — because it doesn’t claim to support it.
* Subtypes of `Document` don’t break base class expectations.
* **Behavior is guaranteed and safe.**

---

## 🧠 Real-Life Takeaway

| Bad Design                           | Good Design                                   |
| ------------------------------------ | --------------------------------------------- |
| Forcing all types to behave the same | Only types that support behavior implement it |
| Inheritance for capability           | Interfaces for capability                     |
| Exceptions at runtime                | Compile-time safety                           |

---

## 🎯 Summary

> 🔥 **Don’t inherit behavior your subclass can’t fulfill.**
> Use **interfaces** to model capability instead of blindly using inheritance.

Would you like a version of this example integrated into a testable console app or unit-test-ready project structure?
