# Topic: MC4.3 Angles in Polygons

For any convex $n$-sided polygon, the sum of interior angles is $(n - 2) \times 180^\circ$ and the sum of exterior angles is $360^\circ$; for regular polygons, each interior angle $I$ and exterior angle $E$ are constant and supplementary ($I + E = 180^\circ$).

---

### 1. Polygon Angle Formula Breakdown

| Parameter | Any $n$-sided Polygon | Regular $n$-sided Polygon |
| --- | --- | --- |
| Interior Angle Sum | $S_{\text{int}} = (n - 2) \times 180^\circ$ | $S_{\text{int}} = (n - 2) \times 180^\circ$ |
| Exterior Angle Sum | $S_{\text{ext}} = 360^\circ$ | $S_{\text{ext}} = 360^\circ$ |
| Single Exterior Angle ($E$) | Varies | $E = \frac{360^\circ}{n}$ |
| Single Interior Angle ($I$) | Varies | $I = 180^\circ - E = \frac{(n - 2) \times 180^\circ}{n}$ |

---

### 2. Geometry & ASCII Diagram

```
                Vertex
                 / \
                / I \ E
  -------------*-----*---------> Straight Line Extension
              Interior Exterior
```

* **Supplementary Pair:** Interior angle $I$ and exterior angle $E$ form a straight line: $I + E = 180^\circ$.
* **Triangulation Principle:** An $n$-sided polygon splits into $(n - 2)$ non-overlapping triangles from a single vertex.
* **Number of Sides Calculation:** The number of sides $n$ of a regular polygon is given by $n = \frac{360^\circ}{E}$.

$$I + E = 180^\circ \quad \text{and} \quad n = \frac{360^\circ}{E}$$

---

### 3. Worked Example

> **Question:**
> 1. Calculate the magnitude of one interior angle of a regular octagon ($n = 8$).
> 2. A regular polygon has an interior angle of $156^\circ$. Calculate the number of sides $n$ of this polygon.

**Step 1: Calculate Interior Angle of Regular Octagon**

1. Find the exterior angle $E$ first using $n = 8$:

$$E = \frac{360^\circ}{8} = 45^\circ$$

2. Calculate interior angle $I = 180^\circ - E$:

$$I = 180^\circ - 45^\circ = 135^\circ$$

(Alternatively, $I = \frac{(8 - 2) \times 180^\circ}{8} = \frac{6 \times 180^\circ}{8} = \frac{1080^\circ}{8} = 135^\circ$).

**Step 2: Calculate Number of Sides $n$ Given Interior Angle $156^\circ$**

1. Calculate exterior angle $E$:

$$E = 180^\circ - 156^\circ = 24^\circ$$

2. Solve for $n$ using exterior sum:

$$n = \frac{360^\circ}{E} = \frac{360^\circ}{24^\circ} = 15$$

3. **Octagon Interior Angle:** $135^\circ$
4. **Number of Sides $n$:** $15\text{ sides}$

---

### 4. Common Examiner Traps

* **Using $n$ instead of $n-2$:** Writing $n \times 180^\circ$ for the interior sum instead of $(n - 2) \times 180^\circ$.
* **Applying Regular Formulas to Irregular Polygons:** Dividing interior sum by $n$ when sides and angles are not all equal.
* **Confusing Interior and Exterior Angles:** Setting $\frac{360^\circ}{n} = 156^\circ$ directly instead of finding $E = 180^\circ - 156^\circ = 24^\circ$ first.
