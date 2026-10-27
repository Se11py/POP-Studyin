# Topic: ME2.5 Simultaneous Equations

Simultaneous equations are sets of equations sharing common variables, solved linearly by elimination or non-linearly by substituting a linear expression into a quadratic curve.

---

### 1. Simultaneous Systems Breakdown

| System Type | Mathematical Structure | Solution Method |
| --- | --- | --- |
| Two Linear Equations | \(a_1x + b_1y = c_1\)<br>\(a_2x + b_2y = c_2\) | Elimination (scale coefficients) or Substitution |
| Linear & Non-Linear System | \(y = mx + c\)<br>\(ax^2 + by^2 + cx + dy = k\) | Substitution of linear subject into quadratic equation |

---

### 2. Anatomy of Linear-Quadratic Substitution

```
       Linear Equation:      y = 2x - 3      <--- Isolate y
                                 |
                                 v  Substitute y into Quadratic
       Quadratic Equation:   x² + y² = 18
                                 |
                             x² + (2x - 3)² = 18
                                 |
                             5x² - 12x - 9 = 0
                                 |
                             Solve for two pairs (x₁, y₁) and (x₂, y₂)
```

* **Substitution Rule:** Always make a linear variable the subject first to avoid fraction radicals.
* **Paired Solutions:** Each \(x\)-value must be substituted back into the linear equation to find its corresponding \(y\)-pair.

$$x^2 + (2x - 3)^2 = 18 \implies 5x^2 - 12x - 9 = 0$$

---

### 3. Worked Example

> **Question:**
> Solve the simultaneous equations:
> 1. \(y = x + 3\)
> 2. \(x^2 + y^2 = 29\)

**Step 1: Substitute linear expression into quadratic equation**

1. Substitute \(y = x + 3\) directly into \(x^2 + y^2 = 29\):

$$x^2 + (x + 3)^2 = 29$$

2. Expand the squared binomial \((x + 3)^2\):

$$x^2 + (x^2 + 6x + 9) = 29$$

3. Simplify into standard quadratic form \(ax^2 + bx + c = 0\):

$$2x^2 + 6x - 20 = 0 \implies x^2 + 3x - 10 = 0$$

**Step 2: Solve quadratic for x and find matching y values**

1. Factorise quadratic equation to find \(x\)-values:

$$(x + 5)(x - 2) = 0 \implies x_1 = -5, \, x_2 = 2$$

2. Substitute each \(x\)-value back into linear equation \(y = x + 3\):

$$\text{For } x_1 = -5: \, y_1 = -5 + 3 = -2$$

$$\text{For } x_2 = 2: \, y_2 = 2 + 3 = 5$$

3. **Key result 1:** First solution pair is \(x = -5, y = -2\).
4. **Key result 2:** Second solution pair is \(x = 2, y = 5\).

---

### 4. Common Examiner Traps

* **Unpaired Coordinate Mixing:** Pairing \(x_1\) with \(y_2\) instead of keeping calculated coordinate pairs \((x_1, y_1)\) and \((x_2, y_2)\) together.
* **Binomial Squaring Error:** Expanding \((x + 3)^2\) incorrectly as \(x^2 + 9\), missing the middle \(6x\) term.
