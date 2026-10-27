# Topic: ME4.6 Arc Length, Sector Area & Segment Area

In a circular sector of radius $r$ subtending central angle $\theta^\circ$, arc length and sector area represent fractional proportions ($\frac{\theta}{360^\circ}$) of full circumference and area, while segment area is derived by subtracting triangle area $\frac{1}{2} r^2 \sin \theta$ from sector area.

---

### 1. Circle Sector & Segment Formula Breakdown

| Feature | Formula (Degrees) | Key Description |
| --- | --- | --- |
| Arc Length ($s$) | $s = \frac{\theta}{360^\circ} \times 2\pi r$ | Curved boundary length subtended by central angle $\theta$. |
| Total Sector Perimeter ($P$) | $P = s + 2r = \left(\frac{\theta}{360^\circ} \times 2\pi r\right) + 2r$ | Curved arc length plus two straight radii. |
| Sector Area ($A_{\text{sector}}$) | $A_{\text{sector}} = \frac{\theta}{360^\circ} \times \pi r^2$ | Enclosed pie-slice surface area. |
| Segment Area ($A_{\text{segment}}$) | $A_{\text{segment}} = \frac{\theta}{360^\circ} \pi r^2 - \frac{1}{2} r^2 \sin \theta$ | Region between curved arc and straight chord line. |

---

### 2. Geometry & ASCII Diagram

```
                 O (Center)
                / \
               /   \  Radius r
              /  θ  \
             /_______\  Chord
            A Arc (s) B
            [ Shaded Segment ]
```

* **Fractional Proportion:** $\frac{\theta}{360^\circ}$ expresses the sector as a fraction of a complete $360^\circ$ circle.
* **Perimeter Caution:** Sector perimeter MUST include both straight radii ($+ 2r$) in addition to arc length $s$.
* **Segment Dissection:** $\text{Segment Area} = \text{Sector Area} - \text{Triangle Area} = \frac{\theta}{360} \pi r^2 - \frac{1}{2} r^2 \sin \theta$.

$$A_{\text{segment}} = \frac{\theta}{360^\circ} \pi r^2 - \frac{1}{2} r^2 \sin \theta$$

---

### 3. Worked Example

> **Question:**
> A sector of a circle with radius $r = 8\text{ cm}$ has a central angle $\theta = 60^\circ$.
> 1. Calculate the total perimeter of the sector.
> 2. Calculate the exact area of the shaded segment bounded by chord $AB$. Give answers to 3 significant figures.

**Step 1: Calculate Total Sector Perimeter**

1. Compute curved arc length $s$:

$$s = \frac{60^\circ}{360^\circ} \times 2\pi (8) = \frac{1}{6} \times 16\pi = \frac{8\pi}{3} \approx 8.37758\text{ cm}$$

2. Add two radii ($2r = 16$) for total perimeter:

$$P = \frac{8\pi}{3} + 16 \approx 8.37758 + 16 = 24.37758... \approx 24.4\text{ cm}$$

**Step 2: Calculate Segment Area**

1. Compute sector area $A_{\text{sector}}$:

$$A_{\text{sector}} = \frac{60^\circ}{360^\circ} \times \pi (8)^2 = \frac{1}{6} \times 64\pi = \frac{32\pi}{3} \approx 33.51032\text{ cm}^2$$

2. Compute triangle area $A_{\text{triangle}} = \frac{1}{2} r^2 \sin \theta$:

$$A_{\text{triangle}} = \frac{1}{2} (8)^2 \sin(60^\circ) = 32 \times \frac{\sqrt{3}}{2} = 16\sqrt{3} \approx 27.71281\text{ cm}^2$$

3. Subtract triangle area from sector area:

$$A_{\text{segment}} = 33.51032 - 27.71281 = 5.7975... \approx 5.80\text{ cm}^2$$

4. **Total Sector Perimeter:** $24.4\text{ cm}$ (to 3 s.f.)
5. **Shaded Segment Area:** $5.80\text{ cm}^2$ (to 3 s.f.)

---

### 4. Common Examiner Traps

* **Forgetting Radii in Sector Perimeter:** Stating perimeter as just arc length $s$ without adding $+ 2r$.
* **Calculator Angle Mode:** Having calculator set to Radians instead of Degrees when calculating $\sin 60^\circ$.
* **Confusing Major and Minor Sectors:** Using $\theta$ instead of $360^\circ - \theta$ when asked for major sector/arc properties.
