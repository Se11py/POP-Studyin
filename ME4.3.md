# Topic: ME4.3 Geometric Construction & Loci

A locus is the geometric path or region formed by all points satisfying specified distance constraints relative to fixed points or lines, constructed precisely using compass arcs and straightedge lines.

---

### 1. Fundamental Loci Breakdown

| Locus Description | Geometric Constraint | Construction Method |
| --- | --- | --- |
| Equidistant from Fixed Point $P$ | Distance $= r$ from point $P$ | Circle centered at $P$ with radius $r$. |
| Equidistant from Fixed Line $L$ | Distance $= d$ from line $L$ | Two parallel lines distance $d$ from $L$ with semicircular ends. |
| Equidistant from Two Points $A, B$ | Distance to $A$ = Distance to $B$ | Perpendicular bisector of line segment $AB$. |
| Equidistant from Two Lines $L_1, L_2$ | Angle distance to $L_1$ = Angle distance to $L_2$ | Angle bisector of the intersection angle. |

---

### 2. Geometry & ASCII Diagram

```
       Perpendicular Bisector                Angle Bisector
               Locus                                 / Locus
                 |                                  / 
                 | Arc                             / Arc
          A *----+----* B                   *-----*-----* 
                 |                         Line 1    Line 2
                 | Arc
```

* **Perpendicular Bisector:** Constructed by drawing intersecting compass arcs of equal radius $> \frac{1}{2}AB$ centered at $A$ and $B$.
* **Angle Bisector:** Constructed by swinging an arc across both angle rays from vertex $V$, then drawing intersecting arcs from those ray points.
* **Region Shading:** Inequalities such as $d < r$ mean inside the circle boundary; $d > \text{bisector}$ means on the specified side of the line boundary.

$$d(P, A) = d(P, B) \implies \text{Perpendicular Bisector of } AB$$

---

### 3. Worked Example

> **Question:**
> A scale diagram shows a rectangular garden $ABCD$ of length $8\text{ m}$ and width $6\text{ m}$ ($1\text{ cm} : 1\text{ m}$).
> 1. Describe the locus of points inside the garden that are exactly $3\text{ m}$ from vertex $A$.
> 2. Describe the locus of points inside the garden that are equidistant from side $AB$ and side $AD$.
> 3. Identify the region containing points closer to $A$ than $3\text{ m}$ AND closer to $AB$ than $AD$.

**Step 1: Construct Locus 1 (Distance from Point $A$)**

1. Apply fixed point locus rule:

$$\text{Locus 1 is a quarter-circle inside } ABCD \text{ centered at } A \text{ with radius } 3\text{ cm}$$

**Step 2: Construct Locus 2 (Equidistant from Lines $AB$ and $AD$)**

1. Apply angle bisector rule for intersecting lines $AB$ and $AD$:

$$\text{Locus 2 is the angle bisector of right angle } \angle DAB \text{ (a line at } 45^\circ \text{ from } A \text{ to } C)$$

**Step 3: Define Shaded Region**

1. Combine inequality conditions:

$$\text{Region lies INSIDE the quarter-circle of radius } 3\text{ cm AND BELOW the } 45^\circ \text{ angle bisector (closer to } AB\text{)}$$

2. **Locus 1:** Arc of circle, radius $3\text{ cm}$, center $A$.
3. **Locus 2:** Angle bisector of $\angle DAB$ ($45^\circ$ line through $A$).
4. **Shaded Region:** Area enclosed under the $45^\circ$ line within the $3\text{ cm}$ arc.

---

### 4. Common Examiner Traps

* **Rubbing Out Construction Arcs:** Erasing compass arcs (examiners require visible arcs to award full construction marks).
* **Using a Protractor / Ruler Only:** Drawing angle bisectors or perpendicular bisectors by measurement without compass arcs.
* **Shading Wrong Boundary Region:** Shading outside an arc or on the incorrect side of a bisector line.
