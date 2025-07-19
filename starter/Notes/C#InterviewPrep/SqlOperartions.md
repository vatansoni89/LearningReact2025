Certainly, Vatan! 👨‍💻
Here’s a curated list of **common SQL operations and queries** in **MS SQL Server** — essential for interviews, daily use, and debugging.

---

## 📌 COMMON SQL OPERATIONS & QUERIES (MS SQL Server)

---

### ✅ 1. **Create Table**

```sql
CREATE TABLE Employees (
    EmpId INT PRIMARY KEY,
    Name VARCHAR(50),
    Salary INT,
    DeptId INT
);
```

---

### ✅ 2. **Insert Records**

```sql
INSERT INTO Employees (EmpId, Name, Salary, DeptId)
VALUES (1, 'Neha', 90000, 10);
```

---

### ✅ 3. **Select All / Specific Columns**

```sql
SELECT * FROM Employees;

SELECT Name, Salary FROM Employees;
```

---

### ✅ 4. **Update Data**

```sql
UPDATE Employees
SET Salary = 95000
WHERE EmpId = 1;
```

---

### ✅ 5. **Delete Data**

```sql
DELETE FROM Employees
WHERE EmpId = 1;
```

---

### ✅ 6. **Filtering with WHERE**

```sql
SELECT * FROM Employees
WHERE Salary > 80000;
```

---

### ✅ 7. **Sorting with ORDER BY**

```sql
SELECT * FROM Employees
ORDER BY Salary DESC;
```

---

### ✅ 8. **Aggregate Functions**

```sql
SELECT COUNT(*) AS TotalEmployees FROM Employees;
SELECT AVG(Salary) AS AverageSalary FROM Employees;
SELECT MAX(Salary) AS MaxSalary FROM Employees;
```

---

### ✅ 9. **Group By Clause**

```sql
SELECT DeptId, COUNT(*) AS EmpCount
FROM Employees
GROUP BY DeptId;
```

---

### ✅ 10. **HAVING (Filter groups)**

```sql
SELECT DeptId, COUNT(*) AS EmpCount
FROM Employees
GROUP BY DeptId
HAVING COUNT(*) > 2;
```

---

### ✅ 11. **Join Tables**

```sql
SELECT e.Name, d.DeptName
FROM Employees e
JOIN Departments d ON e.DeptId = d.DeptId;
```

---

### ✅ 12. **Subquery**

```sql
SELECT * FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);
```

---

### ✅ 13. **IN / NOT IN**

```sql
SELECT * FROM Employees
WHERE DeptId IN (10, 20);
```

---

### ✅ 14. **BETWEEN**

```sql
SELECT * FROM Employees
WHERE Salary BETWEEN 70000 AND 90000;
```

---

### ✅ 15. **LIKE (Pattern Matching)**

```sql
SELECT * FROM Employees
WHERE Name LIKE 'N%';   -- Starts with N
```

---

### ✅ 16. **IS NULL / IS NOT NULL**

```sql
SELECT * FROM Employees
WHERE DeptId IS NULL;
```

---

### ✅ 17. **TOP N Rows**

```sql
SELECT TOP 3 * FROM Employees
ORDER BY Salary DESC;
```

---

### ✅ 18. **DISTINCT**

```sql
SELECT DISTINCT DeptId FROM Employees;
```

---

### ✅ 19. **CASE Statement (IF-ELSE Logic)**

```sql
SELECT Name,
       CASE 
           WHEN Salary > 80000 THEN 'High'
           WHEN Salary > 60000 THEN 'Medium'
           ELSE 'Low'
       END AS SalaryLevel
FROM Employees;
```

---

### ✅ 20. **Aliases**

```sql
SELECT Name AS EmployeeName, Salary AS MonthlySalary
FROM Employees;
```

---

## 🧠 Bonus: Pagination with OFFSET-FETCH

```sql
SELECT * FROM Employees
ORDER BY EmpId
OFFSET 5 ROWS FETCH NEXT 5 ROWS ONLY;
```

---

## ✅ Summary Cheat Sheet

| Operation     | Keyword/Function                    |
| ------------- | ----------------------------------- |
| Create        | `CREATE TABLE`                      |
| Insert        | `INSERT INTO`                       |
| Read          | `SELECT`, `WHERE`, `ORDER BY`       |
| Update        | `UPDATE`                            |
| Delete        | `DELETE`                            |
| Join          | `INNER JOIN`, `LEFT JOIN`           |
| Grouping      | `GROUP BY`, `HAVING`                |
| Aggregates    | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` |
| Filtering     | `WHERE`, `IN`, `BETWEEN`, `LIKE`    |
| Subquery      | Nested `SELECT`                     |
| Conditionals  | `CASE`                              |
| Distinct Rows | `DISTINCT`                          |
| Pagination    | `OFFSET FETCH`                      |

---

Let me know if you want a **PDF version**, **practice set**, or **real-time project queries** (like employee hierarchy, top earners, missing data, etc.)!
