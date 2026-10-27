# Topic: ME2.6 Linear & Quadratic Inequalities

Algebraic inequalities express ranges of values satisfying relational constraints, where quadratic inequalities \(ax^2 + bx + c > 0\) are solved by determining critical values and analyzing region signs relative to the \(x\)-axis.

---

### 1. Inequality Types & Regions Breakdown

| Inequality Type | Standard Form | Solution Structure |
| --- | --- | --- |
| Single Linear | \(ax + b < c\) | Single continuous ray (\(x < k\) or \(x > k\)) |
| Compound Linear | \(a \le fx + b \le c\) | Bound interval (\(p \le x \le q\)) |
| Quadratic (\(< 0\)) | \((x - p)(x - q) < 0\) | Single enclosed interval between roots: \(p < x < q\) |
| Quadratic (\(> 0\)) | \((x - p)(x - q) > 0\) | Two disjoint outer rays: \(x < p\) or \(x > q\) |

---

### 2. Anatomy of Quadratic Inequality Regions

```
              y = (x - p)(x - q)
                    y
                    |      Above Axis: (x < p) OR (x > q)
                  \ | /    ------------------------------
      -------------+-----+------------- x-axis
                  p \ / q  Below Axis: (p < x < q)
                     v     -----------------------
              Parabola Curve
```

* **Critical Values (\(p, q\)):** The roots obtained by solving the corresponding quadratic equation \((x - p)(x - q) = 0\).
* **Region Selection:** Below axis (\(< 0\)) gives single bounded region \(p < x < q\); above axis (\(> 0\)) gives split regions \(x < p\) or \(x > q\).

$$(x - p)(x - q) < 0 \implies p < x < q \quad (p < q)$$

---

### 3. Worked Example

> **Question:**
> 1. Solve the compound inequality: \(-3 \le 2x - 5 < 7\).
> 2. Solve the quadratic inequality: \(x^2 - 3x - 10 > 0\).

**Step 1: Solve compound linear inequality**

1. Add 5 to all three parts of the inequality:

$$-3 + 5 \le 2x < 7 + 5 \implies 2 \le 2x < 12$$

2. Divide all three parts by 2:

$$1 \le x < 6$$

**Step 2: Solve quadratic inequality via critical values and sketch**

1. Find critical values by equating quadratic to zero:

$$x^2 - 3x - 10 = 0 \implies (x - 5)(x + 2) = 0 \implies x = -2, \, x = 5$$

2. Analyze region for \(> 0\) (curve above \(x\)-axis):

$$\text{Curve is positive for } x < -2 \text{ and } x > 5$$

3. **Key result 1:** Linear compound solution is \(1 \le x < 6\).
4. **Key result 2:** Quadratic inequality solution is \(x < -2 \text{ or } x > 5\).

---

### 4. Common Examiner Traps

* **Combining Disjoint Quadratic Regions:** Writing \(5 < x < -2\) for disjoint outer regions instead of two separate inequalities \(x < -2 \text{ or } x > 5\).
* **Treating Inequalities like Equations:** Taking square roots without considering both positive and negative bounds, e.g., \(x^2 > 9 \implies x > 3\) (missing \(x < -3\)).
