# Topic: ME3.7 Geometric Proofs in Coordinate Geometry

Coordinate geometry proofs rigorously establish geometric properties—such as collinearity, side equality, and right-angled orthogonality—by evaluating algebraic conditions for gradient, distance, and midpoint.

---

### 1. Shape & Geometric Proof Breakdown

| Target Shape / Property | Necessary & Sufficient Algebraic Proof Conditions |
| --- | --- |
| Parallelogram | Both pairs of opposite sides have equal gradients ($m_{AB} = m_{CD}$ AND $m_{BC} = m_{AD}$) OR midpoints of diagonals coincide ($M_{AC} = M_{BD}$). |
| Rhombus | Parallelogram properties AND all four side lengths are equal ($d_{AB} = d_{BC} = d_{CD} = d_{DA}$) AND diagonals intersect perpendicularly ($m_{AC} \cdot m_{BD} = -1$). |
| Rectangle | Parallelogram properties AND adjacent sides are perpendicular ($m_{AB} \cdot m_{BC} = -1$) OR diagonals have equal length ($d_{AC} = d_{BD}$). |
| Right-Angled Triangle | Gradients of two sides satisfy $m_1 \cdot m_2 = -1$ OR side lengths satisfy $a^2 + b^2 = c^2$. |

---

### 2. Geometry & ASCII Diagram

```
         y ^              C (x3, y3)
           |             / \
           |            /   \
           |   B(x2,y2)/     \ D (x4, y4)
           |          /       /
           |         /       /
           |  A(x1,y1)------'
  ---------+----------------------------> x
           |
```

* **Gradient Verification:** Gradient comparisons prove parallelism ($m_1 = m_2$) and perpendicularity ($m_1 \cdot m_2 = -1$).
* **Distance Verification:** Distance formula calculations prove side length equality or hypotenuse relationships.
* **Midpoint Verification:** Coinciding diagonal midpoints ($M_{AC} = M_{BD}$) prove diagonal bisecting behavior.

$$M_{AC} = M_{BD} \quad \text{and} \quad m_{AC} \cdot m_{BD} = -1$$

---

### 3. Worked Example

> **Question:**
> Vertices of quadrilateral $ABCD$ are $A(-1, 1)$, $B(2, 5)$, $C(7, 5)$, and $D(4, 1)$.
> 1. Show that $ABCD$ is a parallelogram.
> 2. Determine whether $ABCD$ is a rhombus by checking adjacent side lengths.

**Step 1: Prove $ABCD$ is a Parallelogram**

1. Calculate gradients of opposite sides $AB$ and $CD$:

$$m_{AB} = \frac{5 - 1}{2 - (-1)} = \frac{4}{3}, \quad m_{CD} = \frac{1 - 5}{4 - 7} = \frac{-4}{-3} = \frac{4}{3}$$

Since $m_{AB} = m_{CD} = \frac{4}{3}$, side $AB$ is parallel to side $CD$.

2. Calculate gradients of opposite sides $BC$ and $AD$:

$$m_{BC} = \frac{5 - 5}{7 - 2} = \frac{0}{5} = 0, \quad m_{AD} = \frac{1 - 1}{4 - (-1)} = \frac{0}{5} = 0$$

Since $m_{BC} = m_{AD} = 0$, side $BC$ is parallel to side $AD$. Therefore, $ABCD$ is a parallelogram.

**Step 2: Check Adjacent Side Lengths for Rhombus Property**

1. Calculate length of side $AB$:

$$d_{AB} = \sqrt{(2 - (-1))^2 + (5 - 1)^2} = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

2. Calculate length of adjacent side $BC$:

$$d_{BC} = \sqrt{(7 - 2)^2 + (5 - 5)^2} = \sqrt{5^2 + 0^2} = \sqrt{25} = 5$$

3. Compare side lengths: Since $d_{AB} = d_{BC} = 5$, adjacent sides are equal. Coupled with parallelogram properties, $ABCD$ is a rhombus.

4. **Parallelogram Proof:** $m_{AB} = m_{CD} = \frac{4}{3}$ and $m_{BC} = m_{AD} = 0$.
5. **Rhombus Proof:** $d_{AB} = d_{BC} = 5$, confirming all sides are equal.

---

### 4. Common Examiner Traps

* **Incomplete Proofs:** Proving only one pair of parallel sides (which only proves a trapezium) instead of both pairs.
* **Assuming Properties Without Calculation:** Stating that a angle is $90^\circ$ by visual inspection rather than calculating $m_1 \cdot m_2 = -1$.
* **Confusing Rhombus and Square:** Failing to check whether adjacent angles are $90^\circ$ when proving a shape is a square versus a rhombus.
