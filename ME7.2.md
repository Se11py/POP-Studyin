# Topic: ME7.2 Vector Arithmetic & Magnitude

A 2D column vector $\mathbf{v} = \begin{pmatrix} x \\ y \end{pmatrix}$ expresses a translation in two-dimensional space, where scalar operations follow component-wise arithmetic and magnitude is calculated using Pythagoras' theorem $|\mathbf{v}| = \sqrt{x^2 + y^2}$.

---

### 1. Column Vector Operations Summary

| Operation | Formula / Definition | Graphic Meaning | Key Rule |
| --- | --- | --- | --- |
| **Addition** | $\begin{pmatrix} x_1 \\ y_1 \end{pmatrix} + \begin{pmatrix} x_2 \\ y_2 \end{pmatrix} = \begin{pmatrix} x_1 + x_2 \\ y_1 + y_2 \end{pmatrix}$ | Head-to-tail vector chain | Combined resultant vector |
| **Subtraction** | $\begin{pmatrix} x_1 \\ y_1 \end{pmatrix} - \begin{pmatrix} x_2 \\ y_2 \end{pmatrix} = \begin{pmatrix} x_1 - x_2 \\ y_1 - y_2 \end{pmatrix}$ | Vector from tip of $\mathbf{b}$ to tip of $\mathbf{a}$ | Reverse direction of subtracted vector |
| **Scalar Product** | $k \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} kx \\ ky \end{pmatrix}$ | Stretch / compress length by factor $|k|$ | If $k < 0$, direction reverses |
| **Magnitude** | $|\mathbf{a}| = \sqrt{x^2 + y^2}$ | Hypotenuse length of right-angled triangle | Always a positive scalar scalar value |

---

### 2. Geometry of Vector Addition & Magnitude

```
           ^ y
           |           Resultant a + b
           |          +----------------> C
           |         /                /
           |     a  /                /  b
           |       /                /
           |      A ---------------> B
           |              b
   --------+-----------------------------------> x
           | 
           |   Right-triangle magnitude:  |\
           |                              | \  |a| = √(x² + y²)
           |                            y |  \
           |                              +---+
           |                                x
```

* **Head-to-Tail Rule:** Place the tail of the second vector $\mathbf{b}$ at the head of the first vector $\mathbf{a}$.
* **Reverse Vectors:** $\overrightarrow{BA} = -\overrightarrow{AB} = \begin{pmatrix} -x \\ -y \end{pmatrix}$.
* **Magnitude Hypotenuse:** Magnitude is the straight-line distance calculated via $|\mathbf{v}| = \sqrt{x^2 + y^2}$.

$$|\mathbf{v}| = \sqrt{x^2 + y^2}$$

---

### 3. Worked Example

> **Question:**
> Given vectors $\mathbf{a} = \begin{pmatrix} 4 \\ -3 \end{pmatrix}$ and $\mathbf{b} = \begin{pmatrix} -2 \\ 5 \end{pmatrix}$:
> 1. Calculate vector $\mathbf{c} = 3\mathbf{a} - 2\mathbf{b}$.
> 2. Find the exact magnitude $|\mathbf{c}|$ in simplified surd form.

**Step 1: Compute scalar multiples and subtract component-wise**

1. Multiply vectors by their respective scalars:

$$3\mathbf{a} = 3 \begin{pmatrix} 4 \\ -3 \end{pmatrix} = \begin{pmatrix} 12 \\ -9 \end{pmatrix}$$

$$2\mathbf{b} = 2 \begin{pmatrix} -2 \\ 5 \end{pmatrix} = \begin{pmatrix} -4 \\ 10 \end{pmatrix}$$

2. Subtract $2\mathbf{b}$ from $3\mathbf{a}$:

$$\mathbf{c} = \begin{pmatrix} 12 \\ -9 \end{pmatrix} - \begin{pmatrix} -4 \\ 10 \end{pmatrix} = \begin{pmatrix} 12 - (-4) \\ -9 - 10 \end{pmatrix} = \begin{pmatrix} 16 \\ -19 \end{pmatrix}$$

**Step 2: Compute magnitude using Pythagoras' theorem**

1. Substitute vector components $x = 16$ and $y = -19$ into magnitude formula:

$$|\mathbf{c}| = \sqrt{(16)^2 + (-19)^2}$$

2. Evaluate squares and simplify sum under radical:

$$|\mathbf{c}| = \sqrt{256 + 361} = \sqrt{617}$$

3. **Key result 1:** Vector $\mathbf{c} = \begin{pmatrix} 16 \\ -19 \end{pmatrix}$.
4. **Key result 2:** Magnitude $|\mathbf{c}| = \sqrt{617} \approx 24.84$.

---

### 4. Common Examiner Traps

* **Forgetting Bracket Squaring Rules:** Squaring negative components (e.g., $(-19)^2$) must yield a positive value. Writing $-19^2 = -361$ on calculators causes magnitude errors.
* **Confusing Magnitude with Vector:** Magnitude is a single number (scalar); do not write magnitude as a column vector!
* **Fraction/Negative Multipliers:** Failing to distribute negative signs across both top and bottom components when subtracting vectors.

---
