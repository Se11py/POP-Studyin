# ME2.3 Algebraic Fractions | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
An algebraic fraction is a fraction containing algebraic expressions in its numerator, denominator, or both. Operating with algebraic fractions follows the exact same logical arithmetic rules as numerical fractions: finding common denominators for addition and subtraction, cross-cancelling shared factors for multiplication and division, and factorising expressions to simplify terms.

Think of algebraic fractions like numerical fractions with wrapped expressions inside. You cannot cancel individual terms across addition or subtraction signs (e.g. cancelling $x$ in $\frac{x + 3}{x + 5}$ is illegal!). You must first factorise numerators and denominators into bracketed products, then cancel matching identical bracket factors.

## 2. Key Definitions, Principles & Formulas
- **Simplifying Algebraic Fractions**: Factorise numerator and denominator completely, then cancel identical common factors:
  $$\frac{x^2 - 9}{x^2 + 5x + 6} = \frac{(x - 3)(x + 3)}{(x + 2)(x + 3)} = \frac{x - 3}{x + 2}$$
- **Adding and Subtracting Fractions**: Find the Common Denominator (LCM of denominators), convert numerators, and combine over a single denominator:
  $$\frac{a}{b} \pm \frac{c}{d} = \frac{ad \pm bc}{bd}$$
- **Multiplying Fractions**: Multiply numerators together and denominators together:
  $$\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}$$
- **Dividing Fractions**: Multiply by the reciprocal of the second fraction (Keep, Change, Flip):
  $$\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{ad}{bc}$$
- **Solving Equations with Algebraic Fractions**: Multiply every term in the equation by the common denominator to clear all fractions, yielding a linear or quadratic equation.

> 💡 **Exam Tip**: When subtracting algebraic fractions, always place the second expanded numerator inside parentheses to ensure negative signs are distributed correctly: $\frac{A}{C} - \frac{B}{C} = \frac{A - (B)}{C}$.

> ⚠️ **Common Misconception**: Illegal cancellation! $\frac{x^2 + 5}{x} \neq x + 5$. Terms separated by $+$ or $-$ cannot be cancelled individually. Only MULTIPLIED factors can be cancelled.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Simplifying, Adding, and Solving Algebraic Fractions
(a) Simplify fully: $\frac{2x^2 - 8}{x^2 - x - 6}$.
(b) Express as a single fraction in its simplest form: $\frac{3}{x - 2} - \frac{2}{x + 1}$.
(c) Solve the equation: $\frac{5}{x + 2} + \frac{3}{x - 1} = 2$.

#### Solution:
(a)
- **Step 1: Factorise the numerator completely (HCF then DOTS).**
  $$2x^2 - 8 = 2(x^2 - 4) = 2(x - 2)(x + 2)$$
- **Step 2: Factorise the quadratic denominator.**
  $$x^2 - x - 6 = (x - 3)(x + 2)$$
- **Step 3: Write as a simplified fraction and cancel the matching factor $(x + 2)$.**
  $$\frac{2(x - 2)(x + 2)}{(x - 3)(x + 2)} = \frac{2(x - 2)}{x - 3} \quad \text{or} \quad \frac{2x - 4}{x - 3}$$

(b)
- **Step 1: Identify the common denominator.**
  $$\text{Common Denominator} = (x - 2)(x + 1)$$
- **Step 2: Rewrite each fraction over the common denominator.**
  $$\frac{3(x + 1)}{(x - 2)(x + 1)} - \frac{2(x - 2)}{(x - 2)(x + 1)}$$
- **Step 3: Combine numerators over the single common denominator.**
  $$\frac{3(x + 1) - 2(x - 2)}{(x - 2)(x + 1)}$$
- **Step 4: Expand and simplify the numerator (distributing negative sign carefully).**
  $$3(x + 1) - 2(x - 2) = 3x + 3 - 2x + 4 = x + 7$$
- **Step 5: Write final simplified single fraction.**
  $$\frac{x + 7}{(x - 2)(x + 1)}$$

(c)
- **Step 1: Multiply both sides of the equation by $(x + 2)(x - 1)$ to clear fractions.**
  $$5(x - 1) + 3(x + 2) = 2(x + 2)(x - 1)$$
- **Step 2: Expand all brackets on both sides.**
  $$\text{Left Side: } 5x - 5 + 3x + 6 = 8x + 1$$
  $$\text{Right Side: } 2(x^2 + x - 2) = 2x^2 + 2x - 4$$
- **Step 3: Rearrange into standard quadratic equation form $ax^2 + bx + c = 0$.**
  $$2x^2 + 2x - 4 - 8x - 1 = 0 \implies 2x^2 - 6x - 5 = 0$$
- **Step 4: Solve using the quadratic formula ($a=2, b=-6, c=-5$).**
  $$x = \frac{-(-6) \pm \sqrt{(-6)^2 - 4(2)(-5)}}{2(2)} = \frac{6 \pm \sqrt{36 + 40}}{4} = \frac{6 \pm \sqrt{76}}{4}$$
  $$x = \frac{6 + 8.7178}{4} = 3.68 \quad \text{or} \quad x = \frac{6 - 8.7178}{4} = -0.679 \quad \text{(3 s.f.)}$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Distributive Sign Error in Subtraction**: Expanding $-2(x - 2)$ as $-2x - 4$ instead of $-2x + 4$.
- **Cancelling Terms Across Addition Signs**: Incorrectly reducing $\frac{x + 7}{x - 2}$ to $\frac{7}{-2}$.
- **Forgetting Right-Hand Side Multiplication**: Clearing denominators in an equation and forgetting to multiply the constant term on the right side: $5(x-1) + 3(x+2) = 2$ (Incorrect!) vs $= 2(x+2)(x-1)$ (Correct!).

## 5. Key Terms & Revision Summary
| Operation | Rule / Strategy | Key Exam Landmark |
| :--- | :--- | :--- |
| **Simplifying** | Factorise completely, cancel identical brackets | Never cancel un-factorised terms |
| **Addition / Subtraction** | Find LCM denominator $(x+a)(x+b)$ | Guard negative signs in numerator |
| **Multiplication** | $\frac{A}{B} \times \frac{C}{D} = \frac{AC}{BD}$ | Cross-cancel factors before multiplying |
| **Division** | $\frac{A}{B} \div \frac{C}{D} = \frac{A}{B} \times \frac{D}{C}$ | Flip 2nd fraction and multiply |
