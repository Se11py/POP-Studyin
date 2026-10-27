# Topic: ME4.8 Vector Geometry & Geometric Proofs

Vector geometry represents direction and magnitude via column vectors $\mathbf{v} = \begin{pmatrix} x \\ y \end{pmatrix}$ and position vectors $\mathbf{a}, \mathbf{b}$, enabling rigorous proofs of line parallelism ($\mathbf{u} = k\mathbf{v}$) and collinearity.

---

### 1. Vector Operations & Proof Breakdown

| Operation / Property | Mathematical Expression | Geometric Meaning / Condition |
| --- | --- | --- |
| Column Vector Magnitude | $|\mathbf{v}| = \left|\begin{pmatrix} x \\ y \end{pmatrix}\right| = \sqrt{x^2 + y^2}$ | Scalar length of vector $\mathbf{v}$. |
| Vector Addition / Route | $\vec{AC} = \vec{AB} + \vec{BC} = \mathbf{a} + \mathbf{b}$ | Vector sum along connected path. |
| Reverse Vector Direction | $\vec{BA} = -\vec{AB} = -\mathbf{a}$ | Opposite direction negates all vector components. |
| Parallel Vectors Condition | $\mathbf{u} = k \mathbf{v} \quad (k \neq 0)$ | Vectors $\mathbf{u}$ and $\mathbf{v}$ are scalar multiples (parallel). |
| Collinear Points Condition | $\vec{AB} = k \vec{BC}$ AND share common point $B$ | Points $A, B, C$ lie on a single straight line. |

---

### 2. Geometry & ASCII Diagram

```
         O (Origin)
        / \
    a  /   \  b
      /  p  \
     A-------B  Path AB = -a + b = b - a
       (P is midpoint: AP = 0.5*(b - a))
```

* **Position Vectors:** Position vector $\vec{OA} = \mathbf{a}$ defines location of $A$ relative to origin $O$.
* **Displacement Route:** To travel from point $A$ to point $B$, use path $\vec{AB} = \vec{AO} + \vec{OB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}$.
* **Collinearity Criteria:** Proving $\vec{AB} = k \vec{BC}$ is insufficient on its own; you MUST state that $B$ is a common point to conclude $A, B, C$ are collinear.

$$\vec{AB} = \mathbf{b} - \mathbf{a} \quad \text{and} \quad \mathbf{u} = k\mathbf{v} \implies \mathbf{u} \parallel \mathbf{v}$$

---

### 3. Worked Example

> **Question:**
> In triangle $OAB$, $\vec{OA} = \mathbf{a}$ and $\vec{OB} = \mathbf{b}$. Point $M$ is the midpoint of $AB$, and point $N$ lies on $OB$ such that $ON : NB = 2 : 1$.
> 1. Express $\vec{AB}$ and position vector $\vec{OM}$ in terms of $\mathbf{a}$ and $\mathbf{b}$.
> 2. Express $\vec{MN}$ in terms of $\mathbf{a}$ and $\mathbf{b}$, and simplify fully.

**Step 1: Express Vectors $\vec{AB}$ and Midpoint Vector $\vec{OM}$**

1. Find vector $\vec{AB}$ using route $\vec{AO} + \vec{OB}$:

$$\vec{AB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}$$

2. Find position vector of midpoint $M$ ($\vec{OM} = \vec{OA} + \vec{AM}$):

$$\vec{AM} = \frac{1}{2} \vec{AB} = \frac{1}{2}(\mathbf{b} - \mathbf{a})$$

$$\vec{OM} = \mathbf{a} + \frac{1}{2}(\mathbf{b} - \mathbf{a}) = \frac{1}{2}\mathbf{a} + \frac{1}{2}\mathbf{b} = \frac{1}{2}(\mathbf{a} + \mathbf{b})$$

**Step 2: Express Vector $\vec{MN}$**

1. Identify position vector $\vec{ON}$ using ratio $ON : NB = 2 : 1$:

$$\vec{ON} = \frac{2}{3} \mathbf{b}$$

2. Find route $\vec{MN} = \vec{MO} + \vec{ON} = -\vec{OM} + \vec{ON}$:

$$\vec{MN} = -\left(\frac{1}{2}\mathbf{a} + \frac{1}{2}\mathbf{b}\right) + \frac{2}{3}\mathbf{b}$$

3. Simplify vector terms:

$$\vec{MN} = -\frac{1}{2}\mathbf{a} + \left(\frac{2}{3} - \frac{1}{2}\right)\mathbf{b} = -\frac{1}{2}\mathbf{a} + \frac{1}{6}\mathbf{b} = \frac{1}{6}(\mathbf{b} - 3\mathbf{a})$$

4. **Vector $\vec{AB}$:** $\mathbf{b} - \mathbf{a}$
5. **Vector $\vec{OM}$:** $\frac{1}{2}(\mathbf{a} + \mathbf{b})$
6. **Vector $\vec{MN}$:** $\frac{1}{6}(\mathbf{b} - 3\mathbf{a})$ (or $-\frac{1}{2}\mathbf{a} + \frac{1}{6}\mathbf{b}$)

---

### 4. Common Examiner Traps

* **Direction Sign Reversal:** Writing $\vec{AB} = \mathbf{a} + \mathbf{b}$ instead of $\mathbf{b} - \mathbf{a}$ (forgetting that $\vec{AO} = -\mathbf{a}$).
* **Ratio Fraction Errors:** Converting ratio $2 : 1$ to fraction $\frac{2}{1}$ instead of $\frac{2}{2+1} = \frac{2}{3}$ of the total line length.
* **Incomplete Collinear Proofs:** Proving $\vec{AB} = k \vec{BC}$ without explicitly writing "Since $B$ is a common point, $A, B$, and $C$ are collinear."
