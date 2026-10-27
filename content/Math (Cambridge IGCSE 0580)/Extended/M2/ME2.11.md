# ME2.11 Sketching Curves | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Sketching advanced curves in the Extended tier requires synthesizing algebraic features (roots, $y$-intercepts, turning points, asymptotes, and end behavior) into an accurate, proportioned mathematical diagram. Unlike point-by-point plotting, curve sketching tests deep structural comprehension of polynomial, rational, and exponential functions.

Think of sketching a curve like creating a topographical land map. You mark key topological landmarks: where the path crosses sea level ($x$-intercepts), where it crosses the prime meridian ($y$-intercept), peak summits and valley bottoms (turning points), and uncrossable fences (asymptotes).

## 2. Key Definitions, Principles & Formulas
- **Cubic Curve Shapes ($y = ax^3 + bx^2 + cx + d$)**:
  - $a > 0$: Starts in bottom-left (3rd quadrant), ends in top-right (1st quadrant).
  - $a < 0$: Starts in top-left (2nd quadrant), ends in bottom-right (4th quadrant).
  - Factorised cubic $y = (x - p)(x - q)(x - r)$ has roots at $x = p, q, r$.
  - Repeated root $y = (x - p)^2 (x - q)$ touches the $x$-axis at $x = p$ without crossing (turning point on axis).
- **Exponential Curve Shapes ($y = k a^x + c$)**:
  - Horizontal asymptote at $y = c$.
  - $y$-intercept at $(0, k + c)$.
  - Always strictly increasing ($a > 1$) or decreasing ($0 < a < 1$).
- **Reciprocal Curves ($y = \frac{k}{x - p} + q$)**:
  - Vertical asymptote at $x = p$, horizontal asymptote at $y = q$.

> 💡 **Exam Tip**: When a quadratic or cubic factor is squared (e.g. $(x - 3)^2$), the curve TOUCHES the $x$-axis at $x = 3$ like a turning point, rather than crossing through it.

> ⚠️ **Common Misconception**: Drawing exponential graphs that bend back upwards or touch the horizontal asymptote. Exponential curves $y = a^x$ approach $y = 0$ asymptotically as $x \to -\infty$ but NEVER cross or touch $y = 0$.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Sketching a Factorised Cubic and Exponential Curve
(a) Sketch the graph of $y = (x + 1)(x - 2)(x - 4)$, showing clearly the coordinates of all points where the curve crosses the coordinate axes.
(b) Sketch the graph of $y = 3^x + 2$, showing the $y$-intercept and asymptote.

#### Solution:
(a)
- **Step 1: Determine the polynomial degree and leading coefficient.**
  Expanding yields $+x^3$, so $a = +1 > 0$. The curve comes from $-\infty$ in the 3rd quadrant and heads to $+\infty$ in the 1st quadrant.
- **Step 2: Find $x$-intercepts (roots) by setting $y = 0$.**
  $$(x + 1)(x - 2)(x - 4) = 0 \implies x = -1, \quad x = 2, \quad x = 4$$
  The curve crosses the $x$-axis at $(-1, 0)$, $(2, 0)$, and $(4, 0)$.
- **Step 3: Find the $y$-intercept by setting $x = 0$.**
  $$y = (0 + 1)(0 - 2)(0 - 4) = (1)(-2)(-4) = +8$$
  The curve crosses the $y$-axis at $(0, 8)$.
- **Step 4: Sketch a smooth cubic S-curve passing through $(-1,0)$, turning above $(0,8)$, crossing down at $(2,0)$, turning below the axis, and rising up through $(4,0)$.**

```text
            y
            |  (0,8)
            * 8
           / \
  -1      /   \    2        4
---•-----/-----\---•--------•---> x
        /       \ /        /
       /         *        /
      /        (3.1,-2.1)/
```

(b)
- **Step 1: Identify the horizontal asymptote.**
  As $x \to -\infty$, $3^x \to 0$, so $y \to 2$. Horizontal asymptote line is $y = 2$.
- **Step 2: Calculate the $y$-intercept by setting $x = 0$.**
  $$y = 3^0 + 2 = 1 + 2 = 3 \implies (0, 3)$$
- **Step 3: Sketch an increasing J-curve starting just above the asymptote line $y = 2$ on the left, passing through $(0, 3)$, and curving steeply upwards to the right.**

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Crossing at Repeated Roots**: Drawing the graph cutting straight through $x = p$ for a repeated factor $(x - p)^2$ instead of bouncing at a turning point.
- **Missing Asymptote Labels**: Drawing exponential curves without indicating the horizontal asymptote equation or boundary line.
- **Inverted Cubic End Behavior**: Drawing $a > 0$ cubics starting in the 2nd quadrant instead of the 3rd quadrant.

## 5. Key Terms & Revision Summary
| Function Type | General Equation | $x$-intercept Behavior | Asymptote |
| :--- | :--- | :--- | :--- |
| **Linear** | $y = mx + c$ | Crosses at $x = -\frac{c}{m}$ | None |
| **Quadratic** | $y = a(x-p)(x-q)$ | Crosses at $p, q$ | None |
| **Cubic Single Roots** | $y = a(x-p)(x-q)(x-r)$ | Crosses at $p, q, r$ | None |
| **Cubic Repeated Root** | $y = a(x-p)^2(x-q)$ | Touches at $p$, crosses at $q$ | None |
| **Exponential** | $y = k a^x + c$ | Depends on shift $c$ | Horizontal at $y = c$ |
