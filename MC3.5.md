# Topic: MC3.5 Parallel Lines

Parallel lines are straight lines on a Cartesian plane that maintain a constant distance apart and never cross, possessing identical gradients ($m_1 = m_2$).

---

### 1. Parallel Lines Condition Breakdown

| Property | Condition / Expression | Geometric Implication |
| --- | --- | --- |
| Gradient Equality | $m_1 = m_2$ | Both lines have the exact same steepness and direction. |
| Intercept Distinction | $c_1 \neq c_2$ | Lines cross the $y$-axis at different points (if $c_1 = c_2$, lines are identical). |
| Number of Intersections | $0$ | System of linear equations has no solution. |

---

### 2. Geometry & ASCII Diagram

```
         y ^
           |        / L1: y = m1*x + c1
           |       /
           |      /    / L2: y = m2*x + c2  (m1 = m2)
           | (0,c1)*  /
           |   |     /
           | (0,c2)*
  ---------+--------+----------------> x
           |       /
```

* **Gradient Match:** If $L_1$ has equation $y = mx + c_1$, any parallel line $L_2$ has equation $y = mx + c_2$.
* **Rearrangement Requirement:** Convert general equations $ax + by = c$ into $y = mx + c$ before reading gradients.
* **Vector Translation:** Parallel lines can be formed by shifting every point on $L_1$ by a constant column vector $\begin{pmatrix} a \\ b \end{pmatrix}$.

$$m_1 = m_2$$

---

### 3. Worked Example

> **Question:**
> 1. Determine whether the lines $L_1: 2y - 6x = 5$ and $L_2: y = 3x - 4$ are parallel.
> 2. Find the equation of the line $L_3$ passing through $P(4, 1)$ that is parallel to $L_2$. Give your answer in the form $y = mx + c$.

**Step 1: Compare Gradients of $L_1$ and $L_2$**

1. Rearrange $L_1$ into $y = mx + c$ form:

$$2y - 6x = 5 \implies 2y = 6x + 5 \implies y = 3x + 2.5$$

2. Identify gradients $m_1$ and $m_2$:

$$m_1 = 3, \quad m_2 = 3$$

Since $m_1 = m_2 = 3$ and $c_1 = 2.5 \neq c_2 = -4$, $L_1$ and $L_2$ are parallel.

**Step 2: Find Equation of Parallel Line $L_3$**

1. Use gradient $m_3 = 3$ and point $P(4, 1)$ in $y = mx + c$:

$$1 = (3)(4) + c_3$$

2. Solve for intercept $c_3$:

$$1 = 12 + c_3 \implies c_3 = 1 - 12 = -11$$

3. **Parallel Check:** Lines $L_1$ and $L_2$ are parallel ($m_1 = m_2 = 3$).
4. **Line $L_3$ Equation:** $y = 3x - 11$

---

### 4. Common Examiner Traps

* **Comparing Raw Coefficients:** Assuming $2y - 6x = 5$ has gradient $-6$ without first rearranging into $y = mx + c$ form ($y = 3x + 2.5$).
* **Changing the Gradient:** Incorrectly altering the gradient when finding a parallel line instead of keeping $m$ unchanged.
* **Confusing Parallel and Perpendicular:** Applying $m_2 = -\frac{1}{m_1}$ instead of $m_2 = m_1$.
