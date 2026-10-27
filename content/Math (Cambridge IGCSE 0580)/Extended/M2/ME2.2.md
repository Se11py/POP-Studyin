# ME2.2 Algebraic Manipulation | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Extended algebraic manipulation covers the full suite of techniques needed to rewrite complex polynomial expressions into simplified or factorised forms. This includes expanding triple brackets, factorising non-monic quadratics ($ax^2 + bx + c$ where $a \neq 1$), factorising four-term expressions by grouping, and applying the difference of two squares identity.

Think of advanced factorisation as structural decomposition. Just as any compound number decomposes into prime factors, quadratic and polynomial expressions decompose into linear bracketed factors. Mastering factorisation is the key gateway to solving non-linear equations and simplifying algebraic fractions.

## 2. Key Definitions, Principles & Formulas
- **Difference of Two Squares (DOTS)**:
  $$a^2 - b^2 = (a - b)(a + b)$$
  $$16x^2 - 9y^2 = (4x - 3y)(4x + 3y)$$
- **Factorising Monic Quadratics ($x^2 + bx + c$)**: Find two numbers that multiply to $c$ and add to $b$:
  $$x^2 + (p+q)x + pq = (x + p)(x + q)$$
- **Factorising Non-Monic Quadratics ($ax^2 + bx + c, a \neq 1$)**: Find two numbers that multiply to $a \times c$ and add to $b$, split the middle term, and factorise by grouping.
- **Factorising by Grouping (4 Terms)**: Group terms in pairs, pull out HCF from each pair, then extract the common bracket factor:
  $$ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)$$

> 💡 **Exam Tip**: Always check for a common numerical or single-variable factor FIRST before applying quadratic or DOTS rules. For example, $2x^2 - 50 = 2(x^2 - 25) = 2(x - 5)(x + 5)$.

> ⚠️ **Common Misconception**: Students often mistake $x^2 + 9$ for a difference of two squares. $x^2 + 9$ is a *sum* of squares and CANNOT be factorised over real numbers. Only $x^2 - 9 = (x - 3)(x + 3)$.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Advanced Factorisation and Expanding Triple Brackets
(a) Expand and simplify fully: $(2x - 1)(x + 3)(x - 4)$.
(b) Factorise fully: $6x^2 - 11x - 10$.
(c) Factorise fully: $3x^3 - 12x$.

#### Solution:
(a)
- **Step 1: Expand the first two brackets using FOIL.**
  $$(2x - 1)(x + 3) = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3$$
- **Step 2: Set up multiplication of the resulting quadratic with the third bracket.**
  $$(2x^2 + 5x - 3)(x - 4)$$
- **Step 3: Multiply every term in the quadratic by $x$, then every term by $-4$.**
  $$\text{Multiply by } x: \quad 2x^3 + 5x^2 - 3x$$
  $$\text{Multiply by } -4: \quad -8x^2 - 20x + 12$$
- **Step 4: Combine all terms and simplify like terms.**
  $$2x^3 + (5x^2 - 8x^2) + (-3x - 20x) + 12 = 2x^3 - 3x^2 - 23x + 12$$

(b)
- **Step 1: Multiply $a$ and $c$ to find the product target.**
  $$a \times c = 6 \times (-10) = -60$$
- **Step 2: Find two numbers that multiply to $-60$ and add to $b = -11$.**
  $$\text{Factors of } -60: \quad -15 \text{ and } +4 \quad (-15 \times 4 = -60, \quad -15 + 4 = -11)$$
- **Step 3: Split the middle term $-11x$ into $-15x + 4x$.**
  $$6x^2 - 15x + 4x - 10$$
- **Step 4: Factorise by grouping the first two terms and the last two terms.**
  $$3x(2x - 5) + 2(2x - 5)$$
- **Step 5: Extract the common binomial bracket $(2x - 5)$.**
  $$(3x + 2)(2x - 5)$$

(c)
- **Step 1: Extract the overall Highest Common Factor ($3x$) first.**
  $$3x^3 - 12x = 3x(x^2 - 4)$$
- **Step 2: Recognize $(x^2 - 4)$ as a Difference of Two Squares ($x^2 - 2^2$).**
  $$x^2 - 4 = (x - 2)(x + 2)$$
- **Step 3: Combine factors for the complete factorisation.**
  $$3x(x - 2)(x + 2)$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Stopping at Partial Factorisation**: Factorising $3x^3 - 12x$ as $3x(x^2 - 4)$ and failing to break down $(x^2 - 4)$ completely into linear factors.
- **Middle Term Splitting Sign Mistakes**: Misidentifying factor pairs for non-monic quadratics, e.g. using $+15$ and $-4$ instead of $-15$ and $+4$.
- **Triple Bracket Expansion Omissions**: Missing intermediate cross-multiplication terms when multiplying quadratic polynomials by linear factors.

## 5. Key Terms & Revision Summary
| Method | Identity / Formula | Example |
| :--- | :--- | :--- |
| **Difference of Two Squares** | $a^2 - b^2 = (a - b)(a + b)$ | $49x^2 - 1 = (7x - 1)(7x + 1)$ |
| **Grouping (4 terms)** | $ax + ay + bx + by$ | $(a + b)(x + y)$ |
| **Non-Monic Quadratic** | $ax^2 + bx + c$ | Split $bx$ via $ac$ product factors |
| **Triple Bracket** | $(x+a)(x+b)(x+c)$ | Expand pair first, then multiply 3rd |
