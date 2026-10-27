# Topic: ME3.5 Parallel & Perpendicular Lines

Two lines are parallel if they possess equal gradients ($m_1 = m_2$) and perpendicular if they intersect at right angles ($90^\circ$), with gradients that are negative reciprocals ($m_1 \cdot m_2 = -1$).

---

### 1. Line Relationship Breakdown

| Relationship | Gradient Condition | Geometric Orientation |
| --- | --- | --- |
| Parallel Lines | $m_1 = m_2$ | Never intersect; equal slope. |
| Perpendicular Lines | $m_2 = -\frac{1}{m_1} \quad (m_1 \cdot m_2 = -1)$ | Intersect at right angles ($90^\circ$). |
| Perpendicular Bisector | Passes through Midpoint $M$; $m_{\perp} = -\frac{1}{m_{AB}}$ | Line of reflective symmetry between two points $A$ and $B$. |

---

### 2. Geometry & ASCII Diagram

```
         y ^                 / L1: y = m1*x + c1 (parallel to L2)
           |                /
           |  L3           /
           |   \          /
           |    \   90°  /  L2: y = m1*x + c2
           |     \  |   /
           |      \ |  /
  ---------+-------*--+----------------> x
           |        \ /   m3 = -1 / m1
```

* **Negative Reciprocal Rule:** To find perpendicular gradient, flip the fraction and change the sign: $m \to -\frac{1}{m}$.
* **Perpendicular Bisector Recipe:** 1. Find midpoint $M$. 2. Find gradient $m_{AB}$. 3. Calculate $m_{\perp} = -\frac{1}{m_{AB}}$. 4. Use point-slope form with $M$ and $m_{\perp}$.
* **Horizontal & Vertical Exception:** Horizontal line $y = k$ ($m=0$) is perpendicular to vertical line $x = h$ (undefined gradient).

$$m_1 \cdot m_2 = -1 \iff m_2 = -\frac{1}{m_1}$$

---

### 3. Worked Example

> **Question:**
> Given points $A(-2, 1)$ and $B(4, 9)$:
> 1. Find the gradient of line $AB$ and the gradient of any line perpendicular to $AB$.
> 2. Determine the equation of the perpendicular bisector of segment $AB$. Give your answer in the form $y = mx + c$.

**Step 1: Calculate Gradient $m_{AB}$ and Perpendicular Gradient $m_{\perp}$**

1. Calculate gradient of $AB$:

$$m_{AB} = \frac{9 - 1}{4 - (-2)} = \frac{8}{6} = \frac{4}{3}$$

2. Take negative reciprocal for perpendicular gradient $m_{\perp}$:

$$m_{\perp} = -\frac{1}{\frac{4}{3}} = -\frac{3}{4}$$

**Step 2: Find Midpoint of $AB$ and Equation of Perpendicular Bisector**

1. Calculate midpoint $M$ of segment $AB$:

$$x_M = \frac{-2 + 4}{2} = 1, \quad y_M = \frac{1 + 9}{2} = 5 \implies M(1, 5)$$

2. Substitute $M(1, 5)$ and $m_{\perp} = -\frac{3}{4}$ into $y - y_1 = m(x - x_1)$:

$$y - 5 = -\frac{3}{4}(x - 1) \implies y - 5 = -\frac{3}{4}x + \frac{3}{4}$$

3. Convert to $y = mx + c$ form:

$$y = -\frac{3}{4}x + \frac{3}{4} + 5 \implies y = -\frac{3}{4}x + \frac{23}{4}$$

4. **Gradients:** $m_{AB} = \frac{4}{3}$, $m_{\perp} = -\frac{3}{4}$
5. **Perpendicular Bisector Equation:** $y = -\frac{3}{4}x + \frac{23}{4}$ (or $y = -0.75x + 5.75$)

---

### 4. Common Examiner Traps

* **Inverting Without Sign Change:** Writing $m_{\perp} = \frac{3}{4}$ instead of $-\frac{3}{4}$ (reciprocal without negative sign).
* **Sign Change Without Inverting:** Writing $m_{\perp} = -\frac{4}{3}$ instead of $-\frac{3}{4}$.
* **Bisector Point Selection:** Using point $A$ or $B$ instead of the midpoint $M$ when finding the perpendicular bisector.
