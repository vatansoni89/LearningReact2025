Got it, Vatan! Below is a **complete beginner-friendly guide** to all **important SQL row/window operations**, with **full working queries, explanations, outputs**, and assumptions. This will help you **deeply understand** each function — as if you're learning it for the first time.

---

# 🧾 Full Guide to SQL Window Row Operations

*With `PARTITION BY`, `ORDER BY`, full queries, and sample outputs*

---

## 🎯 Sample Table: `Employees`

We'll use this throughout:

```sql
CREATE TABLE Employees (
  EmpID INT,
  Name VARCHAR(50),
  Department VARCHAR(50),
  Salary INT,
  HireDate DATE
);

INSERT INTO Employees VALUES
(1, 'Alice', 'HR',     90000, '2020-01-01'),
(2, 'Bob',   'HR',     90000, '2020-03-01'),
(3, 'Eve',   'HR',     70000, '2021-02-01'),
(4, 'Tom',   'IT',     80000, '2021-01-01'),
(5, 'Sam',   'IT',     70000, '2021-05-01'),
(6, 'Mia',   'IT',     70000, '2021-06-01'),
(7, 'Raj',   'IT',     60000, '2022-01-01');
```

---

## 1️⃣ `ROW_NUMBER()`

### 🔹 Purpose:

Gives **unique sequential number** per row within partition.

### 🔹 Query:

```sql
SELECT *,
  ROW_NUMBER() OVER (PARTITION BY Department ORDER BY Salary DESC) AS RowNum
FROM Employees;
```

### 🔹 Output:

| Name  | Department | Salary | RowNum |
| ----- | ---------- | ------ | ------ |
| Alice | HR         | 90000  | 1      |
| Bob   | HR         | 90000  | 2      |
| Eve   | HR         | 70000  | 3      |
| Tom   | IT         | 80000  | 1      |
| Sam   | IT         | 70000  | 2      |
| Mia   | IT         | 70000  | 3      |
| Raj   | IT         | 60000  | 4      |

### 🔹 Notes:

* Always unique — even if salaries match.
* Use in **pagination** and **top-N per group** scenarios.

---

## 2️⃣ `RANK()`

### 🔹 Purpose:

Ranks rows. **Tied values get same rank**, and next rank is **skipped**.

### 🔹 Query:

```sql
SELECT *,
  RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) AS SalaryRank
FROM Employees;
```

### 🔹 Output (HR shown):

| Name  | Salary | SalaryRank |
| ----- | ------ | ---------- |
| Alice | 90000  | 1          |
| Bob   | 90000  | 1          |
| Eve   | 70000  | 3          |

### 🔹 Notes:

* Rank skips numbers: 1, 1, 3
* Best when **rank-based reward** system needed (with gaps).

---

## 3️⃣ `DENSE_RANK()`

### 🔹 Purpose:

Same as `RANK()`, but **no skipping** of ranks.

### 🔹 Query:

```sql
SELECT *,
  DENSE_RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) AS DenseRank
FROM Employees;
```

### 🔹 Output (HR shown):

| Name  | Salary | DenseRank |
| ----- | ------ | --------- |
| Alice | 90000  | 1         |
| Bob   | 90000  | 1         |
| Eve   | 70000  | 2         |

---

## 4️⃣ `NTILE(n)`

### 🔹 Purpose:

Divides partition into **n equal buckets**.

### 🔹 Query:

```sql
SELECT *,
  NTILE(2) OVER (PARTITION BY Department ORDER BY Salary DESC) AS Quartile
FROM Employees;
```

### 🔹 Output (HR shown):

| Name  | Salary | Quartile |
| ----- | ------ | -------- |
| Alice | 90000  | 1        |
| Bob   | 90000  | 1        |
| Eve   | 70000  | 2        |

---

## 5️⃣ `LAG()` (Previous Row)

### 🔹 Purpose:

Get **previous row’s value** in the partition.

### 🔹 Query:

```sql
SELECT *,
  LAG(Salary) OVER (PARTITION BY Department ORDER BY HireDate) AS PrevSalary
FROM Employees;
```

### 🔹 Output (HR shown):

| Name  | HireDate   | Salary | PrevSalary |
| ----- | ---------- | ------ | ---------- |
| Alice | 2020-01-01 | 90000  | NULL       |
| Bob   | 2020-03-01 | 90000  | 90000      |
| Eve   | 2021-02-01 | 70000  | 90000      |

---

## 6️⃣ `LEAD()` (Next Row)

### 🔹 Purpose:

Get **next row’s value** in the partition.

### 🔹 Query:

```sql
SELECT *,
  LEAD(Salary) OVER (PARTITION BY Department ORDER BY HireDate) AS NextSalary
FROM Employees;
```

### 🔹 Output (HR shown):

| Name  | HireDate   | Salary | NextSalary |
| ----- | ---------- | ------ | ---------- |
| Alice | 2020-01-01 | 90000  | 90000      |
| Bob   | 2020-03-01 | 90000  | 70000      |
| Eve   | 2021-02-01 | 70000  | NULL       |

---

## 7️⃣ `FIRST_VALUE()`

### 🔹 Purpose:

Returns **first value** from ordered partition.

### 🔹 Query:

```sql
SELECT *,
  FIRST_VALUE(Salary) OVER (PARTITION BY Department ORDER BY HireDate) AS FirstSalary
FROM Employees;
```

### 🔹 Output (HR shown):

| Name  | HireDate   | Salary | FirstSalary |
| ----- | ---------- | ------ | ----------- |
| Alice | 2020-01-01 | 90000  | 90000       |
| Bob   | 2020-03-01 | 90000  | 90000       |
| Eve   | 2021-02-01 | 70000  | 90000       |

---

## 8️⃣ `LAST_VALUE()` (⚠ Needs frame clause)

### 🔹 Purpose:

Gets the **last value** in window. Needs explicit frame.

### 🔹 Query:

```sql
SELECT *,
  LAST_VALUE(Salary) OVER (
    PARTITION BY Department 
    ORDER BY HireDate 
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS LastSalary
FROM Employees;
```

### 🔹 Output (HR shown):

| Name  | HireDate   | Salary | LastSalary |
| ----- | ---------- | ------ | ---------- |
| Alice | 2020-01-01 | 90000  | 70000      |
| Bob   | 2020-03-01 | 90000  | 70000      |
| Eve   | 2021-02-01 | 70000  | 70000      |

---

## 9️⃣ `NTH_VALUE(column, n)` (⚠ Needs frame)

### 🔹 Purpose:

Gets the **nth value** in order.

### 🔹 Query:

```sql
SELECT *,
  NTH_VALUE(Salary, 2) OVER (
    PARTITION BY Department 
    ORDER BY HireDate 
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS SecondHireSalary
FROM Employees;
```

---

## 🔟 Aggregate Functions with `OVER()`

You can use `SUM()`, `AVG()`, `MIN()`, `MAX()` etc. with `OVER()` for **row-wise running totals**.

### 🔹 Query:

```sql
SELECT *,
  SUM(Salary) OVER (PARTITION BY Department ORDER BY HireDate) AS RunningTotal
FROM Employees;
```

---

## 🧠 Summary Table

| Function           | Tie Handling | Skips Rank | Works Per Partition | Frame Needed |
| ------------------ | ------------ | ---------- | ------------------- | ------------ |
| `ROW_NUMBER()`     | ❌            | ❌          | ✅                   | ❌            |
| `RANK()`           | ✅            | ✅          | ✅                   | ❌            |
| `DENSE_RANK()`     | ✅            | ❌          | ✅                   | ❌            |
| `NTILE(n)`         | ❌            | ❌          | ✅                   | ❌            |
| `LAG()` / `LEAD()` | ❌            | ❌          | ✅                   | ❌            |
| `FIRST_VALUE()`    | ❌            | ❌          | ✅                   | ❌            |
| `LAST_VALUE()`     | ❌            | ❌          | ✅                   | ✅            |
| `NTH_VALUE()`      | ❌            | ❌          | ✅                   | ✅            |
| `SUM()`/`AVG()`    | N/A          | N/A        | ✅                   | Optional     |

---

Would you like this as a **printable PDF or Google Docs format**, or do you want **practice questions / MCQs** to test each one?
