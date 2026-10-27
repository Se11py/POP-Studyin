# Topic: ME3.3 Gradient & Rate of Change

The gradient of a line or curve quantifies the rate of change of $y$ with respect to $x$, measuring average rate of change across an interval via a secant or instantaneous rate of change at a specific point via a tangent.

---

### 1. Rate of Change Breakdown

| Concept | Geometric Representative | Formula / Method |
| --- | --- | --- |
| Average Rate of Change | Secant Line joining $A(x_1, y_1)$ and $B(x_2, y_2)$ | $m_{\text{avg}} = \frac{f(x_2) - f(x_1)}{x_2 - x_1} = \frac{\Delta y}{\Delta x}$ |
| Instantaneous Rate of Change | Tangent Line at single point $P(x, y)$ | $m_{\text{inst}} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} = \text{Gradient of Tangent}$ |
| Unit Interpretation | Ratio of Axis Units | $\text{Unit of } y \text{ divided by Unit of } x$ (e.g. $\text{m/s}, \text{\$}/\text{hour}$). |

---

### 2. Geometry & ASCII Diagram

```
         y ^              Secant Line AB
           |             /
           |        .---* B (x2, y2)
           |       /   /
           |  P * /--/   Tangent Line at P
           |   / /  /
           |  A *--'
  ---------+----------------------------> x
           |
```

* **Secant vs Tangent:** Secant line intersects curve at two points; Tangent line touches curve at exactly one point without crossing.
* **Tangent Construction:** Draw a balanced ruler touching the point $P$ such that angles between ruler and curve on both sides are equal.
* **Sign of Gradient:** Positive gradient indicates growth/increase; negative gradient indicates decay/decrease; zero gradient indicates turning point.

$$m_{\text{avg}} = \frac{y_2 - y_1}{x_2 - x_1}$$

---

### 3. Worked Example

> **Question:**
> A curve has equation $y = x^2 - 4x + 5$.
> 1. Calculate the average rate of change of $y$ with respect to $x$ over the interval $1 \le x \le 4$.
> 2. Given that the tangent to the curve at $x = 3$ passes through $(3, 2)$ and $(5, 6)$, find the instantaneous rate of change at $x = 3$.

**Step 1: Calculate Average Rate of Change Over Interval $[1, 4]$**

1. Evaluate $y$ at endpoints $x_1 = 1$ and $x_2 = 4$:

$$y_1 = (1)^2 - 4(1) + 5 = 1 - 4 + 5 = 2$$

$$y_2 = (4)^2 - 4(4) + 5 = 16 - 16 + 5 = 5$$

2. Calculate average gradient of secant line:

$$m_{\text{avg}} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{5 - 2}{4 - 1} = \frac{3}{3} = 1$$

**Step 2: Calculate Instantaneous Rate of Change at $x = 3$**

1. Apply gradient formula to tangent points $(3, 2)$ and $(5, 6)$:

$$m_{\text{inst}} = \frac{6 - 2}{5 - 3} = \frac{4}{2} = 2$$

2. **Average Rate of Change:** $1$
3. **Instantaneous Rate of Change at $x=3$:** $2$

---

### 4. Common Examiner Traps

* **Confusing Secant and Tangent:** Calculating average rate over an interval when asked for instantaneous rate at a specific point.
* **Poor Tangent Drawing:** Drawing a line that cuts through the curve at the target point instead of grazing it.
* **Unit Omission:** Leaving off context units when evaluating physical rates of change (e.g. speed, flow rate).
