Let's break down each example **one by one** with **deep explanation and the correct output**, including **what happens behind the scenes**.

---

### ✅ 1. `setCount(count + 1);` Called Multiple Times

```js
function Test() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
Test();
```

#### ❓ Problem:

Assuming `count` is from a `useState` in React:

```js
const [count, setCount] = useState(0);
```

#### ✅ What's Happening:

If `setCount` is called with **non-functional form** (`setCount(count + 1)`), React **does not batch them together**, and all calls use the **same stale value of `count`** (from closure).

#### ⚠️ Result:

All three lines use the **same `count`** (e.g., `0`), so effectively:

```js
setCount(1);
setCount(1);
setCount(1);
```

Final `count` will be **1**, not 3.

#### ✅ Correct Way:

```js
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Now `prev` is updated each time. Final count will be 3.

---

### ✅ 2. `setTimeout` and Execution Order

```js
function test() {
  console.log('1');
  console.log('2');
  setTimeout(() => { console.log('3'); }, 100);
  console.log('4');
}
test();
```

#### ✅ Output:

```
1
2
4
3
```

#### 🧠 Explanation:

* JS is **single-threaded** and uses an **event loop**.
* `setTimeout(..., 100)` is **asynchronous**, so it’s **queued in the task queue**.
* `console.log('3')` runs **after main thread finishes**.

---

### ✅ 3. Filtering Employees with Salary

```js
const employee = [
  {name: 'CO'},
  {name: 'EM1', salary:113},
  {name: 'EM2', salary:116},
  {name: 'EM3', salary:119},
  {name: 'Partner'},
  {name: 'EMp4', salary:343},
  {name: 'EMP5', salary:316},
  {name: 'EP7', salary:219},
];
```

#### ❓ Task:

Filter only those with `salary`.

```js
const withSalary = employee.filter(e => e.salary !== undefined);
```

#### ✅ Output:

```js
[
  {name: 'EM1', salary:113},
  {name: 'EM2', salary:116},
  {name: 'EM3', salary:119},
  {name: 'EMp4', salary:343},
  {name: 'EMP5', salary:316},
  {name: 'EP7', salary:219}
]
```

---

### ✅ 4. Hoisting with `let`

```js
console.log(b); 
let b = 20;
```

#### ❌ Error:

```
ReferenceError: Cannot access 'b' before initialization
```

#### 🧠 Why?

* `let` variables are **hoisted but not initialized**.
* Between hoisting and line of actual declaration, the variable is in **Temporal Dead Zone (TDZ)**.
* So, even though it’s hoisted, accessing it before line `let b = 20;` gives **ReferenceError**.

---

### ✅ 5. Arrow Function Hoisting

```js
wave(); 
let wave = () => {
  console.log("Test");
};
```

#### ❌ Error:

```
ReferenceError: Cannot access 'wave' before initialization
```

#### 🧠 Why?

* `let` + arrow function = **not hoisted** the way `function` is.
* So accessing before definition causes TDZ violation.

---

### ✅ 6. Hoisted Function Declaration

```js
greet();
function greet() {
 console.log("Hello from a hoisted function!");
}
```

#### ✅ Output:

```
Hello from a hoisted function!
```

#### ✅ Why?

* Function declarations are **fully hoisted** (name + body), so you can call them before their appearance.

---

### ✅ 7. Loose vs Strict Equality

```js
'2' == 2
'2' === 2
```

#### ✅ Output:

```js
'2' == 2     → true   ✅ (loose equality - type coercion)
'2' === 2    → false  ❌ (strict equality - no coercion)
```

#### 🧠 Explanation:

| Operator | Compares             | Result                            |
| -------- | -------------------- | --------------------------------- |
| `==`     | value after coercion | `'2'` → number → `2 == 2` ✅       |
| `===`    | value + type         | `'2'` (string) !== `2` (number) ❌ |

---

### ✅ Summary Table

| Code Snippet                       | Output / Error                 | Reason                   |
| ---------------------------------- | ------------------------------ | ------------------------ |
| `setCount(count + 1)` ×3           | 1 (not 3)                      | All use same stale value |
| `setTimeout(() => console.log(3))` | 3 printed last                 | Asynchronous             |
| `console.log(b); let b = 20;`      | ❌ ReferenceError               | TDZ                      |
| `wave(); let wave = () => {}`      | ❌ ReferenceError               | TDZ                      |
| `greet(); function greet() {}`     | ✅ "Hello from..."              | Function hoisted         |
| `'2' == 2`                         | true                           | Loose equality           |
| `'2' === 2`                        | false                          | Strict equality          |
| Filter employees by salary         | Array with salary objects only | `.filter(e => e.salary)` |

---

Would you like **100 more JS interview questions** like these (with deep explanations and real-world traps)?
