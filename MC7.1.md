# Topic: MC7.1 Transformations & Column Vectors

A geometric transformation maps an original object onto an image in a coordinate plane, where a translation shifts every point by a column vector $\mathbf{v} = \begin{pmatrix} x \\ y \end{pmatrix}$ representing horizontal displacement $x$ and vertical displacement $y$.

---

### 1. Transformation Types & Describing Rules

| Transformation | Mandatory Description Parameters | Matrix / Vector Notation | Key Properties |
| --- | --- | --- | --- |
| **Translation** | Vector $\begin{pmatrix} x \\ y \end{pmatrix}$ | $\mathbf{p}' = \mathbf{p} + \begin{pmatrix} x \\ y \end{pmatrix}$ | Congruent image, same orientation |
| **Reflection** | Line of reflection equation (e.g., $y = x$, $x = 2$) | Mirror line axis | Congruent image, reversed orientation |
| **Rotation** | Center of rotation $(x_0, y_0)$, angle, direction (cw/ccw) | Turn around point | Congruent image, rotated orientation |
| **Enlargement** | Center of enlargement $(x_0, y_0)$, scale factor $k$ | Vector scale $k \mathbf{v}$ | Similar image, lengths multiplied by $k$ |

---

### 2. Column Vectors & Coordinate Geometry

```
        y ^
          |      Object A       Image A' (Translated)
        4 |      +---+          +---+
        3 |      |   |  ====>   |   |   Vector v = ( 3 )
        2 |      +---+          +---+              ( -2 )
        1 |
   -------+--------------------------> x
       -1 | 0  1  2  3  4  5  6  7  8
       -2 |
```

* **Horizontal Component ($x$):** Positive value shifts right, negative value shifts left.
* **Vertical Component ($y$):** Positive value shifts up, negative value shifts down.
* **Vector Addition for Translation:** $\begin{pmatrix} x_1 \\ y_1 \end{pmatrix} + \begin{pmatrix} x_2 \\ y_2 \end{pmatrix} = \begin{pmatrix} x_1 + x_2 \\ y_1 + y_2 \end{pmatrix}$.

$$\mathbf{p}' = \begin{pmatrix} x_{orig} \\ y_{orig} \end{pmatrix} + \begin{pmatrix} x \\ y \end{pmatrix}$$

---

### 3. Worked Example

> **Question:**
> Triangle $P$ has vertices at $A(1, 2)$, $B(3, 2)$, and $C(1, 5)$.
> 1. Find the coordinates of the image $P'$ after translating triangle $P$ by vector $\mathbf{v} = \begin{pmatrix} 4 \\ -3 \end{pmatrix}$.
> 2. Describe fully the single transformation that maps triangle $P$ onto triangle $Q$ with vertices $A'(2, 4)$, $B'(6, 4)$, and $C'(2, 10)$.

**Step 1: Apply translation vector to each vertex**

1. Add column vector components to vertex coordinates:

$$\begin{pmatrix} x' \\ y' \end{pmatrix} = \begin{pmatrix} x \\ y \end{pmatrix} + \begin{pmatrix} 4 \\ -3 \end{pmatrix}$$

2. Compute image vertices:

$$A' = \begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} 4 \\ -3 \end{pmatrix} = \begin{pmatrix} 5 \\ -1 \end{pmatrix}$$

$$B' = \begin{pmatrix} 3 \\ 2 \end{pmatrix} + \begin{pmatrix} 4 \\ -3 \end{pmatrix} = \begin{pmatrix} 7 \\ -1 \end{pmatrix}$$

$$C' = \begin{pmatrix} 1 \\ 5 \end{pmatrix} + \begin{pmatrix} 4 \\ -3 \end{pmatrix} = \begin{pmatrix} 5 \\ 2 \end{pmatrix}$$

**Step 2: Identify scale factor and center for mapping P to Q**

1. Compare side lengths of original $P$ ($AB = 2$, $AC = 3$) to image $Q$ ($A'B' = 4$, $A'C' = 6$):

$$k = \frac{\text{Image length}}{\text{Original length}} = \frac{4}{2} = 2$$

2. Determine center of enlargement $(x_0, y_0)$ by ray tracing or solving $(x' - x_0) = k(x - x_0)$:

$$\begin{pmatrix} 2 - x_0 \\ 4 - y_0 \end{pmatrix} = 2 \begin{pmatrix} 1 - x_0 \\ 2 - y_0 \end{pmatrix} \implies x_0 = 0, y_0 = 0$$

3. **Key result 1:** Translated vertices are $A'(5, -1)$, $B'(7, -1)$, and $C'(5, 2)$.
4. **Key result 2:** Transformation mapping $P$ to $Q$ is an **Enlargement**, scale factor $2$, center of enlargement $(0, 0)$.

---

### 4. Common Examiner Traps

* **Incomplete Transformation Descriptions:** Omitting mandatory details (e.g., giving scale factor without center of enlargement, or rotation angle without center/direction) loses full marks.
* **Vector Sign Errors:** Writing vector components upside down (confusing $x$ and $y$) or confusing movement directions (e.g., negative $y$ as upward).
* **Fractional Scale Factor Confusion:** Scaled down images are enlargements with scale factors $0 < k < 1$; do not call them "reductions".

---
