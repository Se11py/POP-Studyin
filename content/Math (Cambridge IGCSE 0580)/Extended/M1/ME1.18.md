# E1.18 Surds, Exact Arithmetic & Rationalising Denominators (Extended Tier)

## What Is a Surd and Why Do We Use Exact Forms?

A **surd** is an exact square root (or $n$-th root) of a positive integer that cannot be simplified into a whole number or rational fraction (e.g. $\sqrt{2}, \sqrt{3}, \sqrt{5}$). Surds are **irrational numbers** whose decimal expansions go on forever without repeating.

In Extended Tier Mathematics, surds allow us to maintain 100% exact mathematical accuracy in calculations without accumulating decimal rounding errors.

---

## The Core Laws of Surds

| Law Name | Algebraic Identity | Mathematical Meaning & Derivation | Example |
| :--- | :--- | :--- | :--- |
| **Multiplication Law** | $\sqrt{a \times b} = \sqrt{a} \times \sqrt{b}$ | Square roots split over multiplication | $\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$ |
| **Division Law** | $\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}$ | Square roots split over division | $\sqrt{\frac{9}{16}} = \frac{\sqrt{9}}{\sqrt{16}} = \frac{3}{4}$ |
| **Square of Root** | $(\sqrt{a})^2 = a$ | Squaring cancels square root | $(\sqrt{7})^2 = 7$ |
| **Combining Like Surds** | $m\sqrt{a} \pm n\sqrt{a} = (m \pm n)\sqrt{a}$ | Like surds add like algebraic terms | $4\sqrt{3} + 2\sqrt{3} = 6\sqrt{3}$ |

*Warning*: $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$! Surds **never** split over addition or subtraction.

---

## Simplifying Surds Strategy

To simplify a surd $\sqrt{N}$:
1. Find the **largest perfect square factor** ($4, 9, 16, 25, 36, 49, 64, 81, 100$) that divides into $N$.
2. Split $\sqrt{N}$ into $\sqrt{\text{Perfect Square}} \times \sqrt{\text{Remainder}}$.
3. Evaluate the root of the perfect square.

---

## Rationalising the Denominator

**Rationalising the denominator** means converting a fraction containing an irrational surd in its denominator into an equivalent fraction with a **rational denominator**.

### Case 1: Single Surd Denominator ($\frac{a}{\sqrt{b}}$)
Multiply top and bottom by $\sqrt{b}$:
$$\frac{a}{\sqrt{b}} \times \frac{\sqrt{b}}{\sqrt{b}} = \frac{a\sqrt{b}}{b}$$

### Case 2: Binomial Surd Denominator ($\frac{a}{b + \sqrt{c}}$ or $\frac{a}{b - \sqrt{c}}$)
Multiply top and bottom by the **conjugate** (flip the sign between terms):
* Conjugate of $(b + \sqrt{c})$ is $(b - \sqrt{c})$.
* Conjugate of $(b - \sqrt{c})$ is $(b + \sqrt{c})$.
* Applying difference of two squares $(x+y)(x-y) = x^2 - y^2$ eliminates all square roots!

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Simplifying and Combining Surds
Show that $\sqrt{75} + \sqrt{48} - \sqrt{12}$ can be written in the form $k\sqrt{3}$, where $k$ is an integer.

#### Solution & Line-by-Line Annotations

1. **Simplify $\sqrt{75}$**: Largest square factor is $25$.
   $$\sqrt{75} = \sqrt{25 \times 3} = \sqrt{25} \times \sqrt{3} = 5\sqrt{3}$$

2. **Simplify $\sqrt{48}$**: Largest square factor is $16$.
   $$\sqrt{48} = \sqrt{16 \times 3} = \sqrt{16} \times \sqrt{3} = 4\sqrt{3}$$

3. **Simplify $\sqrt{12}$**: Largest square factor is $4$.
   $$\sqrt{12} = \sqrt{4 \times 3} = \sqrt{4} \times \sqrt{3} = 2\sqrt{3}$$

4. **Combine like surds**:
   $$5\sqrt{3} + 4\sqrt{3} - 2\sqrt{3} = (5 + 4 - 2)\sqrt{3} = 7\sqrt{3}$$
   *Annotation: $k = 7$.*

---

### Question 2: Rationalising a Binomial Denominator
Show algebraically that $\frac{6}{3 - \sqrt{3}}$ can be written in the form $a + b\sqrt{3}$.

#### Solution & Line-by-Line Annotations

1. **Step 1: Identify conjugate of denominator**:
   $$\text{Conjugate of } (3 - \sqrt{3}) \text{ is } (3 + \sqrt{3})$$

2. **Step 2: Multiply top and bottom by conjugate**:
   $$\frac{6}{3 - \sqrt{3}} \times \frac{3 + \sqrt{3}}{3 + \sqrt{3}} = \frac{6(3 + \sqrt{3})}{(3 - \sqrt{3})(3 + \sqrt{3})}$$

3. **Step 3: Expand numerator**:
   $$6(3 + \sqrt{3}) = 18 + 6\sqrt{3}$$

4. **Step 4: Expand denominator using Difference of Squares**:
   $$(3 - \sqrt{3})(3 + \sqrt{3}) = 3^2 - (\sqrt{3})^2 = 9 - 3 = 6$$

5. **Step 5: Divide terms by 6**:
   $$\frac{18 + 6\sqrt{3}}{6} = \frac{18}{6} + \frac{6\sqrt{3}}{6} = 3 + \sqrt{3}$$
   *Annotation: $a = 3, b = 1$.*

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Splitting Surds Over Addition**  
  *Why it happens*: Writing $\sqrt{9 + 16} = \sqrt{9} + \sqrt{16} = 3 + 4 = 7$.  
  *The Correction*: $\sqrt{9+16} = \sqrt{25} = 5 \neq 7$. Surds NEVER split over addition or subtraction.

* **Mistake: Not Finding the LARGEST Square Factor**  
  *Why it happens*: Writing $\sqrt{48} = \sqrt{4 \times 12} = 2\sqrt{12}$ and stopping.  
  *The Correction*: $12$ still contains a square factor ($4$)! Continue simplifying: $2\sqrt{4 \times 3} = 2 \times 2\sqrt{3} = 4\sqrt{3}$. Always look for the largest perfect square ($16$).
