Sure, Vatan! Here's a neat list of **simple and commonly asked .NET interview questions** based on **string operations in C#**, including **some LINQ-based** string problems.

---

## 🧠 ✅ .NET Interview: String Operation Questions (With Answers)

---

### 🔹 1. **Reverse a String**

```csharp
string input = "vatan";
string reversed = new string(input.Reverse().ToArray());
Console.WriteLine(reversed);  // Output: natav
```

---

### 🔹 2. **Check if a String is Palindrome**

```csharp
string input = "madam";
bool isPalindrome = input.SequenceEqual(input.Reverse());
Console.WriteLine(isPalindrome);  // Output: True
```

---

### 🔹 3. **Count Occurrence of a Character**

```csharp
string input = "vatan";
char target = 'a';
int count = input.Count(c => c == target);
Console.WriteLine(count);  // Output: 2
```

---

### 🔹 4. **Remove Duplicate Characters**

```csharp
string input = "banana";
string result = new string(input.Distinct().ToArray());
Console.WriteLine(result);  // Output: ban
```

---

### 🔹 5. **Find the First Non-Repeating Character**

```csharp
string input = "swiss";
char firstUnique = input
    .GroupBy(c => c)
    .Where(g => g.Count() == 1)
    .Select(g => g.Key)
    .FirstOrDefault();

Console.WriteLine(firstUnique);  // Output: w
```

---

### 🔹 6. **Check if Two Strings are Anagrams**

```csharp
string str1 = "listen";
string str2 = "silent";

bool areAnagrams = str1.OrderBy(c => c).SequenceEqual(str2.OrderBy(c => c));
Console.WriteLine(areAnagrams);  // Output: True
```

---

### 🔹 7. **Count Words in a Sentence**

```csharp
string sentence = "Hello world from Vatan";
int wordCount = sentence.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
Console.WriteLine(wordCount);  // Output: 4
```

---

### 🔹 8. **Convert First Letter of Each Word to Uppercase (Title Case)**

```csharp
string sentence = "hello world from vatan";
string titleCase = string.Join(" ", sentence
    .Split(' ')
    .Select(word => char.ToUpper(word[0]) + word.Substring(1)));

Console.WriteLine(titleCase);  // Output: Hello World From Vatan
```

---

### 🔹 9. **Check if a String Contains Only Digits**

```csharp
string input = "123456";
bool isNumeric = input.All(char.IsDigit);
Console.WriteLine(isNumeric);  // Output: True
```

---

### 🔹 10. **Count Frequency of Each Character**

```csharp
string input = "apple";
var frequency = input
    .GroupBy(c => c)
    .Select(g => new { Char = g.Key, Count = g.Count() });

foreach (var item in frequency)
{
    Console.WriteLine($"{item.Char} → {item.Count}");
}
// Output:
// a → 1
// p → 2
// l → 1
// e → 1
```

---

## 📚 Bonus LINQ-Based String Challenges

### 🔹 Get All Duplicate Characters from a String

```csharp
string input = "programming";
var duplicates = input
    .GroupBy(c => c)
    .Where(g => g.Count() > 1)
    .Select(g => g.Key);

Console.WriteLine(string.Join(", ", duplicates));  // Output: r, g, m
```

---

### 🔹 Find Longest Word in a Sentence

```csharp
string sentence = "I am learning string manipulation in C#";
string longest = sentence
    .Split(' ', StringSplitOptions.RemoveEmptyEntries)
    .OrderByDescending(w => w.Length)
    .FirstOrDefault();

Console.WriteLine(longest);  // Output: manipulation
```

---

## ✅ Summary Table

| Question          | Concept      | Technique             |
| ----------------- | ------------ | --------------------- |
| Reverse string    | Basic        | `Reverse()`           |
| Count char        | LINQ         | `Count(c => c == x)`  |
| Remove duplicates | LINQ         | `Distinct()`          |
| Palindrome        | Basic + LINQ | `SequenceEqual()`     |
| Title Case        | `Select()`   | String transformation |
| Char frequency    | Grouping     | `GroupBy()`           |
| Anagram check     | Sorting      | `OrderBy()`           |

---

Let me know if you'd like this as a PDF or want to include **unit test versions** of each for a clean demo project.
