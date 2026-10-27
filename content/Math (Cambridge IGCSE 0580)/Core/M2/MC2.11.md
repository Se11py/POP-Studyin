# MC2.11 Sketching Curves | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Sketching a curve is different from plotting a detailed graph point-by-point. A sketch is a clear, accurate diagram showing the essential geometric features and general shape of a function without calculating long tables of coordinates.

Think of sketching a curve like capturing a portrait sketch rather than taking a pixel-perfect photograph. To sketch correctly, you must capture three essential landmarks: the overall shape (straight line, U-shape, n-shape, or hyperbola), the $y$-intercept where the graph crosses the vertical axis, and the $x$-intercepts (roots) where it crosses the horizontal axis.

## 2. Key Definitions, Principles & Formulas
- **Sketching Requirements**:
  1. Correct characteristic shape for the function type.
  2. Clearly labeled $y$-intercept $(0, c)$ where $x = 0$.
  3. Clearly labeled $x$-intercepts $(x_1, 0), (x_2, 0)$ where $y = 0$.
  4. Turning point location for quadratics.
- **Linear Sketches ($y = mx + c$)**:
  - Straight line with gradient $m$ and $y$-intercept at $(0, c)$.
- **Quadratic Sketches ($y = a(x - p)(x - q)$)**:
  - Roots at $x = p$ and $x = q$.
  - $y$-intercept at $(0, apq)$.
  - Symmetrical turning point located at $x = \frac{p + q}{2}$.
- **Reciprocal Sketches ($y = \frac{k}{x}$)**:
  - $k > 0$: Branches in 1st (top-right) and 3rd (bottom-left) quadrants.
  - $k < 0$: Branches in 2nd (top-left) and 4th (bottom-right) quadrants.

> 💡 **Exam Tip**: Always label axes $x$ and $y$ clearly and mark exact intercept coordinate numbers directly on the axes of your sketch.

> ⚠️ **Common Misconception**: Do NOT use graph paper or construct full tables of values when a question asks to "sketch" a curve. A neat diagram on standard answer paper with correctly marked intercepts earns full marks.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Sketching a Quadratic Curve
Sketch the graph of $y = (x - 2)(x + 4)$, clearly indicating the coordinates of all points where the curve crosses the coordinate axes.

#### Solution:
- **Step 1: Determine the general shape of the curve.**
  Expanding $(x - 2)(x + 4) = x^2 + 2x - 8$. The coefficient of $x^2$ is $+1$ (positive), so the curve is a U-shaped parabola.
- **Step 2: Find the $x$-intercepts (roots) by setting $y = 0$.**
  $$(x - 2)(x + 4) = 0 \implies x - 2 = 0 \text{ or } x + 4 = 0$$
  $$x = 2 \quad \text{and} \quad x = -4$$
  The curve crosses the $x$-axis at $(-4, 0)$ and $(2, 0)$.
- **Step 3: Find the $y$-intercept by setting $x = 0$.**
  $$y = (0 - 2)(0 + 4) = (-2)(4) = -8$$
  The curve crosses the $y$-axis at $(0, -8)$.
- **Step 4: Find the $x$-coordinate of the minimum turning point.**
  $$\text{Midpoint of roots} = \frac{-4 + 2}{2} = \frac{-2}{2} = -1$$
  $$y\text{-value at turning point} = (-1 - 2)(-1 + 4) = (-3)(3) = -9$$
  Turning point is at $(-1, -9)$.
- **Step 5: Draw the smooth U-shaped curve passing through $(-4,0)$, $(0,-8)$, and $(2,0)$.**

```text
         y
         |
  -4     |     2
---•-----|-----•----> x
    \    |    /
     \   |   /
      \  • -8
       \ /
        • (-1,-9)
```

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Incorrect Orientation**: Drawing an n-shape instead of a U-shape for $+x^2$ functions.
- **Missing Intercept Labels**: Sketching the curve correctly but leaving coordinate numbers off the $x$- and $y$-axes.
- **Asymptote Touch**: Touching or crossing the $x$- or $y$-axes when sketching reciprocal curves ($y = \frac{k}{x}$). Reciprocal branches approach axes infinitely closely but NEVER touch them.

## 5. Key Terms & Revision Summary
| Curve Type | Equation Form | $y$-intercept | $x$-intercepts |
| :--- | :--- | :--- | :--- |
| **Linear** | $y = mx + c$ | $(0, c)$ | $(-\frac{c}{m}, 0)$ |
| **U-shaped Quadratic** | $y = x^2 + bx + c$ | $(0, c)$ | Set $y=0$ & solve quadratic |
| **n-shaped Quadratic** | $y = -x^2 + bx + c$ | $(0, c)$ | Set $y=0$ & solve quadratic |
| **Reciprocal** | $y = \frac{k}{x}$ | None ($x \neq 0$) | None ($y \neq 0$) |
