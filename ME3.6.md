# Topic: ME3.6 Line & Curve Intersection

The geometric intersections between a straight line and a non-linear curve represent simultaneous algebraic solutions, determined by substituting the linear expression into the curve equation and evaluating the quadratic discriminant.

---

### 1. Line-Curve Discriminant Breakdown

| Discriminant Value | Geometric Relationship | Number of Intersection Points |
| --- | --- | --- |
| $b^2 - 4ac > 0$ | Line is a Secant (cuts through curve) | 2 distinct real intersection points |
| $b^2 - 4ac = 0$ | Line is a Tangent (grazes curve) | 1 repeated real intersection point |
| $b^2 - 4ac < 0$ | Line does not touch or cross curve | 0 real intersection points |

---

### 2. Geometry & ASCII Diagram

```
         y ^                 / Secant (b^2 - 4ac > 0)
           |        .---*---|---.
           |       /     \  /    \
           |      |  *----+-------* Tangent (b^2 - 4ac = 0)
           |       \  \  / \     /
           |        '--\----+---'
  ---------+------------\---+---------> x
           |             \ No Intersection (b^2 - 4ac < 0)
```

* **Substitution Technique:** Rearrange linear equation into $y = mx + c$ or $x = g(y)$ and substitute into quadratic equation.
* **Quadratic Solution:** Solve $ax^2 + bx + c = 0$ using factorisation, completing the square, or quadratic formula.
* **Coordinate Pair Requirement:** Always substitute $x$-values back into the linear equation to solve for corresponding $y$-coordinates.

$$\Delta = b^2 - 4ac$$

---

### 3. Worked Example

> **Question:**
> 1. Find the coordinates of the points of intersection between the line $y = 2x + 1$ and the curve $y = x^2 - x - 3$.
> 2. Show algebraically that the line $y = 2x - 5$ is a tangent to the curve $y = x^2 - 2x - 1$.

**Step 1: Solve Simultaneous Equations for Intersection Points**

1. Equate $y$-expressions:

$$2x + 1 = x^2 - x - 3$$

2. Rearrange into standard quadratic form $ax^2 + bx + c = 0$:

$$x^2 - 3x - 4 = 0$$

3. Factorise and solve for $x$:

$$(x - 4)(x + 1) = 0 \implies x_1 = 4, \quad x_2 = -1$$

4. Substitute $x$-values into linear equation $y = 2x + 1$:

$$\text{For } x_1 = 4: \quad y_1 = 2(4) + 1 = 9 \implies (4, 9)$$

$$\text{For } x_2 = -1: \quad y_2 = 2(-1) + 1 = -1 \implies (-1, -1)$$

**Step 2: Prove Tangency using Discriminant**

1. Equate $y = 2x - 5$ and $y = x^2 - 2x - 1$:

$$2x - 5 = x^2 - 2x - 1 \implies x^2 - 4x + 4 = 0$$

2. Calculate discriminant $b^2 - 4ac$ with $a=1, b=-4, c=4$:

$$b^2 - 4ac = (-4)^2 - 4(1)(4) = 16 - 16 = 0$$

Since $b^2 - 4ac = 0$, the line touches the curve at exactly one point, proving it is a tangent.

3. **Intersection Coordinates:** $(4, 9)$ and $(-1, -1)$
4. **Tangency Proof:** Discriminant $\Delta = 0$, confirming a single point of contact $(2, -1)$.

---

### 4. Common Examiner Traps

* **Incomplete Coordinates:** Stopping after finding $x$-values ($x = 4, -1$) without calculating corresponding $y$-values.
* **Substituting into Wrong Equation:** Substituting $x$-values back into quadratic formula incorrectly instead of using simple linear equation.
* **Algebraic Sign Errors when Equating:** Making errors when shifting terms across equals sign, e.g., $x^2 - x - 2x$ becoming $x^2 + x$.
