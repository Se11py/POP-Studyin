# Topic: ME3.2 Distance in 2D & 3D Space

The linear distance $d$ between two points in three-dimensional Cartesian space $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$ extends 2D Euclidean distance by incorporating the depth component into 3D Pythagoras' Theorem.

---

### 1. 2D vs 3D Distance Breakdown

| Dimension | Distance Formula | Key Application |
| --- | --- | --- |
| 2D Space | $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ | Length of line on a 2D plane. |
| 3D Space | $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$ | Straight-line distance between two points in 3D space. |
| Cuboid Space Diagonal | $d = \sqrt{L^2 + W^2 + H^2}$ | Longest interior line segment inside a cuboid. |

---

### 2. Geometry & ASCII Diagram

```
            +-------------------+ B (x2, y2, z2)
           /|                  /|
          / |                 / |
         +--+----------------+  |
         |  |   . d          |  |  H = z2 - z1
         |  +---|------------+--+
         | /   .             | /   W = y2 - y1
         |/   . base diag    |/
  A(x1,y1,z1)----------------+
               L = x2 - x1
```

* **Double Pythagoras:** 3D distance applies Pythagoras twice: first on base $L^2 + W^2 = d_{\text{base}}^2$, then vertically $d^2 = d_{\text{base}}^2 + H^2$.
* **Non-Negativity:** All coordinate difference terms $(x_2 - x_1)^2$, $(y_2 - y_1)^2$, $(z_2 - z_1)^2$ are non-negative.
* **Exact Surd Form:** Keep answer as $\sqrt{N}$ unless decimal rounding is explicitly specified.

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

---

### 3. Worked Example

> **Question:**
> Points $A(1, -2, 5)$ and $B(4, 4, -1)$ represent opposite corners of a cuboid in 3D space.
> 1. Calculate the exact length of the space diagonal $AB$.
> 2. Give your answer to 3 significant figures.

**Step 1: Compute Component Differences**

1. Calculate horizontal, depth, and vertical differences:

$$\Delta x = 4 - 1 = 3, \quad \Delta y = 4 - (-2) = 6, \quad \Delta z = -1 - 5 = -6$$

2. Square each component difference:

$$(\Delta x)^2 = 3^2 = 9, \quad (\Delta y)^2 = 6^2 = 36, \quad (\Delta z)^2 = (-6)^2 = 36$$

**Step 2: Apply 3D Distance Formula**

1. Sum the squared differences:

$$d^2 = 9 + 36 + 36 = 81$$

2. Take square root to evaluate $d$:

$$d = \sqrt{81} = 9$$

3. **Exact Length:** $9\text{ units}$
4. **Length to 3 s.f.:** $9.00\text{ units}$

---

### 4. Common Examiner Traps

* **Forgetting 3D Component:** Using only 2D formula $\sqrt{(\Delta x)^2 + (\Delta y)^2}$ and ignoring $\Delta z$.
* **Calculator Parentheses Errors:** Entering $-6^2 = -36$ instead of $(-6)^2 = 36$.
* **Incomplete Simplification:** Leaving $\sqrt{81}$ without evaluating to integer $9$.
