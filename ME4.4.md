# Topic: ME4.4 Scale Drawings, Bearings & Maps

Bearings express directional headings as three-figure angles measured clockwise from North ($000^\circ \le \theta < 360^\circ$), and map scales $1 : n$ link diagram dimensions linearly to real-world distances and quadratically to real-world areas ($1 : n^2$).

---

### 1. Bearings & Map Scale Breakdown

| Concept | Mathematical Rule / Identity | Formatting / Application |
| --- | --- | --- |
| Three-Figure Bearing | Measured clockwise from North line | Always written with 3 digits (e.g. $045^\circ, 009^\circ, 220^\circ$). |
| Back Bearing (from $B$ to $A$) | $\text{Back Bearing} = \theta \pm 180^\circ$ | Add $180^\circ$ if $\theta < 180^\circ$; Subtract $180^\circ$ if $\theta \ge 180^\circ$. |
| Linear Map Scale ($1 : n$) | $\text{Real Length} = \text{Map Length} \times n$ | $1\text{ cm} : n\text{ cm}$ (e.g. $1 : 25\,000 \implies 1\text{ cm} = 0.25\text{ km}$). |
| Area Map Scale ($1 : n^2$) | $\text{Real Area} = \text{Map Area} \times n^2$ | Area scales by square of linear scale factor. |

---

### 2. Geometry & ASCII Diagram

```
       N ^                 N ^
         |                   |
         |  / B              |
         | /                 |   Back Bearing (theta + 180°)
         |/ Bearing theta    |  /
       A *-------------------* B
```

* **North Line Alignment:** Always draw a vertical North line arrow ($N \uparrow$) at the "FROM" location before measuring or calculating angles.
* **Co-interior Angle Property:** North lines are parallel, so interior angles between North lines sum to $180^\circ$.
* **Area Scale Conversion:** If linear scale is $1\text{ cm} : 2\text{ km}$, then area scale is $1\text{ cm}^2 : 4\text{ km}^2$.

$$\text{Back Bearing} = (\text{Forward Bearing} + 180^\circ) \bmod 360^\circ$$

---

### 3. Worked Example

> **Question:**
> 1. The bearing of ship $B$ from port $A$ is $065^\circ$. Calculate the bearing of port $A$ from ship $B$ (back bearing).
> 2. A map has a scale of $1 : 50\,000$. A lake has an area of $4.5\text{ cm}^2$ on the map. Calculate the actual area of the lake in square kilometers ($\text{km}^2$).

**Step 1: Calculate Back Bearing of $A$ from $B$**

1. Identify forward bearing $\theta = 065^\circ$:

$$\text{Since } \theta < 180^\circ, \text{ add } 180^\circ$$

2. Calculate back bearing:

$$\text{Back Bearing} = 065^\circ + 180^\circ = 245^\circ$$

**Step 2: Convert Map Area to Actual Area in $\text{km}^2$**

1. Convert linear scale $1 : 50\,000$ to kilometers ($1\text{ cm} = 50\,000\text{ cm}$):

$$50\,000\text{ cm} = 500\text{ m} = 0.5\text{ km} \implies 1\text{ cm} = 0.5\text{ km}$$

2. Square linear scale to get area scale:

$$1\text{ cm}^2 = (0.5\text{ km})^2 = 0.25\text{ km}^2$$

3. Multiply map area ($4.5\text{ cm}^2$) by area scale factor:

$$\text{Actual Area} = 4.5 \times 0.25 = 1.125\text{ km}^2$$

4. **Back Bearing:** $245^\circ$
5. **Actual Lake Area:** $1.125\text{ km}^2$

---

### 4. Common Examiner Traps

* **Missing Leading Zeros:** Writing bearings as $65^\circ$ or $9^\circ$ instead of required three-figure format $065^\circ$ or $009^\circ$.
* **Measuring Counter-Clockwise:** Measuring angle counter-clockwise from North or measuring from the East/West horizontal line.
* **Linear Scale on Area:** Multiplying map area by $n$ ($4.5 \times 50\,000$) instead of squaring linear scale ($n^2$).
