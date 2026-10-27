# Topic: MC4.4 Symmetry

Geometric symmetry characterizes the reflectional and rotational invariance of 2D shapes, defined by the number of mirror lines of symmetry and the order $n$ of rotational symmetry around a center point.

---

### 1. Shape Symmetry Breakdown

| 2D Shape | Lines of Reflection Symmetry | Order of Rotational Symmetry |
| --- | --- | --- |
| Rectangle (non-square) | 2 (vertical & horizontal bisectors) | 2 |
| Square | 4 (2 bisectors + 2 diagonals) | 4 |
| Isosceles Triangle | 1 (bisector of vertex angle) | 1 (no rotational symmetry) |
| Equilateral Triangle | 3 (angle bisectors / medians) | 3 |
| Regular $n$-sided Polygon | $n$ | $n$ |
| Circle | Infinite ($\infty$) | Infinite ($\infty$) |

---

### 2. Geometry & ASCII Diagram

```
         | Vertical Axis
         v
    +----+----+ 
    |    |    |  <-- Horizontal Axis
    +----+----+
    /         \
  Diagonal Axes
```

* **Line of Symmetry:** A line along which a shape can be folded so that both halves match perfectly.
* **Order of Rotational Symmetry:** The number of times a shape fits onto its original outline during a complete $360^\circ$ turn.
* **Angle of Rotation:** The minimum angle through which a shape must be rotated to look unchanged: $\theta = \frac{360^\circ}{n}$.

$$\text{Angle of Rotation } \theta = \frac{360^\circ}{n}$$

---

### 3. Worked Example

> **Question:**
> 1. State the number of lines of symmetry and the order of rotational symmetry for a regular hexagon.
> 2. Calculate the smallest angle of rotation that maps a regular hexagon onto itself.

**Step 1: Determine Symmetry Properties of Regular Hexagon ($n = 6$)**

1. Apply regular polygon rule for lines of symmetry:

$$\text{Lines of symmetry} = n = 6$$

2. Apply regular polygon rule for order of rotational symmetry:

$$\text{Order of rotational symmetry} = n = 6$$

**Step 2: Calculate Smallest Angle of Rotation**

1. Substitute order $n = 6$ into rotation formula:

$$\theta = \frac{360^\circ}{n} = \frac{360^\circ}{6} = 60^\circ$$

2. **Lines of Symmetry:** $6$
3. **Order of Rotational Symmetry & Smallest Angle:** Order $6$; Smallest angle is $60^\circ$

---

### 4. Common Examiner Traps

* **Diagonals in Rectangles:** Counting diagonals of a non-square rectangle as lines of symmetry (folding along a rectangle diagonal does not match edges).
* **Stating Order 0:** Stating that a shape with no rotational symmetry has "order 0" instead of the correct term "order 1".
* **Parallelogram Confusion:** Assuming a non-rhombus parallelogram has lines of symmetry (it has 0 lines of symmetry, but order 2 rotational symmetry).
