# Topic: ME2.9 Advanced Linear Graphs & Coordinate Geometry

Coordinate geometry analyzes straight line properties in 2D space, including segment midpoints, line length distances, and perpendicular lines with negative reciprocal gradients: \(m_1 \cdot m_2 = -1\).

---

### 1. Coordinate Geometry Formulas Breakdown

| Geometric Property | Formula | Description |
| --- | --- | --- |
| Segment Length / Distance | \(d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\) | Pythagorean distance between points \((x_1, y_1)\) and \((x_2, y_2)\) |
| Midpoint Coordinates | \(M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)\) | Average of \(x\)-coordinates and \(y\)-coordinates |
| Perpendicular Gradients | \(m_2 = -\frac{1}{m_1} \iff m_1 m_2 = -1\) | Negative reciprocal gradient for perpendicular lines |

---

### 2. Anatomy of Parallel & Perpendicular Lines

```
                     y-axis
                       |
        Parallel Line  |        / Line L₁ (Gradient m = +2)
          y = 2x + 5   |       /
                 \     |      /
                  \    |     /
                   \   |    /   Line L₂ Perpendicular (m = -1/2)
                    \  |   /   /
                     \ |  /   /
       ---------------+--+---+--------------- x-axis
                       |/  (Right angle 90°)
```

* **Negative Reciprocal Gradient:** If Line 1 has gradient \(m_1 = \frac{a}{b}\), perpendicular Line 2 has gradient \(m_2 = -\frac{b}{a}\).
* **Distance Formula:** Derived directly from Pythagoras' Theorem \(a^2 + b^2 = c^2\).

$$m_1 \cdot m_2 = -1 \implies m_2 = -\frac{1}{m_1}$$

---

### 3. Worked Example

> **Question:**
> Points \(A\) and \(B\) have coordinates \(A(1, 7)\) and \(B(5, -1)\).
> 1. Find the distance \(AB\) and the coordinates of midpoint \(M\).
> 2. Find the equation of the perpendicular bisector of line segment \(AB\).

**Step 1: Calculate distance AB and midpoint M**

1. Calculate distance \(AB\) using distance formula:

$$AB = \sqrt{(5 - 1)^2 + (-1 - 7)^2} = \sqrt{4^2 + (-8)^2} = \sqrt{16 + 64} = \sqrt{80} \approx 8.94$$

2. Calculate midpoint \(M\):

$$M = \left(\frac{1 + 5}{2}, \frac{7 + (-1)}{2}\right) = \left(\frac{6}{2}, \frac{6}{2}\right) = (3, 3)$$

**Step 2: Find equation of perpendicular bisector**

1. Find gradient \(m_{AB}\) of line segment \(AB\):

$$m_{AB} = \frac{-1 - 7}{5 - 1} = \frac{-8}{4} = -2$$

2. Determine perpendicular gradient \(m_{\perp}\):

$$m_{\perp} = -\frac{1}{-2} = +\frac{1}{2}$$

3. Substitute \(m_{\perp} = \frac{1}{2}\) and midpoint \(M(3, 3)\) into \(y = mx + c\):

$$3 = \frac{1}{2}(3) + c \implies 3 = 1.5 + c \implies c = 1.5$$

4. **Key result 1:** Length \(AB = \sqrt{80} \approx 8.94\) units; Midpoint \(M = (3, 3)\).
5. **Key result 2:** Perpendicular bisector equation is \(y = \frac{1}{2}x + 1.5\) (or \(x - 2y + 3 = 0\)).

---

### 4. Common Examiner Traps

* **Perpendicular Gradient Sign Error:** Neglecting the negative sign when flipping gradients, e.g. taking perpendicular of \(2\) as \(\frac{1}{2}\) instead of \(-0.5\).
* **Using Endpoint Instead of Midpoint:** Substituting point \(A\) or \(B\) into the line equation instead of midpoint \(M\) when finding the perpendicular bisector.
