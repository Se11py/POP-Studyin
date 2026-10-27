# ME2.10 Graphs of Functions | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Extended function graphs encompass advanced non-linear curves including cubic functions, exponential growth/decay functions, and multi-term reciprocal functions. In addition to plotting tables of values, candidates must use graphical techniques to estimate real roots of equations ($f(x) = k$), locate turning points, and draw geometric tangents to estimate instant rates of change (gradients) on non-linear curves.

Think of a tangent to a curve at a point $P$ like a straight ruler resting flush against a curved surface without cutting through it. The slope of that straight ruler gives the exact instantaneous gradient (rate of change) of the function at that precise point.

## 2. Key Definitions, Principles & Formulas
- **Advanced Function Shapes**:
  - **Cubic ($y = ax^3 + \dots$)**: S-shaped curve with up to two turning points (local max/min).
  - **Exponential ($y = a^x, a > 1$)**: J-shaped curve passing through $(0, 1)$, growing exponentially as $x$ increases, asymptotic to $y = 0$ as $x \to -\infty$.
  - **Reciprocal ($y = \frac{a}{x} + \frac{b}{x^2}$)**: Asymptotes at axes.
- **Estimating Roots graphically**:
  - To solve $f(x) = k$, draw horizontal line $y = k$ and read $x$-coordinates of intersection points.
  - To solve $f(x) = mx + c$, draw line $y = mx + c$ and read $x$-coordinates of intersection points.
- **Estimating Gradient via Tangent**:
  $$\text{Instantaneous Gradient at } x=p \approx \frac{y_2 - y_1}{x_2 - x_1} \quad \text{on drawn tangent}$$

> 💡 **Exam Tip**: Use a clear transparent ruler to align your tangent so that the angle between the ruler and the curve is identical on both sides of the contact point.

> ⚠️ **Common Misconception**: A tangent must NOT cut through the curve at the point of contact. Drawing a secant line that intersects the curve at two nearby points will lose the method mark.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Estimating Roots and Gradients from Function Graphs
The diagram shows the graph of the cubic function $y = x^3 - 3x^2 - x + 3$ for $-2 \leqslant x \leqslant 4$.
(a) Use the graph to solve the equation $x^3 - 3x^2 - x + 3 = 2$.
(b) By drawing a suitable straight line on the grid, solve $x^3 - 3x^2 - x + 3 = 2x - 1$.
(c) By drawing a tangent, estimate the gradient of the curve at $x = 3$.

#### Solution:
(a)
- **Step 1: Draw the horizontal straight line $y = 2$ across the grid.**
- **Step 2: Identify the $x$-coordinates where $y = 2$ intersects the cubic curve.**
- **Step 3: Read $x$-values directly from the horizontal axis.**
  $$x \approx -0.8, \quad x \approx 0.6, \quad x \approx 3.2$$

(b)
- **Step 1: Construct a table of values for the straight line $y = 2x - 1$.**
  $$\text{When } x = 0, y = -1 \implies (0, -1)$$
  $$\text{When } x = 3, y = 5 \implies (3, 5)$$
- **Step 2: Draw the straight line $y = 2x - 1$ accurately across the grid using a ruler.**
- **Step 3: Read the $x$-coordinates where the line $y = 2x - 1$ intersects the curve $y = f(x)$.**
  $$x \approx -0.9, \quad x \approx 1.2, \quad x \approx 2.7$$

(c)
- **Step 1: Locate the point $P(3, 0)$ on the curve where $x = 3$.**
- **Step 2: Place a ruler flush against the curve at $P(3, 0)$ and draw a sharp straight tangent line.**
- **Step 3: Choose two easily readable coordinate points on the drawn tangent line.**
  $$\text{Point 1}: (3, 0), \quad \text{Point 2}: (4, 8)$$
- **Step 4: Calculate the gradient of the tangent line.**
  $$\text{Gradient } m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{8 - 0}{4 - 3} = \frac{8}{1} = 8$$
  $$\text{Estimated Gradient at } x = 3 \approx 8.0 \quad (\text{Tolerance } \pm 0.5)$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Incorrect Line Construction**: Plotting $y = 2x$ instead of $y = 2x - 1$ when solving $f(x) = 2x - 1$.
- **Tangent Chord Error**: Drawing a line segment that cuts across the curve rather than touching lightly at one point.
- **Reading Inaccurate Grid Scales**: Miscounting small squares on non-standard axis grid divisions (e.g. 1 square $= 0.2$ vs $0.1$).

## 5. Key Terms & Revision Summary
| Task | Graphical Procedure | Output |
| :--- | :--- | :--- |
| **Solve $f(x) = k$** | Draw horizontal line $y = k$ | $x$-coordinates of intersection |
| **Solve $f(x) = mx + c$** | Draw straight line $y = mx + c$ | $x$-coordinates of intersection |
| **Estimate Rate of Change** | Draw tangent at $x = p$, calculate $\frac{\Delta y}{\Delta x}$ | Gradient at $x = p$ |
| **Turning Points** | Locate local crests (max) and troughs (min) | Coordinates $(x, y)$ where gradient $= 0$ |
