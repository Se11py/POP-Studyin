# Topic: ME7.3 Position & Geometry Vectors

A position vector $\overrightarrow{OA} = \mathbf{a}$ specifies the location of a point $A$ relative to fixed origin $O$, allowing any displacement vector between two points $A$ and $B$ to be expressed as $\overrightarrow{AB} = \overrightarrow{OB} - \overrightarrow{OA} = \mathbf{b} - \mathbf{a}$.

---

### 1. Position Vector Rules & Ratio Splits

| Relationship | Vector Formula | Description | Key Concept |
| --- | --- | --- | --- |
| **Displacement Vector** | $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$ | Vector from point $A$ to point $B$ | "End minus Start" rule |
| **Midpoint $M$ of $AB$** | $\overrightarrow{OM} = \frac{1}{2}(\mathbf{a} + \mathbf{b})$ | Position vector of midpoint | Average of position vectors |
| **Ratio Split ($m : n$)** | $\overrightarrow{AP} = \frac{m}{m+n} \overrightarrow{AB}$ | Sub-segment along vector $\overrightarrow{AB}$ | Fraction of total length |
| **Point $P$ Position** | $\overrightarrow{OP} = \mathbf{a} + \frac{m}{m+n}(\mathbf{b} - \mathbf{a})$ | Position vector of internal point $P$ | Route starting from origin $O$ |

---

### 2. Geometry Diagram of Position Vectors

```
                  B (b)
                 / \
                /   \
               /     \ P (divides AB in ratio m:n)
              /       \
             /         \
    (a) A   +-----------+
           \             /
            \           /
             \         /
              \       /
               \     /
                \   /
                 O (Origin)
```

* **Origin Reference:** All position vectors start at origin $O$; $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$.
* **Vector Path Addition:** To find any vector path, navigate along known vectors: $\overrightarrow{OP} = \overrightarrow{OA} + \overrightarrow{AP}$.
* **Ratio Fractions:** If $AP : PB = 2 : 3$, then $\overrightarrow{AP} = \frac{2}{5}\overrightarrow{AB}$.

$$\overrightarrow{OP} = \mathbf{a} + \frac{m}{m+n}(\mathbf{b} - \mathbf{a}) = \frac{n}{m+n}\mathbf{a} + \frac{m}{m+n}\mathbf{b}$$

---

### 3. Worked Example

> **Question:**
> In triangle $OAB$, position vector $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. Point $M$ is the midpoint of $OA$, and point $P$ lies on line $AB$ such that $AP : PB = 3 : 1$.
> 1. Express vector $\overrightarrow{AB}$ in terms of $\mathbf{a}$ and $\mathbf{b}$.
> 2. Find position vector $\overrightarrow{MP}$ in terms of $\mathbf{a}$ and $\mathbf{b}$ in its simplest form.

**Step 1: Express $\overrightarrow{AB}$ using vector triangle rule**

1. Apply vector path from point $A$ to $B$ via origin $O$:

$$\overrightarrow{AB} = \overrightarrow{AO} + \overrightarrow{OB}$$

2. Substitute reverse vector $\overrightarrow{AO} = -\mathbf{a}$ and position vector $\overrightarrow{OB} = \mathbf{b}$:

$$\overrightarrow{AB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}$$

**Step 2: Construct vector path $\overrightarrow{MP} = \overrightarrow{MA} + \overrightarrow{AP}$**

1. Determine $\overrightarrow{MA}$ as half of $\overrightarrow{OA} = \mathbf{a}$:

$$\overrightarrow{MA} = \frac{1}{2}\mathbf{a}$$

2. Determine $\overrightarrow{AP}$ as $\frac{3}{4}$ of $\overrightarrow{AB}$:

$$\overrightarrow{AP} = \frac{3}{4}(\mathbf{b} - \mathbf{a})$$

3. Combine vector segments:

$$\overrightarrow{MP} = \frac{1}{2}\mathbf{a} + \frac{3}{4}(\mathbf{b} - \mathbf{a})$$

4. Expand and collect like terms for $\mathbf{a}$ and $\mathbf{b}$:

$$\overrightarrow{MP} = \frac{1}{2}\mathbf{a} + \frac{3}{4}\mathbf{b} - \frac{3}{4}\mathbf{a} = \left(\frac{1}{2} - \frac{3}{4}\right)\mathbf{a} + \frac{3}{4}\mathbf{b} = -\frac{1}{4}\mathbf{a} + \frac{3}{4}\mathbf{b}$$

5. **Key result 1:** $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$.
6. **Key result 2:** $\overrightarrow{MP} = \frac{1}{4}(3\mathbf{b} - \mathbf{a})$.

---

### 4. Common Examiner Traps

* **Direction Inversion:** Writing $\overrightarrow{AB} = \mathbf{a} - \mathbf{b}$ instead of $\mathbf{b} - \mathbf{a}$. Remember that $\overrightarrow{AB} = \overrightarrow{OB} - \overrightarrow{OA}$.
* **Incorrect Ratio Denominator:** For ratio $3 : 1$, using fraction $\frac{3}{1}$ instead of $\frac{3}{3+1} = \frac{3}{4}$. Total parts equal $m+n$.
* **Unsimplified Expressions:** Leaving vectors unexpanded (e.g. $\frac{1}{2}\mathbf{a} + \frac{3}{4}(\mathbf{b}-\mathbf{a})$) without simplifying coefficients of $\mathbf{a}$ and $\mathbf{b}$.

---
