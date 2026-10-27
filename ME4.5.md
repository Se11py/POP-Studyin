# Topic: ME4.5 Similarity & Congruence (Scale Factors)

Similar geometric shapes possess equal corresponding angles and proportional side lengths governed by a linear scale factor $k$, causing areas to scale by $k^2$ and volumes to scale by $k^3$; congruent shapes are identical in size and shape ($k=1$).

---

### 1. Scale Factor & Congruence Breakdown

| Dimension / Property | Mathematical Ratio | Condition / Meaning |
| --- | --- | --- |
| Linear Scale Factor ($k$) | $k = \frac{L_2}{L_1}$ | Ratio of any two corresponding linear lengths. |
| Area Scale Factor ($k^2$) | $\frac{A_2}{A_1} = k^2 = \left(\frac{L_2}{L_1}\right)^2$ | Ratio of corresponding 2D surface areas. |
| Volume Scale Factor ($k^3$) | $\frac{V_2}{V_1} = k^3 = \left(\frac{L_2}{L_1}\right)^3$ | Ratio of corresponding 3D enclosed volumes. |
| Congruence Criteria | SSS, SAS, ASA, RHS | Exact match in size and shape ($k=1$). |

---

### 2. Geometry & ASCII Diagram

```
      Shape 1 (Length L1)          Shape 2 (Length L2 = k * L1)
         +------+                     +------------+
         | Area |                     |    Area    |
         |  A1  |                     |  A2 = k^2*A1
         +------+                     +------------+
```

* **Linear Scale Factor Extraction:** Always calculate linear scale factor $k = \frac{L_2}{L_1}$ first before computing area or volume changes.
* **Reverse Scaling:** Given volume ratio $\frac{V_2}{V_1}$, find linear scale factor using $k = \sqrt[3]{\frac{V_2}{V_1}}$.
* **AAA Criterion:** Equal angles prove similarity, but NOT congruence (shapes can be different sizes).

$$k = \frac{L_2}{L_1} \implies \frac{A_2}{A_1} = k^2 \quad \text{and} \quad \frac{V_2}{V_1} = k^3$$

---

### 3. Worked Example

> **Question:**
> Two geometrically similar solid cones $C_1$ and $C_2$ have heights of $6\text{ cm}$ and $15\text{ cm}$ respectively.
> 1. The base area of cone $C_1$ is $32\text{ cm}^2$. Calculate the base area of cone $C_2$.
> 2. The volume of cone $C_2$ is $250\text{ cm}^3$. Calculate the volume of cone $C_1$.

**Step 1: Calculate Linear Scale Factor $k$ and Base Area of $C_2$**

1. Compute linear scale factor $k$:

$$k = \frac{h_2}{h_1} = \frac{15}{6} = 2.5$$

2. Calculate area scale factor $k^2$:

$$k^2 = (2.5)^2 = 6.25$$

3. Multiply base area of $C_1$ by $k^2$:

$$\text{Base Area } A_2 = A_1 \times k^2 = 32 \times 6.25 = 200\text{ cm}^2$$

**Step 2: Calculate Volume of Cone $C_1$**

1. Calculate volume scale factor $k^3$:

$$k^3 = (2.5)^3 = 15.625$$

2. Divide volume of $C_2$ by $k^3$ to find volume of smaller cone $C_1$:

$$V_1 = \frac{V_2}{k^3} = \frac{250}{15.625} = 16\text{ cm}^3$$

3. **Base Area $A_2$:** $200\text{ cm}^2$
4. **Volume $V_1$:** $16\text{ cm}^3$

---

### 4. Common Examiner Traps

* **Linear Scaling Error:** Multiplying area or volume by linear scale factor $k$ ($32 \times 2.5$) instead of $k^2$ or $k^3$.
* **Cube Root Omission:** Taking square root $\sqrt{\frac{V_2}{V_1}}$ instead of cube root $\sqrt[3]{\frac{V_2}{V_1}}$ when deriving linear scale factor from volumes.
* **Non-Corresponding Sides:** Comparing non-matching sides of similar figures when finding scale factor $k$.
