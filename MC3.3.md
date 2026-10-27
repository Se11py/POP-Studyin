# Topic: MC3.3 Gradient of a Line

The gradient $m$ of a straight line quantifies its rate of vertical change relative to horizontal change, calculated as the ratio of change in $y$ to change in $x$ between two points.

---

### 1. Gradient Type Breakdown

| Line Orientation | Gradient Sign ($m$) | Mathematical Property |
| --- | --- | --- |
| Sloping Upwards (Left to Right) | $m > 0$ (Positive) | As $x$ increases, $y$ increases. |
| Sloping Downwards (Left to Right) | $m < 0$ (Negative) | As $x$ increases, $y$ decreases. |
| Horizontal Line | $m = 0$ | $y$ is constant ($\Delta y = 0$). |
| Vertical Line | Undefined | $x$ is constant ($\Delta x = 0$). |

---

### 2. Geometry & ASCII Diagram

```
         y ^                        y ^
           |     / (m > 0)            |     \ (m < 0)
           |    /                     |      \
           |   /| rise (y2-y1)        |       |\ rise (y2-y1)
           |  / |                     |       | \
           |-+--+----------> x        |-+-----+----------> x
           |   run (x2-x1)            |   run (x2-x1)
```

* **Rise over Run:** Gradient measures vertical units gained per unit of horizontal movement.
* **Order Consistency:** Point coordinates must be aligned consistently: $\frac{y_2 - y_1}{x_2 - x_1} = \frac{y_1 - y_2}{x_1 - x_2}$.
* **Collinear Points:** Three points lie on the same straight line if the gradient between any two pairs is identical.

$$m = \frac{y_2 - y_1}{x_2 - x_1}$$

---

### 3. Worked Example

> **Question:**
> 1. Find the gradient of the line passing through points $A(2, -3)$ and $B(6, 5)$.
> 2. Determine whether the line passing through $C(-1, 4)$ and $D(3, -4)$ is steeper than line $AB$.

**Step 1: Calculate Gradient of Line $AB$**

1. Apply gradient formula $m_{AB} = \frac{y_2 - y_1}{x_2 - x_1}$:

$$m_{AB} = \frac{5 - (-3)}{6 - 2} = \frac{5 + 3}{4}$$

2. Simplify the fraction:

$$m_{AB} = \frac{8}{4} = 2$$

**Step 2: Calculate Gradient of Line $CD$ and Compare Steepness**

1. Calculate gradient $m_{CD}$:

$$m_{CD} = \frac{-4 - 4}{3 - (-1)} = \frac{-8}{3 + 1} = \frac{-8}{4} = -2$$

2. Compare absolute values of gradients $|m_{CD}|$ and $|m_{AB}|$:

$$|m_{CD}| = |-2| = 2, \quad |m_{AB}| = |2| = 2$$

3. **Gradient $m_{AB}$:** $2$
4. **Steepness Comparison:** Both lines have equal steepness ($|m| = 2$), but slope in opposite directions.

---

### 4. Common Examiner Traps

* **Inverting the Formula:** Calculating $\frac{x_2 - x_1}{y_2 - y_1}$ (run over rise) instead of $\frac{y_2 - y_1}{x_2 - x_1}$.
* **Inconsistent Point Order:** Mixing coordinate order, e.g. calculating $\frac{y_2 - y_1}{x_1 - x_2}$.
* **Sign Errors in Subtraction:** Subtracting a negative coordinate incorrectly, such as $5 - (-3) = 2$ instead of $8$.
