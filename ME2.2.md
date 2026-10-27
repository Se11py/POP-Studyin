# Topic: ME2.2 Advanced Algebraic Fractions

Advanced algebraic fraction operations require factorising quadratic numerators and denominators to cancel common binomial terms and finding algebraic lowest common denominators: \(\frac{A}{P(x)} \pm \frac{B}{Q(x)} = \frac{A \cdot Q(x) \pm B \cdot P(x)}{P(x)Q(x)}\).

---

### 1. Advanced Algebraic Fraction Operations Breakdown

| Operation Type | Factorisation Requirement | LCD / Combination Rule |
| --- | --- | --- |
| Simplification | Factorise quadratics into binomials before canceling identical brackets. | \(\frac{x^2 - 9}{x^2 + 5x + 6} = \frac{(x-3)(x+3)}{(x+2)(x+3)} = \frac{x-3}{x+2}\) |
| Addition / Subtraction | Retain distinct polynomial denominators in factored form as LCD. | \(\frac{3}{x+1} + \frac{2}{x-4} = \frac{3(x-4) + 2(x+1)}{(x+1)(x-4)}\) |
| Division | Multiply by reciprocal after factorising all expressions. | \(\frac{A}{B} \div \frac{C}{D} = \frac{A}{B} \times \frac{D}{C}\) |

---

### 2. Anatomy of Canceling Binomial Factors

```
          Quadratic Numerator:     x² - 9           (x - 3)(x + 3)       x - 3
                                ------------   =   ----------------  =  -------
          Quadratic Denominator: x² + 5x + 6        (x + 2)(x + 3)       x + 2
                                                               ^
                                                    Cancel common bracket!
```

* **Difference of Two Squares:** \(a^2 - b^2 \equiv (a - b)(a + b)\).
* **Common Bracket Rule:** Complete binomial expressions inside parentheses must match identically to cancel safely.

$$\frac{(x - 3)(x + 3)}{(x + 2)(x + 3)} = \frac{x - 3}{x + 2}$$

---

### 3. Worked Example

> **Question:**
> 1. Simplify completely: \(\frac{2x^2 - 8}{x^2 - x - 6}\).
> 2. Express as a single fraction in its simplest form: \(\frac{5}{2x - 1} - \frac{3}{x + 4}\).

**Step 1: Simplify algebraic fraction by factorising numerator and denominator**

1. Factorise numerator using common factor 2 followed by difference of two squares:

$$2x^2 - 8 = 2(x^2 - 4) = 2(x - 2)(x + 2)$$

2. Factorise quadratic denominator \(x^2 - x - 6\):

$$x^2 - x - 6 = (x - 3)(x + 2)$$

3. Cancel common factor \((x + 2)\):

$$\frac{2(x - 2)(x + 2)}{(x - 3)(x + 2)} = \frac{2(x - 2)}{x - 3} = \frac{2x - 4}{x - 3}$$

**Step 2: Subtract fractions with linear algebraic denominators**

1. Identify LCD \((2x - 1)(x + 4)\) and combine numerators over single denominator:

$$\frac{5(x + 4) - 3(2x - 1)}{(2x - 1)(x + 4)}$$

2. Expand numerator brackets and collect like terms:

$$\frac{5x + 20 - 6x + 3}{(2x - 1)(x + 4)} = \frac{-x + 23}{(2x - 1)(x + 4)}$$

3. **Key result 1:** Simplified fraction is \(\frac{2x - 4}{x - 3}\).
4. **Key result 2:** Single combined fraction is \(\frac{23 - x}{(2x - 1)(x + 4)}\).

---

### 4. Common Examiner Traps

* **Partial Cancellation:** Canceling individual \(x^2\) or \(x\) terms across plus/minus signs without factorising into brackets first.
* **Expanding Denominator Prematurely:** Expanding denominator brackets in final answers, which increases arithmetic risk and masks common factors.
