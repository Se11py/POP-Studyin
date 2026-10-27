# Topic: ME2.4 Solving Quadratic Equations

Quadratic equations of the form \(ax^2 + bx + c = 0\) (\(a \ne 0\)) are solved analytically by factorisation, using the quadratic formula \(x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\), or by completing the square.

---

### 1. Quadratic Solution Methods Breakdown

| Method | Applicable Condition | Solution Formula / Form |
| --- | --- | --- |
| Factorisation | Discriminant \(b^2 - 4ac\) is a perfect square. | \((px + q)(rx + s) = 0 \implies x = -\frac{q}{p} \text{ or } -\frac{s}{r}\) |
| Quadratic Formula | Any quadratic equation; required when answers need rounding. | \(x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\) |
| Completing the Square | Useful for turning points and exact surd solutions. | \((x + p)^2 + q = 0 \implies x = -p \pm \sqrt{-q}\) |

---

### 2. Anatomy of Quadratic Formula & Completing Square

```
                 Quadratic Formula Components
               [ -b ]  ±  sqrt( [ b² - 4ac ] )
              ---------------------------------
                          2 [ a ]
                             ^
                  Discriminant: Δ = b² - 4ac
                  (Δ > 0: 2 real roots, Δ = 0: 1 root, Δ < 0: 0 real roots)
```

* **Discriminant (\(\Delta = b^2 - 4ac\)):** Determines the number and nature of real roots.
* **Completed Square Form:** \(x^2 + bx + c \equiv \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2 + c\).

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

---

### 3. Worked Example

> **Question:**
> 1. Solve \(3x^2 - 5x - 2 = 0\) by factorisation.
> 2. Solve \(2x^2 + 7x - 1 = 0\), giving your answers correct to 2 decimal places.

**Step 1: Solve by factorisation**

1. Factorise quadratic \(3x^2 - 5x - 2 = 0\):

$$(3x + 1)(x - 2) = 0$$

2. Set each factor to zero to obtain roots:

$$3x + 1 = 0 \implies x = -\frac{1}{3}$$

$$x - 2 = 0 \implies x = 2$$

**Step 2: Solve using quadratic formula**

1. Identify coefficients \(a = 2\), \(b = 7\), \(c = -1\) and substitute into formula:

$$x = \frac{-(7) \pm \sqrt{(7)^2 - 4(2)(-1)}}{2(2)}$$

2. Simplify discriminant and denominator:

$$x = \frac{-7 \pm \sqrt{49 + 8}}{4} = \frac{-7 \pm \sqrt{57}}{4}$$

3. Compute both numerical values to 2 decimal places:

$$x_1 = \frac{-7 + 7.5498}{4} = 0.13745 \dots \approx 0.14$$

$$x_2 = \frac{-7 - 7.5498}{4} = -3.63745 \dots \approx -3.64$$

4. **Key result 1:** Exact roots for equation 1 are \(x = -\frac{1}{3}\) and \(x = 2\).
5. **Key result 2:** Rounded roots for equation 2 are \(x = 0.14\) and \(x = -3.64\).

---

### 4. Common Examiner Traps

* **Formula Sign Error:** Substituting \(-b\) as \(-(-5) = -5\) instead of \(+5\) when \(b\) is negative.
* **Premature Rounding:** Rounding intermediate square root calculations, causing second decimal place errors in final answers.
