# ME2.5 Equations & Rearranging Formulae | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Equations and formula manipulation in the Extended tier require choosing the most efficient mathematical tool to solve non-linear relations. Quadratic equations ($ax^2 + bx + c = 0$) can be solved via factorisation (exact roots), completing the square (vertex form & exact surd roots), or the quadratic formula (decimal solutions to 3 s.f.). Rearranging complex formulas involves handling cases where the subject appears inside roots, under powers, or twice in different terms.

Think of completing the square like re-packaging a quadratic into a perfect square box plus a remnant constant: $(x + p)^2 + q$. This instantly reveals the exact minimum or maximum turning point of a parabola. When changing the subject with repeated terms, factorising is the key that unlocks the subject from multiple terms.

## 2. Key Definitions, Principles & Formulas
- **Quadratic Formula**: For $ax^2 + bx + c = 0$:
  $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
- **Completing the Square ($a = 1$)**:
  $$x^2 + bx + c = \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2 + c$$
  - Turning point coordinates of $y = (x + p)^2 + q$ are $(-p, q)$.
- **Rearranging Formulae when Subject Appears Twice**:
  1. Clear fractions and expand brackets containing the subject.
  2. Collect all terms containing the subject on one side.
  3. Move all non-subject terms to the opposite side.
  4. **Factorise** out the subject as a common factor.
  5. Divide by the remaining bracket expression.

> 💡 **Exam Tip**: If an exam question specifies "give your answers correct to 2 decimal places", this is a strong direct hint to use the Quadratic Formula! If it asks for "exact surd form", use Completing the Square.

> ⚠️ **Common Misconception**: In completing the square, students often forget to subtract $\left(\frac{b}{2}\right)^2$. $x^2 + 6x + 10 = (x + 3)^2 - 9 + 10 = (x + 3)^2 + 1$.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Completing the Square and Advanced Rearranging
(a) Write $x^2 - 8x + 5$ in the form $(x - a)^2 + b$. Hence, solve $x^2 - 8x + 5 = 0$ giving exact surd solutions.
(b) Rearrange the formula to make $x$ the subject: $y = \frac{3x + 4}{x - 2}$.

#### Solution:
(a)
- **Step 1: Identify $b = -8$ and calculate $\frac{b}{2} = -4$.**
  $$\left(\frac{b}{2}\right)^2 = (-4)^2 = 16$$
- **Step 2: Complete the square on $x^2 - 8x$.**
  $$x^2 - 8x + 5 = (x - 4)^2 - 16 + 5$$
- **Step 3: Combine constants to complete part (a).**
  $$(x - 4)^2 - 11$$
- **Step 4: Set the completed square equal to $0$ to solve.**
  $$(x - 4)^2 - 11 = 0 \implies (x - 4)^2 = 11$$
- **Step 5: Take the square root of both sides (remembering $\pm$).**
  $$x - 4 = \pm \sqrt{11}$$
- **Step 6: Add $4$ to isolate $x$ for exact surd answers.**
  $$x = 4 \pm \sqrt{11}$$

(b)
- **Step 1: Multiply both sides by denominator $(x - 2)$ to clear the fraction.**
  $$y(x - 2) = 3x + 4$$
- **Step 2: Expand the left-hand side bracket.**
  $$yx - 2y = 3x + 4$$
- **Step 3: Move all terms containing subject $x$ to the left side.**
  $$yx - 3x - 2y = 4$$
- **Step 4: Move non-$x$ terms to the right side.**
  $$yx - 3x = 2y + 4$$
- **Step 5: Factorise $x$ out on the left side.**
  $$x(y - 3) = 2y + 4$$
- **Step 6: Divide by $(y - 3)$ to make $x$ the isolated subject.**
  $$x = \frac{2y + 4}{y - 3}$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Quadratic Formula Sign Slip**: Using $+b$ instead of $-b$ or miscalculating $-4ac$ when $c$ is negative (e.g. $b^2 - 4(1)(-5) = b^2 + 20$, not $b^2 - 20$).
- **Dividing Without Factorising First**: Trying to make $x$ the subject in $yx - 3x = 4$ by writing $x = \frac{4 + 3x}{y}$, which leaves $x$ on both sides (invalid subject!).
- **Square Root Sign Omission**: Forgetting $\pm$ when square-rooting both sides of an equation (e.g. $x^2 = 9 \implies x = \pm 3$).

## 5. Key Terms & Revision Summary
| Method / Form | Formula / Structure | Primary Use |
| :--- | :--- | :--- |
| **Quadratic Formula** | $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$ | Decimal solutions (3 s.f.) |
| **Completed Square** | $(x + p)^2 + q$ | Turning point $(-p, q)$ & exact surds |
| **Repeated Subject** | Factorise: $x(y - 3) = \dots$ | Rearranging multi-term variables |
| **Discriminant** | $b^2 - 4ac$ | Checks root types ($>0$ two, $=0$ one, $<0$ none) |
