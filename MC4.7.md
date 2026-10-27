# Topic: MC4.7 Surface Area & Volume of 3D Solids

Volume $V$ measures the internal three-dimensional space enclosed by a solid object, while total surface area $A$ sums the areas of all external bounding faces.

---

### 1. 3D Solid Mensuration Breakdown

| 3D Solid | Volume Formula ($V$) | Total Surface Area Formula ($A$) |
| --- | --- | --- |
| Cuboid | $V = l \times w \times h$ | $A = 2(lw + lh + wh)$ |
| Right Prism | $V = A_{\text{cross}} \times h$ | $A = 2 A_{\text{cross}} + (\text{Perimeter}_{\text{cross}} \times h)$ |
| Closed Cylinder | $V = \pi r^2 h$ | $A = 2\pi r^2 + 2\pi r h$ |
| Sphere | $V = \frac{4}{3} \pi r^3$ | $A = 4\pi r^2$ |
| Cone | $V = \frac{1}{3} \pi r^2 h$ | $A = \pi r^2 + \pi r l \quad (l = \text{slant height})$ |

---

### 2. Geometry & ASCII Diagram

```
           +---+ Top Circle (A = pi*r^2)
          /     \
         +-------+
         |       |
         |   h   | Curved Surface (2*pi*r*h)
         |       |
         +-------+
          \     /
           +---+ Bottom Circle (A = pi*r^2)
           < r >
```

* **Prism Principle:** Any prism with uniform cross-sectional area $A_{\text{cross}}$ along length $h$ has volume $V = A_{\text{cross}} \times h$.
* **Cylinder Net:** Unrolling a cylinder yields two circular bases ($2 \times \pi r^2$) and one rectangle of length $2\pi r$ and height $h$.
* **Cone Slant Height:** Slant height $l$, vertical height $h$, and radius $r$ form a right triangle: $l = \sqrt{r^2 + h^2}$.

$$V_{\text{cyl}} = \pi r^2 h \quad \text{and} \quad A_{\text{total}} = 2\pi r^2 + 2\pi r h$$

---

### 3. Worked Example

> **Question:**
> A closed cylinder has radius $r = 5\text{ cm}$ and height $h = 12\text{ cm}$.
> 1. Calculate the volume $V$ of the cylinder.
> 2. Calculate the total surface area $A$ of the cylinder. Give answers to 3 significant figures.

**Step 1: Calculate Cylinder Volume $V$**

1. Apply volume formula $V = \pi r^2 h$ with $r = 5$ and $h = 12$:

$$V = \pi (5)^2 (12) = \pi (25) (12) = 300\pi \approx 942.4777...\text{ cm}^3$$

**Step 2: Calculate Total Surface Area $A$**

1. Calculate base area $2 \times \pi r^2$:

$$\text{Bases Area} = 2 \pi (5)^2 = 50\pi\text{ cm}^2$$

2. Calculate curved surface area $2\pi r h$:

$$\text{Curved Area} = 2 \pi (5) (12) = 120\pi\text{ cm}^2$$

3. Sum areas for total surface area:

$$A_{\text{total}} = 50\pi + 120\pi = 170\pi \approx 534.0707...\text{ cm}^2$$

4. **Volume:** $942\text{ cm}^3$ (to 3 s.f.)
5. **Total Surface Area:** $534\text{ cm}^2$ (to 3 s.f.)

---

### 4. Common Examiner Traps

* **Forgetting Open vs Closed Solids:** Including top/bottom bases in surface area calculations for open containers or pipes.
* **Confusing Volume and Area Formulas:** Using $4\pi r^3$ or $\frac{4}{3}\pi r^2$ for sphere calculations due to index confusion.
* **Using Vertical Height in Cone Surface Area:** Using vertical height $h$ instead of slant height $l$ in $\pi r l$ curved surface formula.
