# Topic: MC2.11 Functions

A function is a mathematical rule that maps an input value \(x\) to a unique output value \(f(x)\), denoted as \(f(x) = ax + b\) or \(f: x \mapsto ax + b\).

---

### 1. Function Notation & Concepts Breakdown

| Notation / Concept | Mathematical Meaning | Example |
| --- | --- | --- |
| \(f(x) = 3x - 5\) | Standard function mapping variable \(x\) to output expression. | Input \(x=4 \implies f(4) = 3(4) - 5 = 7\) |
| \(f: x \mapsto 3x - 5\) | Arrow mapping notation (read: "\(f\) maps \(x\) onto \(3x - 5\)"). | Equivalent representation of function \(f\) |
| Function Evaluation | Replace variable symbol \(x\) with specific number or algebraic term. | \(f(-2) = 3(-2) - 5 = -11\) |

---

### 2. Anatomy of Function Evaluation Machine

```
              Input Value (x)
                    |
                    v
              +-----------+
              |  f(x) =   |
              |  3x - 5   |
              +-----------+
                    |
                    v
             Output Value f(x)
```

* **Domain Input:** The numerical value assigned to variable \(x\).
* **Range Output:** The resulting value evaluated by applying the function rule.

$$f(x) = 3x - 5 \implies f(4) = 3(4) - 5 = 7$$

---

### 3. Worked Example

> **Question:**
> Given functions \(f(x) = 4x - 3\) and \(g(x) = x^2 + 5\):
> 1. Find the value of \(f(6)\).
> 2. Find the value of \(x\) when \(f(x) = 17\).

**Step 1: Evaluate function f(6)**

1. Substitute \(x = 6\) into function \(f(x)\):

$$f(6) = 4(6) - 3$$

2. Perform arithmetic operations:

$$f(6) = 24 - 3 = 21$$

**Step 2: Solve f(x) = 17 for x**

1. Equate expression \(4x - 3\) to target value 17:

$$4x - 3 = 17$$

2. Solve linear equation for input variable \(x\):

$$4x = 20 \implies x = 5$$

3. **Key result 1:** Evaluated function value \(f(6) = 21\).
4. **Key result 2:** Input value satisfying \(f(x) = 17\) is \(x = 5\).

---

### 4. Common Examiner Traps

* **Evaluation vs Equation Confusion:** Confusing \(f(a)\) (evaluating output at \(x=a\)) with solving \(f(x) = a\) (finding input \(x\)).
* **Parentheses Errors with Negative Inputs:** Writing \(g(-3) = -3^2 + 5 = -9 + 5 = -4\) instead of \((-3)^2 + 5 = 9 + 5 = 14\).
