# Topic: ME2.11 Transforming Graphs

Graph transformations apply geometric translations and stretches to a base curve \(y = f(x)\), producing modified functions \(y = f(x) + a\), \(y = f(x+a)\), \(y = af(x)\), and \(y = f(ax)\).

---

### 1. Function Transformation Rules Breakdown

| Transformation | Functional Notation | Geometric Effect | Coordinate Mapping |
| --- | --- | --- | --- |
| Vertical Translation | \(y = f(x) + a\) | Shift up by \(a\) units (if \(a>0\)) | \((x, y) \to (x, y + a)\) |
| Horizontal Translation | \(y = f(x + a)\) | Shift left by \(a\) units (if \(a>0\)) | \((x, y) \to (x - a, y)\) |
| Vertical Stretch | \(y = a \cdot f(x)\) | Vertical stretch scale factor \(a\) | \((x, y) \to (x, a \cdot y)\) |
| Horizontal Stretch | \(y = f(a \cdot x)\) | Horizontal stretch scale factor \(\frac{1}{a}\) | \((x, y) \to \left(\frac{x}{a}, y\right)\) |

---

### 2. Anatomy of Graph Translations & Stretches

```
                   y = f(x) + a  (Vertical Shift UP)
                        ^
                        |
      y = f(x + a) <--- y = f(x) ---> y = f(x - a)
   (Shift LEFT by a)    |          (Shift RIGHT by a)
                        v
                   y = f(x) - a  (Vertical Shift DOWN)
```

* **Horizontal Counter-Intuition:** Adding \(a\) inside bracket \(f(x + a)\) shifts graph in negative \(x\)-direction (left).
* **Vertical Directness:** Operations outside bracket affect vertical \(y\)-coordinates directly as expected.

$$y = f(x + a) + b \implies \text{Translation Vector } \begin{pmatrix} -a \\ b \end{pmatrix}$$

---

### 3. Worked Example

> **Question:**
> The curve \(y = f(x)\) has a turning point at \(P(3, -4)\).
> 1. Find the coordinates of the turning point for the transformed graph \(y = f(x - 2) + 5\).
> 2. Describe fully the single transformation that maps \(y = f(x)\) onto \(y = 3f(x)\).

**Step 1: Determine transformed coordinates for y = f(x - 2) + 5**

1. Identify horizontal shift: \(f(x - 2)\) translates graph right by \(+2\) units (\(x \to x + 2\)):

$$x_{\text{new}} = 3 + 2 = 5$$

2. Identify vertical shift: \(+ 5\) translates graph up by \(+5\) units (\(y \to y + 5\)):

$$y_{\text{new}} = -4 + 5 = 1$$

3. Combine into new turning point coordinates:

$$P' = (5, 1)$$

**Step 2: Describe single transformation y = 3f(x)**

1. Identify operation type: Multiplier 3 is outside bracket operating directly on function output.
2. State transformation type, direction, and scale factor:

$$\text{Vertical stretch with scale factor } 3 \text{ parallel to the } y\text{-axis (invariant } x\text{-axis)}$$

3. **Key result 1:** Transformed turning point coordinates are \((5, 1)\).
4. **Key result 2:** Transformation is a vertical stretch, scale factor 3, parallel to the \(y\)-axis.

---

### 4. Common Examiner Traps

* **Horizontal Shift Direction Error:** Shifting right for \(f(x + a)\) instead of left.
* **Incomplete Stretch Descriptions:** Omitting the scale factor or invariant axis direction when describing graph stretches.
