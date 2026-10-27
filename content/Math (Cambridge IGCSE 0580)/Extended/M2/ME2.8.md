# ME2.8 Direct & Inverse Proportion | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Proportion (variation) describes how one variable changes in precise mathematical harmony with another variable or power of a variable. Direct proportion means that as one quantity increases, the other increases proportionally ($y = k x^n$). Inverse proportion means that as one quantity increases, the other decreases ($y = \frac{k}{x^n}$).

Think of direct proportion like a scaling recipe: doubling the base variable doubles (or quadruples for $x^2$) the target variable. Think of inverse proportion like sharing a fixed pizza: doubling the number of people halves each person's slice size ($y \propto \frac{1}{x}$).

## 2. Key Definitions, Principles & Formulas
- **Direct Proportion Symbol ($\propto$)**:
  - $y \propto x \implies y = kx$
  - $y \propto x^2 \implies y = kx^2$
  - $y \propto \sqrt{x} \implies y = k\sqrt{x}$
- **Inverse Proportion Symbol ($\propto$)**:
  - $y \propto \frac{1}{x} \implies y = \frac{k}{x}$
  - $y \propto \frac{1}{x^2} \implies y = \frac{k}{x^2}$
  - $y \propto \frac{1}{\sqrt{x}} \implies y = \frac{k}{\sqrt{x}}$
- **Constant of Proportionality ($k$)**: A fixed non-zero constant connecting the variables.

> 💡 **Exam Tip**: ALWAYS write down the general formula with constant $k$ as your very FIRST step! Calculate $k$ using the given pair of initial values before answering subsequent parts.

> ⚠️ **Common Misconception**: Students often forget to apply powers or roots to $x$ when substituting. For example, if $y \propto x^2$ and $x$ doubles, $y$ increases by a factor of $2^2 = 4$, NOT $2$.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Solving Inverse Square Proportion Problems
$P$ is inversely proportional to the square of $r$. When $r = 3$, $P = 4$.
(a) Find a formula for $P$ in terms of $r$.
(b) Calculate the value of $P$ when $r = 6$.
(c) Calculate the value of $r$ when $P = 36$, where $r > 0$.

#### Solution:
(a)
- **Step 1: Convert the proportional statement into an equation using constant $k$.**
  $$P \propto \frac{1}{r^2} \implies P = \frac{k}{r^2}$$
- **Step 2: Substitute given initial values $r = 3$ and $P = 4$ into the equation.**
  $$4 = \frac{k}{3^2} \implies 4 = \frac{k}{9}$$
- **Step 3: Solve for $k$.**
  $$k = 4 \times 9 = 36$$
- **Step 4: State the explicit formula for $P$ in terms of $r$.**
  $$P = \frac{36}{r^2}$$

(b)
- **Step 1: Substitute $r = 6$ into the derived formula $P = \frac{36}{r^2}$.**
  $$P = \frac{36}{6^2}$$
- **Step 2: Square the denominator and divide.**
  $$P = \frac{36}{36} = 1$$

(c)
- **Step 1: Substitute $P = 36$ into the formula $P = \frac{36}{r^2}$.**
  $$36 = \frac{36}{r^2}$$
- **Step 2: Rearrange to solve for $r^2$.**
  $$36 r^2 = 36 \implies r^2 = \frac{36}{36} = 1$$
- **Step 3: Take positive square root since $r > 0$.**
  $$r = \sqrt{1} = 1$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Omitting Constant $k$**: Writing $P = \frac{1}{r^2}$ without incorporating constant $k$.
- **Power Relation Omission**: Writing $y = kx$ instead of $y = kx^2$ when the question specifies "proportional to the square of $x$".
- **Square Root Inversion Slips**: Forgetting to square both sides when isolating $x$ in $y = k\sqrt{x} \implies \sqrt{x} = \frac{y}{k} \implies x = \left(\frac{y}{k}\right)^2$.

## 5. Key Terms & Revision Summary
| Proportional Relationship | Algebraic Formula | Graph Shape |
| :--- | :--- | :--- |
| **$y$ directly proportional to $x$** | $y = kx$ | Straight line through origin |
| **$y$ directly proportional to $x^2$** | $y = kx^2$ | Half-parabola starting at origin |
| **$y$ inversely proportional to $x$** | $y = \frac{k}{x}$ | Hyperbola curve in 1st quadrant |
| **$y$ inversely proportional to $x^2$** | $y = \frac{k}{x^2}$ | Steep reciprocal curve |
