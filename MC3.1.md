# Topic: MC3.1 Coordinates & Midpoints

A Cartesian coordinate pair $(x, y)$ defines a unique position on a 2D plane relative to orthogonal axes, where the midpoint $M$ of line segment $AB$ connecting $A(x_1, y_1)$ and $B(x_2, y_2)$ represents the mean of their horizontal and vertical positions.

---

### 1. Midpoint & Coordinate Breakdown

| Concept | Mathematical Formula / Form | Key Rule |
| --- | --- | --- |
| Cartesian Point | $(x, y)$ | $x$ is horizontal displacement from origin; $y$ is vertical displacement. |
| Midpoint Formula | $M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$ | Add coordinates and divide by 2 (take the average). |
| Missing Endpoint | $x_2 = 2x_M - x_1, \quad y_2 = 2y_M - y_1$ | Rearrange midpoint formula when midpoint and one endpoint are known. |

---

### 2. Geometry & ASCII Diagram

```
         y ^
           |              B (x2, y2)
           |             /
           |            / 
           |      M (xM, yM)
           |      /
           |     /
           |    A (x1, y1)
  ---------+---------------------> x
           |
```

* **Horizontal Alignment:** The $x$-coordinate of the midpoint lies exactly halfway between $x_1$ and $x_2$.
* **Vertical Alignment:** The $y$-coordinate of the midpoint lies exactly halfway between $y_1$ and $y_2$.
* **Negative Coordinates:** Adding a negative coordinate requires careful handling of signs: $x_1 + (-x_2) = x_1 - x_2$.

$$M = \left( \frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2} \right)$$

---

### 3. Worked Example

> **Question:**
> 1. Find the midpoint $M$ of the line segment joining $A(-4, 7)$ and $B(8, -3)$.
> 2. The point $M(3, 5)$ is the midpoint of segment $CD$. Given $C(-1, 2)$, calculate the coordinates of point $D$.

**Step 1: Calculate Midpoint of $AB$**

1. Apply the midpoint formula to points $A(-4, 7)$ and $B(8, -3)$:

$$x_M = \frac{-4 + 8}{2} = \frac{4}{2} = 2$$

2. Calculate the $y$-coordinate of the midpoint:

$$y_M = \frac{7 + (-3)}{2} = \frac{4}{2} = 2$$

**Step 2: Calculate Missing Endpoint $D$**

1. Set up equations using midpoint $M(3, 5)$ and point $C(-1, 2)$:

$$3 = \frac{-1 + x_D}{2} \implies 6 = -1 + x_D \implies x_D = 7$$

2. Solve for $y_D$:

$$5 = \frac{2 + y_D}{2} \implies 10 = 2 + y_D \implies y_D = 8$$

3. **Midpoint $M$:** $(2, 2)$
4. **Endpoint $D$:** $(7, 8)$

---

### 4. Common Examiner Traps

* **Subtracting Coordinates:** Candidates often confuse the midpoint formula with the gradient formula and subtract coordinates instead of adding them (e.g. calculating $\frac{x_2 - x_1}{2}$).
* **Sign Errors with Negatives:** Incorrectly handling negative numbers, such as calculating $-4 + 8$ as $-12$ or $-4$.
* **Reversing Point Roles:** Mixing up the midpoint coordinates with endpoint coordinates when solving for a missing endpoint.
