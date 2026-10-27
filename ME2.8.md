# Topic: ME2.8 Proportion, Variation & Power Laws

Non-linear variation models proportional relationships involving powers, roots, or inverse square powers: \(y = kx^n\) or \(y = \frac{k}{x^n}\) for constant of proportionality \(k\).

---

### 1. Advanced Proportion Types Breakdown

| Variation Description | Mathematical Statement | Proportionality Equation | Constant \(k\) Expression |
| --- | --- | --- | --- |
| Direct Power Proportion | \(y\) varies directly as \(x^n\) | \(y = kx^n\) | \(k = \frac{y}{x^n}\) |
| Inverse Power Proportion | \(y\) varies inversely as \(x^n\) | \(y = \frac{k}{x^n}\) | \(k = y \cdot x^n\) |
| Root Proportion | \(y\) is directly proportional to \(\sqrt{x}\) | \(y = k\sqrt{x}\) | \(k = \frac{y}{\sqrt{x}}\) |

---

### 2. Anatomy of Non-Linear Power Variation

```
              Direct Square (y = kx²)               Inverse Square (y = k / x²)
                         y                                      y
                         |   /                                  |  \
                         |  /                                   |   \
                         | / (Parabolic curve)                  |    ` - . (Inverse square drop)
                         +_______ x                             +_________ x
```

* **Power Effect:** If \(y \propto x^2\), doubling \(x\) multiplies \(y\) by \(2^2 = 4\); if \(y \propto \frac{1}{x^2}\), doubling \(x\) divides \(y\) by 4.
* **Two-Stage Method:** First evaluate constant \(k\) using given coordinate pairs, then evaluate requested variable.

$$y = \frac{k}{x^2} \implies k = y x^2$$

---

### 3. Worked Example

> **Question:**
> 1. \(y\) is directly proportional to the square of \(x\). When \(x = 3\), \(y = 45\). Find \(y\) when \(x = 5\).
> 2. \(F\) is inversely proportional to the square root of \(d\). When \(d = 16\), \(F = 3\). Find \(d\) when \(F = 2\).

**Step 1: Solve direct square proportion**

1. Write proportion model \(y = kx^2\) and substitute \(x = 3, y = 45\) to find \(k\):

$$45 = k(3)^2 \implies 45 = 9k \implies k = 5$$

2. Calculate \(y\) for \(x = 5\) using full equation \(y = 5x^2\):

$$y = 5(5)^2 = 5(25) = 125$$

**Step 2: Solve inverse root proportion**

1. Write proportion model \(F = \frac{k}{\sqrt{d}}\) and substitute \(d = 16, F = 3\) to find \(k\):

$$3 = \frac{k}{\sqrt{16}} \implies 3 = \frac{k}{4} \implies k = 12$$

2. Substitute \(F = 2\) into \(F = \frac{12}{\sqrt{d}}\) and isolate \(d\):

$$2 = \frac{12}{\sqrt{d}} \implies \sqrt{d} = 6 \implies d = 6^2 = 36$$

3. **Key result 1:** Direct square evaluation gives \(y = 125\).
4. **Key result 2:** Inverse root evaluation gives \(d = 36\).

---

### 4. Common Examiner Traps

* **Forgetting Power/Root Operation:** Writing \(y = kx\) instead of \(y = kx^2\) when solving direct square proportion.
* **Incorrect Root Inverse:** Squaring before isolating the radical, e.g. calculating \(\sqrt{d} = 6 \implies d = \sqrt{6}\) instead of \(d = 6^2\).
