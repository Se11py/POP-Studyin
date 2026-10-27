# Topic: ME4.1 Advanced Angle & Polygon Theorems

Advanced polygon analysis evaluates tessellations, non-regular composite polygons, and complex multi-step angle proofs by synthesizing interior angle sums, exterior angle constraints, and point-sum constraints.

---

### 1. Advanced Polygon Concept Breakdown

| Concept | Mathematical Condition / Formula | Key Criterion |
| --- | --- | --- |
| Single Shape Tessellation | $\frac{360^\circ}{I} = k \quad (k \in \mathbb{Z}^+)$ | Interior angle $I$ must be an exact factor of $360^\circ$. |
| Dual-Shape Tessellation | $a \cdot I_1 + b \cdot I_2 = 360^\circ \quad (a, b \in \mathbb{Z}^+)$ | Angles at every meeting vertex must sum to exactly $360^\circ$. |
| Irregular Polygon Sum | $S_{\text{int}} = (n - 2) \times 180^\circ$ | Sum rule holds for all convex polygons regardless of regular symmetry. |

---

### 2. Geometry & ASCII Diagram

```
            Vertex Meeting Point
                   \ | /
                  -- * --  Sum at vertex = 360°
                   / | \
          Polygon 1   Polygon 2
```

* **Tessellation Rule:** Regular polygons that tessellate on their own are equilateral triangles ($I=60^\circ$), squares ($I=90^\circ$), and regular hexagons ($I=120^\circ$).
* **Regular Pentagon Non-Tessellation:** Regular pentagons ($I=108^\circ$) leave gaps because $360^\circ / 108^\circ = 3.33 \notin \mathbb{Z}$.
* **Polygon Triangulation:** Any non-regular $n$-sided polygon can be dissected into $(n - 2)$ triangles.

$$\sum \theta_{\text{vertex}} = 360^\circ \quad \implies k \cdot I = 360^\circ$$

---

### 3. Worked Example

> **Question:**
> 1. Show algebraically whether regular octagons ($I = 135^\circ$) can tessellate on their own.
> 2. An irregular hexagon has five interior angles measuring $100^\circ, 110^\circ, 120^\circ, 130^\circ$, and $140^\circ$. Calculate the sixth interior angle.

**Step 1: Evaluate Tessellation of Regular Octagons**

1. Calculate $360^\circ$ division by interior angle $I = 135^\circ$:

$$\frac{360^\circ}{135^\circ} = \frac{8}{3} = 2.666...$$

2. State conclusion: Since $\frac{360^\circ}{135^\circ}$ is not an integer, regular octagons cannot tessellate on their own without leaving gaps (they require squares to fill gaps).

**Step 2: Calculate Sixth Angle of Irregular Hexagon ($n = 6$)**

1. Calculate total interior angle sum for $n = 6$:

$$S_{\text{int}} = (6 - 2) \times 180^\circ = 4 \times 180^\circ = 720^\circ$$

2. Sum the five given interior angles:

$$\text{Sum} = 100^\circ + 110^\circ + 120^\circ + 130^\circ + 140^\circ = 600^\circ$$

3. Subtract from total sum to find sixth angle $x$:

$$x = 720^\circ - 600^\circ = 120^\circ$$

4. **Tessellation Proof:** Octagons cannot tessellate alone ($360/135 = 2.\dot{6} \notin \mathbb{Z}$).
5. **Sixth Interior Angle:** $120^\circ$

---

### 4. Common Examiner Traps

* **Assuming All Regular Polygons Tessellate:** Believing regular pentagons or octagons tile a plane without gaps.
* **Using $360^\circ$ for Interior Sum:** Confusing exterior angle sum ($360^\circ$) with interior angle sum ($(n-2) \times 180^\circ$).
* **Miscounting Polygon Sides:** Counting vertices incorrectly in complex irregular shapes.
