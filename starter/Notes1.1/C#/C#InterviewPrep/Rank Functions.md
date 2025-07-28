Great question, Vatan! 🙌
SQL Server provides **4 main ranking functions** used to assign a rank/position to rows in a result set. They all work with the **`OVER()`** clause and often with **`PARTITION BY`** and **`ORDER BY`**.

---

## 🏆 1. `ROW_NUMBER()`

> Assigns a **unique sequential number** to each row, **no matter if values are the same**.

### 🔹 Syntax:

```sql
ROW_NUMBER() OVER (ORDER BY Salary DESC)
```

### 🔹 Example:

| Name  | Salary | Row\_Number |
| ----- | ------ | ----------- |
| Neha  | 95000  | 1           |
| Ravi  | 95000  | 2           |
| Sunil | 92000  | 3           |

🧠 No tie handling — just row position.

---

## 🥈 2. `RANK()`

> Assigns rank to rows with **gaps** in case of ties.

### 🔹 Example:

| Name  | Salary | RANK |
| ----- | ------ | ---- |
| Neha  | 95000  | 1    |
| Ravi  | 95000  | 1    |
| Sunil | 92000  | 3    |

🧠 Rank 2 is **skipped** because two rows tied at Rank 1.

---

## 🥉 3. `DENSE_RANK()`

> Like `RANK()`, but **no gaps** in the ranking sequence.

```sql
WITH RankedSalaries AS (
    SELECT 
        name,
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
    FROM Employees
)
SELECT name, salary
FROM RankedSalaries
WHERE rank = 5;
```

### 🔹 Example:

| Name  | Salary | DENSE\_RANK |
| ----- | ------ | ----------- |
| Neha  | 95000  | 1           |
| Ravi  | 95000  | 1           |
| Sunil | 92000  | 2           |

🧠 Ranks are **dense** — continuous, even with ties.

---

## 🎯 4. `NTILE(n)`

> Divides result set into **`n` equal buckets** and assigns a bucket number.

### 🔹 Syntax:

```sql
NTILE(4) OVER (ORDER BY Salary DESC)
```

| Name   | Salary | NTILE(4) |
| ------ | ------ | -------- |
| Neha   | 95000  | 1        |
| Ravi   | 95000  | 1        |
| Sunil  | 92000  | 2        |
| Preeti | 92000  | 2        |
| ...    | ...    | ...      |

🧠 Useful for **quartiles**, **percentiles**, etc.

---

## 📊 Comparison Summary

| Function       | Handles Ties | Skips Ranks | Use Case                         |
| -------------- | ------------ | ----------- | -------------------------------- |
| `ROW_NUMBER()` | ❌ No         | ❌ No        | Unique sequence, pagination      |
| `RANK()`       | ✅ Yes        | ✅ Yes       | Leaderboards, competition scores |
| `DENSE_RANK()` | ✅ Yes        | ❌ No        | Grouped ranking without gaps     |
| `NTILE(n)`     | ✅ Yes        | ❌ N/A       | Distribute rows in `n` groups    |

---

Let me know if you'd like a side-by-side example with output or use in `PARTITION BY` (e.g., department-wise ranks).
