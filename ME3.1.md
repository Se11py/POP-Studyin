# Topic: ME3.1 Midpoint & 3D Coordinates

In three-dimensional space $(x,y,z)$, the midpoint $M$ of line segment $AB$ connecting points $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$ represents the mean of their horizontal, vertical, and depth components.

---

### 1. 3D Coordinate System & Midpoint Breakdown

| Feature | Mathematical Form | Description |
| --- | --- | --- |
| 3D Point Location | $(x, y, z)$ | $x$: width, $y$: depth/length, $z$: height relative to origin $(0,0,0)$. |
| 3D Midpoint Formula | $M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}, \frac{z_1 + z_2}{2}\right)$ | Average of $x$, $y$, and $z$ coordinates. |
| Missing 3D Endpoint | $x_2 = 2x_M - x_1, \, y_2 = 2y_M - y_1, \, z_2 = 2z_M - z_1$ | Extrapolate endpoint from midpoint and known point. |

---

### 2. Geometry & ASCII Diagram

```
         z ^
           |       . B (x2, y2, z2)
           |      /
           |     M (xM, yM, zM)
           |    /
           |   . A (x1, y1, z1)
           +--------------------> y
          /
         /
      x L
```

* **Orthogonal Axes:** The three axes $x, y, z$ are mutually perpendicular at origin $O(0,0,0)$.
* **Independent Components:** Each component of the midpoint is calculated independently along its respective axis.
* **Cuboid Diagonal:** The midpoint of a main body diagonal of a cuboid is the midpoint of its opposing corner vertices.

$$M = \left( \frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}, \frac{z_1 + z_2}{2} \right)$$

---

### 3. Worked Example

> **Question:**
> 1. Find the midpoint $M$ of the line segment connecting $A(-3, 4, 8)$ and $B(7, -2, 4)$.
> 2. The midpoint of segment $CD$ is $M(1, 3, -2)$. Given $C(5, -1, 4)$, find the coordinates of point $D$.

**Step 1: Calculate Midpoint of 3D Segment $AB$**

1. Apply 3D midpoint formula to $A(-3, 4, 8)$ and $B(7, -2, 4)$:

$$x_M = \frac{-3 + 7}{2} = \frac{4}{2} = 2, \quad y_M = \frac{4 + (-2)}{2} = \frac{2}{2} = 1, \quad z_M = \frac{8 + 4}{2} = \frac{12}{2} = 6$$

2. Express midpoint as coordinate triple:

$$M = (2, 1, 6)$$

**Step 2: Calculate Missing 3D Endpoint $D$**

1. Set up equations for each axis using $M(1, 3, -2)$ and $C(5, -1, 4)$:

$$x_D = 2(1) - 5 = 2 - 5 = -3$$

2. Compute $y_D$ and $z_D$:

$$y_D = 2(3) - (-1) = 6 + 1 = 7, \quad z_D = 2(-2) - 4 = -4 - 4 = -8$$

3. **Midpoint $M$:** $(2, 1, 6)$
4. **Endpoint $D$:** $(-3, 7, -8)$

---

### 4. Common Examiner Traps

* **Dropping the $z$-Coordinate:** Treating 3D problems as 2D and omitting the third coordinate.
* **Negative Sign Blunders:** Errors such as $2(-2) - 4 = 0$ instead of $-8$.
* **Ordering Axes Incorrectly:** Swapping $y$ and $z$ coordinates when recording final answer.
