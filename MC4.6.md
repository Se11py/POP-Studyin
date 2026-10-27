# Topic: MC4.6 Perimeter & Area of 2D Shapes

Perimeter $P$ measures the total linear distance around the outer boundary of a two-dimensional shape, whereas area $A$ quantifies the enclosed surface region in square units.

---

### 1. 2D Mensuration Formula Breakdown

| Shape | Perimeter / Circumference Formula | Surface Area Formula |
| --- | --- | --- |
| Rectangle | $P = 2(l + w)$ | $A = l \times w$ |
| Triangle | $P = a + b + c$ | $A = \frac{1}{2} b h \quad (h \perp b)$ |
| Parallelogram | $P = 2(a + b)$ | $A = b \times h \quad (h \perp b)$ |
| Trapezium | $P = a + b + c + d$ | $A = \frac{1}{2}(a + b)h \quad (a \parallel b)$ |
| Circle | $C = 2\pi r = \pi d$ | $A = \pi r^2$ |

---

### 2. Geometry & ASCII Diagram

```
          a (Parallel Top)
       +--------+
      /|        |\
     / | h      | \  Slant Height s
    /  |        |  \
   +---+--------+---+
   <----  b (Base) ---->
```

* **Perpendicular Height:** Always use vertical/perpendicular height $h$, never slant height $s$, when calculating triangle, parallelogram, or trapezium area.
* **Trapezium Parallel Sides:** $a$ and $b$ are the two parallel sides; $h$ is the perpendicular distance between them.
* **Composite Shapes:** Divide irregular composite shapes into simple non-overlapping sub-shapes and sum their areas.

$$A_{\text{trap}} = \frac{1}{2}(a + b)h \quad \text{and} \quad A_{\text{circle}} = \pi r^2$$

---

### 3. Worked Example

> **Question:**
> A composite shape consists of a rectangle of length $12\text{ cm}$ and width $8\text{ cm}$, topped by a semicircle along its $8\text{ cm}$ width.
> 1. Calculate the total area of the composite shape.
> 2. Calculate the total perimeter of the composite shape. Give answers to 3 significant figures.

**Step 1: Calculate Total Area**

1. Calculate rectangle area $A_1$:

$$A_1 = l \times w = 12 \times 8 = 96\text{ cm}^2$$

2. Calculate semicircle area $A_2$ with radius $r = \frac{8}{2} = 4\text{ cm}$:

$$A_2 = \frac{1}{2} \pi r^2 = \frac{1}{2} \pi (4)^2 = 8\pi \approx 25.1327\text{ cm}^2$$

3. Sum areas:

$$A_{\text{total}} = 96 + 8\pi \approx 121.1327... \approx 121\text{ cm}^2$$

**Step 2: Calculate Total Boundary Perimeter**

1. Identify boundary components: 2 long sides ($12\text{ cm}$), 1 bottom side ($8\text{ cm}$), and curved semicircle arc ($\pi r$).

$$\text{Curved Arc} = \pi r = 4\pi \approx 12.5663\text{ cm}$$

2. Sum outer boundary lengths (do not include internal $8\text{ cm}$ boundary):

$$P = 12 + 12 + 8 + 4\pi = 32 + 4\pi \approx 44.5663... \approx 44.6\text{ cm}$$

3. **Total Area:** $121\text{ cm}^2$ (to 3 s.f.)
4. **Total Boundary Perimeter:** $44.6\text{ cm}$ (to 3 s.f.)

---

### 4. Common Examiner Traps

* **Including Internal Boundaries in Perimeter:** Adding the shared internal $8\text{ cm}$ segment when calculating the outer perimeter of a composite shape.
* **Confusing Radius and Diameter:** Using $d = 8$ in $A = \pi r^2$ instead of taking $r = 4$.
* **Using Slant Height for Area:** Using the non-perpendicular side length of a trapezium or parallelogram as height $h$.
