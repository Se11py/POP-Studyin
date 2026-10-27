# Topic: ME4.7 Frustums & Complex 3D Solids

A frustum is a truncated 3D solid created by slicing off the top section of a cone or pyramid parallel to its base, evaluated mathematically by taking the difference between the original large solid and the removed small similar solid.

---

### 1. Frustum & Complex Solid Mensuration

| Solid Feature | Volume / Area Derivation Formula | Key Structural Property |
| --- | --- | --- |
| Cone / Pyramid Frustum Volume | $V_{\text{frustum}} = V_{\text{large}} - V_{\text{small}} = \frac{1}{3}\pi R^2 H - \frac{1}{3}\pi r^2 h$ | Difference of similar original and removed top solids. |
| Cone Frustum Curved Area | $A_{\text{curved}} = \pi R L - \pi r l$ | Difference between large and small curved surfaces. |
| Cone Frustum Total Surface Area | $A_{\text{total}} = (\pi R L - \pi r l) + \pi R^2 + \pi r^2$ | Curved surface area plus top circular base and bottom circular base. |
| Hemisphere (Solid) | $V = \frac{2}{3}\pi r^3, \quad A_{\text{total}} = 3\pi r^2$ | Curved face ($2\pi r^2$) plus circular base ($\pi r^2$). |

---

### 2. Geometry & ASCII Diagram

```
                 +---+ Top Base (radius r, height h)
                /     \  Removed Small Cone
               +-------+ ---------------------------
              /         \
             /           \ Frustum (Height H - h)
            +-------------+
             \           /
              +---------+ Bottom Base (radius R, height H)
```

* **Similarity Scale Factor:** Small top cone is similar to large original cone: linear scale factor $k = \frac{r}{R} = \frac{h}{H} = \frac{l}{L}$.
* **Volume Scale Factor:** $V_{\text{small}} = k^3 V_{\text{large}} \implies V_{\text{frustum}} = V_{\text{large}}(1 - k^3)$.
* **Slant Height Similarity:** Slant height of small cone $l$ and large cone $L$ satisfy $L - l = L_{\text{frustum}}$.

$$V_{\text{frustum}} = V_{\text{large}} - V_{\text{small}} = \frac{1}{3} \pi H R^2 - \frac{1}{3} \pi h r^2$$

---

### 3. Worked Example

> **Question:**
> A large cone has base radius $R = 9\text{ cm}$ and vertical height $H = 12\text{ cm}$. A small cone of height $h = 4\text{ cm}$ is sliced off the top parallel to the base to form a frustum.
> 1. Calculate the radius $r$ of the small top cone.
> 2. Calculate the volume of the frustum. Give your answer to 3 significant figures.

**Step 1: Calculate Small Radius $r$ Using Similarity**

1. Determine linear scale factor $k$:

$$k = \frac{h}{H} = \frac{4}{12} = \frac{1}{3}$$

2. Apply $k$ to base radius $R$:

$$r = k \times R = \frac{1}{3} \times 9 = 3\text{ cm}$$

**Step 2: Calculate Frustum Volume**

1. Calculate volume of large original cone $V_{\text{large}}$:

$$V_{\text{large}} = \frac{1}{3} \pi R^2 H = \frac{1}{3} \pi (9)^2 (12) = 324\pi \approx 1017.876\text{ cm}^3$$

2. Calculate volume of small removed top cone $V_{\text{small}}$:

$$V_{\text{small}} = \frac{1}{3} \pi r^2 h = \frac{1}{3} \pi (3)^2 (4) = 12\pi \approx 37.699\text{ cm}^3$$

(Alternatively, $V_{\text{small}} = k^3 V_{\text{large}} = (\frac{1}{3})^3 \times 324\pi = \frac{1}{27} \times 324\pi = 12\pi$).

3. Subtract $V_{\text{small}}$ from $V_{\text{large}}$:

$$V_{\text{frustum}} = 324\pi - 12\pi = 312\pi \approx 980.176... \approx 980\text{ cm}^3$$

4. **Small Radius $r$:** $3\text{ cm}$
5. **Frustum Volume:** $980\text{ cm}^3$ (to 3 s.f.)

---

### 4. Common Examiner Traps

* **Forgetting Flat Base Areas:** Calculating only curved surface area when asked for TOTAL surface area of a closed frustum (omitting $\pi R^2$ or $\pi r^2$).
* **Confusing Height $H$ with Frustum Height:** Mixing up vertical height of full cone $H$ with height of frustum $H_{\text{frustum}} = H - h$.
* **Slant Height vs Vertical Height:** Using vertical height $H$ instead of slant height $L$ in curved surface area formulas $\pi R L$.
