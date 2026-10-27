# Topic: MC2.3 Algebraic Fractions

An algebraic fraction is a fraction containing algebraic expressions in its numerator or denominator, simplified by canceling common factors or combined using a common denominator: \(\frac{a}{c} \pm \frac{b}{c} = \frac{a \pm b}{c}\).

---

### 1. Algebraic Fraction Operations Breakdown

| Operation | Mathematical Method | Example |
| --- | --- | --- |
| Simplifying Fractions | Factorise numerator/denominator and cancel common factors. | \(\frac{6x}{9x^2} = \frac{2}{3x}\) |
| Adding / Subtracting | Find the Common Denominator (LCM) before combining numerators. | \(\frac{x}{3} + \frac{x}{4} = \frac{4x + 3x}{12} = \frac{7x}{12}\) |
| Multiplying / Dividing | Multiply numerators and denominators; invert second fraction for division. | \(\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c}\) |

---

### 2. Anatomy of Algebraic Fraction Addition

```
                   Multiply top & bottom to get LCM (12)
                 /                                      \
          [ x ]   (x 4)      [ x ]   (x 3)      4x + 3x       7x
          -----  ------  +   -----  ------  =  ---------  =  ----
          [ 3 ]   (x 4)      [ 4 ]   (x 3)         12         12
```

* **Lowest Common Denominator (LCD):** The lowest common multiple of the denominators (for 3 and 4, LCD = 12).
* **Numerator Adjustment:** Each numerator is scaled by the missing factor needed to match the LCD.

$$\frac{x}{3} + \frac{x}{4} = \frac{4x}{12} + \frac{3x}{12} = \frac{7x}{12}$$

---

### 3. Worked Example

> **Question:**
> 1. Simplify the fraction: \(\frac{12x^2y}{18xy^3}\).
> 2. Express as a single fraction in its simplest form: \(\frac{2x + 1}{5} - \frac{x - 2}{3}\).

**Step 1: Simplify single algebraic fraction by canceling common terms**

1. Identify and cancel common numeric factors (HCF of 12 and 18 is 6) and variable terms:

$$\frac{12x^2y}{18xy^3} = \frac{6 \times 2 \times x \times x \times y}{6 \times 3 \times x \times y \times y^2}$$

2. Cancel out the matching terms \(6xy\):

$$\frac{12x^2y}{18xy^3} = \frac{2x}{3y^2}$$

**Step 2: Subtract fractions with different denominators**

1. Find common denominator for 5 and 3 (\(\text{LCM} = 15\)) and write with common denominator:

$$\frac{3(2x + 1)}{15} - \frac{5(x - 2)}{15} = \frac{3(2x + 1) - 5(x - 2)}{15}$$

2. Expand numerators carefully, preserving negative signs:

$$\frac{6x + 3 - 5x + 10}{15}$$

3. Collect like terms:

$$\frac{x + 13}{15}$$

4. **Key result 1:** Simplified fraction is \(\frac{2x}{3y^2}\).
5. **Key result 2:** Combined single fraction is \(\frac{x + 13}{15}\).

---

### 4. Common Examiner Traps

* **Illegal Canceling:** Attempting to cancel terms across addition/subtraction signs without factorising first, e.g., canceling \(x\) in \(\frac{x + 5}{x}\) to get \(5\).
* **Substraction Sign Error:** Failing to distribute the minus sign to all terms in the second numerator, writing \(3 - 5(x - 2) = 6x + 3 - 5x - 10\) instead of \(+10\).
