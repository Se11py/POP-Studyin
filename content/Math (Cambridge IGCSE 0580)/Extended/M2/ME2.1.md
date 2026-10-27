# ME2.1 Algebraic Representation & Formulae | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Advanced algebraic representation involves converting complex real-world relationships, geometric scenarios, and word problems into precise mathematical formulas and expressions. In the Extended tier, variables represent interdependent quantities that can be combined, substituted, and transformed to solve higher-level multi-step problems.

Think of algebraic representation as creating a symbolic blueprint for a physical system. Whether modeling the volume of a composite 3D shape, calculating financial interest, or expressing time in terms of speed and distance, algebra translates written statements into exact equations that unlock solutions.

## 2. Key Definitions, Principles & Formulas
- **Constructing Algebraic Expressions**:
  - Consecutive integers: $n, n+1, n+2, \dots$
  - Consecutive even/odd integers: $2n, 2n+2, 2n+4, \dots$ or $2n+1, 2n+3, \dots$
  - Perimeter & Area formulas expressed algebraically (e.g. $P = 2l + 2w$).
- **Algebraic Substitution**: Substituting negative numbers, fractions, and algebraic terms into expressions with exponents or roots:
  $$\text{Evaluate } f(x,y) = \sqrt{x^2 + 3y} \quad \text{for } x = -4, y = 3$$
- **Compound Formulae**: Combining multiple formulas into a single unified expression (e.g. substituting $h = \sqrt{l^2 - r^2}$ into $V = \frac{1}{3}\pi r^2 h$).

> 💡 **Exam Tip**: When asked to "show that" an algebraic formula reduces to a specific form, write down every intermediate line of working clearly. Never jump straight to the final given answer.

> ⚠️ **Common Misconception**: Students frequently mix up units when setting up rate or time formulas. Ensure all time quantities match (e.g. converting minutes to hours by dividing by $60$, so $m$ minutes $= \frac{m}{60}$ hours).

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Constructing and Evaluating Geometric Formulae
A open rectangular storage box has a square base of side length $x\text{ cm}$ and a height of $h\text{ cm}$.
(a) Write down an expression for the total external surface area, $A\text{ cm}^2$, of the open box in terms of $x$ and $h$.
(b) The total volume of the box is fixed at $250\text{ cm}^3$. Show that $A = x^2 + \frac{1000}{x}$.
(c) Calculate the surface area $A$ when $x = 5\text{ cm}$.

#### Solution:
(a)
- **Step 1: Identify the individual faces of the open box.**
  - $1$ square base of dimensions $x \times x \implies \text{Area} = x^2$
  - $4$ identical vertical side faces of dimensions $x \times h \implies \text{Area} = 4xh$
- **Step 2: Sum the face areas to form the surface area formula.**
  $$A = x^2 + 4xh$$

(b)
- **Step 1: Write down the volume formula for the box.**
  $$V = \text{base area} \times \text{height} = x^2 h$$
- **Step 2: Set volume equal to the given value $250\text{ cm}^3$.**
  $$x^2 h = 250$$
- **Step 3: Rearrange to make $h$ the subject.**
  $$h = \frac{250}{x^2}$$
- **Step 4: Substitute this expression for $h$ back into the surface area formula $A = x^2 + 4xh$.**
  $$A = x^2 + 4x \left(\frac{250}{x^2}\right)$$
- **Step 5: Simplify the algebraic fraction.**
  $$A = x^2 + \frac{1000x}{x^2} = x^2 + \frac{1000}{x} \quad \text{(As required)}$$

(c)
- **Step 1: Substitute $x = 5$ into the derived formula $A = x^2 + \frac{1000}{x}$.**
  $$A = (5)^2 + \frac{1000}{5}$$
- **Step 2: Evaluate exponent and division terms.**
  $$A = 25 + 200$$
- **Step 3: Calculate final area value.**
  $$A = 225\text{ cm}^2$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Incorrect Face Count**: Including 6 faces instead of 5 when calculating the surface area of an *open* container.
- **Algebraic Fraction Substitution Slip**: Writing $4x \times \frac{250}{x^2}$ as $\frac{1000x^2}{x^2} = 1000$ by misapplying fraction multiplication.
- **BIDMAS Errors in Complex Evaluation**: Squaring before substituting or failing to enclose negative numbers in parentheses.

## 5. Key Terms & Revision Summary
| Concept | Mathematical Form | Key Exam Application |
| :--- | :--- | :--- |
| **Expression** | $x^2 + \frac{1000}{x}$ | Geometric & real-world modeling |
| **Formula** | $V = x^2 h$ | Multi-variable relationship |
| **Substitution** | $A = (5)^2 + \frac{1000}{5}$ | Evaluating at specific parameters |
| **Show That** | Step-by-step proof | Mandatory un-truncated lines of working |
