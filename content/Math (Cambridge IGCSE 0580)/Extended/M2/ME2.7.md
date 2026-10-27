# ME2.7 Sequences | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Extended sequences include advanced non-linear structures such as full quadratic sequences ($an^2 + bn + c$), cubic sequences, fraction sequences, and geometric/exponential sequences ($ar^{n-1}$ or $ar^n$). Finding the general $n$th term rule allows direct calculation of any arbitrary term and structural analysis of pattern growth.

Think of sequence analysis like inspecting concentric ripple layers. In linear sequences, the first difference is constant (1st derivative analogue). In quadratic sequences, the second difference is constant (2nd derivative analogue). In exponential sequences, consecutive terms multiply by a constant ratio $r$ (geometric growth).

## 2. Key Definitions, Principles & Formulas
- **Linear Sequence**: Constant 1st difference $d$:
  $$\text{nth term} = dn + c$$
- **Quadratic Sequence ($an^2 + bn + c$)**:
  - Constant 2nd difference = $2a \implies a = \frac{\text{2nd difference}}{2}$.
  - Subtract $an^2$ from each term to leave a linear sequence ($bn + c$).
- **Geometric / Exponential Sequence**: Constant multiplier ratio $r = \frac{T_{n+1}}{T_n}$:
  $$\text{nth term} = a r^{n-1} \quad \text{or} \quad c r^n$$
- **Fractional Sequences**: Find separate $n$th term formulas for the numerator and denominator independently:
  $$\text{nth term} = \frac{\text{Numerator formula}}{\text{Denominator formula}}$$

> 💡 **Exam Tip**: The coefficient $a$ of $n^2$ in a quadratic sequence is ALWAYS HALF of the constant second difference! If the 2nd difference is $+6$, then $a = 3$, giving $3n^2$.

> ⚠️ **Common Misconception**: Students often confuse geometric multiplier ratios with linear differences. In $3, 6, 12, 24$, terms double ($\times 2$), so $r = 2$, giving $3 \times 2^{n-1}$, NOT a linear formula.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Finding $n$th Terms of Quadratic and Exponential Sequences
(a) Find the $n$th term formula for the quadratic sequence: $3, 10, 21, 36, 55, \dots$.
(b) Find the $n$th term formula for the sequence: $\frac{2}{3}, \frac{5}{9}, \frac{8}{27}, \frac{11}{81}, \dots$.

#### Solution:
(a)
- **Step 1: Calculate the 1st and 2nd differences.**
  $$\text{Terms } (T_n): \quad 3, \quad 10, \quad 21, \quad 36, \quad 55$$
  $$\text{1st Difference}: \quad +7, \quad +11, \quad +15, \quad +19$$
  $$\text{2nd Difference}: \quad +4, \quad +4, \quad +4$$
- **Step 2: Calculate coefficient $a$ of $n^2$.**
  $$2a = 4 \implies a = \frac{4}{2} = 2 \implies \text{Quadratic term } = 2n^2$$
- **Step 3: Calculate $2n^2$ values for $n = 1, 2, 3, 4, 5$.**
  $$n=1: 2(1)^2 = 2; \quad n=2: 2(2)^2 = 8; \quad n=3: 2(3)^2 = 18; \quad n=4: 2(4)^2 = 32$$
- **Step 4: Subtract $2n^2$ from original sequence terms $T_n$ to isolate the linear remainder.**
  $$n=1: 3 - 2 = +1$$
  $$n=2: 10 - 8 = +2$$
  $$n=3: 21 - 18 = +3$$
  $$n=4: 36 - 32 = +4$$
- **Step 5: Identify the $n$th term of the remainder sequence ($1, 2, 3, 4, \dots$).**
  $$\text{Linear remainder} = n$$
- **Step 6: Combine quadratic and linear terms for the complete $n$th term formula.**
  $$\text{nth term} = 2n^2 + n$$

(b)
- **Step 1: Analyze the numerator sequence ($2, 5, 8, 11, \dots$).**
  - Constant 1st difference = $+3 \implies \text{Starts with } 3n$.
  - For $n=1$, $3(1) - 1 = 2 \implies \text{Numerator } = 3n - 1$.
- **Step 2: Analyze the denominator sequence ($3, 9, 27, 81, \dots$).**
  - Powers of $3$: $3^1, 3^2, 3^3, 3^4, \dots \implies \text{Denominator } = 3^n$.
- **Step 3: Combine numerator and denominator formulas.**
  $$\text{nth term} = \frac{3n - 1}{3^n}$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Halving Second Difference Omission**: Using the full second difference as coefficient $a$ instead of dividing by $2$ (e.g. writing $4n^2$ instead of $2n^2$).
- **Mixing Numerator and Denominator Rules**: Trying to find a single difference for the entire fraction instead of splitting into two independent sequences.
- **Index Offsets in Exponential Sequences**: Writing $3^n$ instead of $3^{n-1}$ for sequence $1, 3, 9, 27$ (where $n=1 \implies 3^0 = 1$).

## 5. Key Terms & Revision Summary
| Sequence Class | Difference / Ratio Property | $n$th Term Expression |
| :--- | :--- | :--- |
| **Linear** | Constant 1st difference $d$ | $dn + c$ |
| **Quadratic** | Constant 2nd difference $2a$ | $an^2 + bn + c$ where $a = \frac{\text{2nd diff}}{2}$ |
| **Cubic** | Constant 3rd difference $6a$ | $an^3 + bn^2 + cn + d$ |
| **Exponential** | Constant ratio $r = \frac{T_{n+1}}{T_n}$ | $a r^{n-1}$ or $c r^n$ |
