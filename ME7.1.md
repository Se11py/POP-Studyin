# Topic: ME7.1 Transformations

Advanced geometric transformations extend standard transformations to include reflection across diagonal mirror lines $y = \pm x$ and enlargements with negative scale factors $k < 0$ where image points lie on the opposite side of the center of enlargement.

---

### 1. Advanced Transformation Classification

| Transformation | Center / Line | Scale Factor / Angle | Effect on Object |
| --- | --- | --- | --- |
| **Negative Enlargement** | Center $(x_0, y_0)$ | $k < 0$ ($k \in \mathbb{R}$) | Image inverted, multiplied length $|k|$, opposite side of center |
| **Fractional Enlargement** | Center $(x_0, y_0)$ | $0 < |k| < 1$ | Image size reduced by factor $|k|$ |
| **Diagonal Reflection** | Line $y = x$ or $y = -x$ | Mirror line | $(x, y) \to (y, x)$ for $y=x$; $(x, y) \to (-y, -x)$ for $y=-x$ |
| **Rotational Invariance** | Center $(x_0, y_0)$ | $180^\circ$ | Equivalent to negative enlargement with $k = -1$ |

---

### 2. Anatomy of Negative Enlargement ($k < 0$)

```
    Image A'
    (-3, 4) +-------+
            |  A'   |
            +-------+
                \
                 \  Ray through center
                  \
                   O (0, 1) Center of Enlargement
                    \
                     \
                      +---+
                      | A | Object A (1.5, -0.5), k = -2
                      +---+
```

* **Opposite Rays:** Rays connecting object vertices to image vertices pass directly through the center of enlargement $(x_0, y_0)$.
* **Inverted Orientation:** Negative scale factor $k < 0$ flips the orientation of the shape by $180^\circ$.
* **Vector Relation:** $\overrightarrow{O A'} = k \cdot \overrightarrow{O A}$.

$$\overrightarrow{O A'} = k \begin{pmatrix} x_A - x_0 \\ y_A - y_0 \end{pmatrix}$$

---

### 3. Worked Example

> **Question:**
> Object $T$ has vertices $A(2, 3)$, $B(4, 3)$, and $C(2, 6)$.
> 1. Find the coordinates of image $T'$ after an enlargement center $(1, 2)$ with scale factor $k = -2$.
> 2. Describe fully the single transformation that maps point $A(2, 3)$ onto point $A''(-3, -2)$.

**Step 1: Calculate relative vectors from center and multiply by $k = -2$**

1. Vector from center $C(1, 2)$ to vertex $A(2, 3)$:

$$\overrightarrow{CA} = \begin{pmatrix} 2 - 1 \\ 3 - 2 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$$

2. Multiply vector by $k = -2$ to find vector $\overrightarrow{CA'}$:

$$\overrightarrow{CA'} = -2 \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} -2 \\ -2 \end{pmatrix}$$

3. Add displacement vector to center position $(1, 2)$:

$$A' = \begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} -2 \\ -2 \end{pmatrix} = \begin{pmatrix} -1 \\ 0 \end{pmatrix}$$

4. Repeat for vertices $B(4, 3)$ and $C(2, 6)$:

$$\overrightarrow{CB'} = -2 \begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} -6 \\ -2 \end{pmatrix} \implies B' = (1-6, 2-2) = (-5, 0)$$

$$\overrightarrow{CC'} = -2 \begin{pmatrix} 1 \\ 4 \end{pmatrix} = \begin{pmatrix} -2 \\ -8 \end{pmatrix} \implies C' = (1-2, 2-8) = (-1, -6)$$

**Step 2: Determine line of reflection mapping $(2, 3)$ to $(-3, -2)$**

1. Swap coordinates and invert signs:

$$(x, y) = (2, 3) \longrightarrow (-y, -x) = (-3, -2)$$

2. Check line equation matching swap rule $(x, y) \to (-y, -x)$:

$$y = -x$$

3. **Key result 1:** Enlarged vertices are $A'(-1, 0)$, $B'(-5, 0)$, and $C'(-1, -6)$.
4. **Key result 2:** Reflection in the line $y = -x$.

---

### 4. Common Examiner Traps

* **Negative Sign Ray Tracing Errors:** Drawing rays on the same side of the center instead of extending rays through to the opposite side for $k < 0$.
* **Confusing Reflection Lines $y = x$ and $y = -x$:** $y = x$ swaps coordinates $(x, y) \to (y, x)$; $y = -x$ swaps and negates $(x, y) \to (-y, -x)$.
* **Area vs Linear Scale Factor:** Linear scale factor is $k$, but the area is multiplied by $k^2$ (always positive!).

---
