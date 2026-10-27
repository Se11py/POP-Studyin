# MC5.2 Perimeter & Area of 2D Polygons | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")

Every 2D polygon has two fundamental geometric measurements:
* **Perimeter:** The total continuous length of the outer boundary enclosing a 2D shape. Imagine walking around the border of a field—the total distance walked is the perimeter.
* **Area:** The total amount of 2D surface space contained within the boundary lines, measured in square units ($\text{cm}^2$, $\text{m}^2$).

Calculating perimeter requires adding all outer boundary side lengths together. Calculating area involves multiplying linear dimensions using formulas specific to the geometry of the polygon.

---

## 2. Key Definitions, Principles & Formulas

### Rectangle & Square
$$\text{Perimeter} = 2l + 2w = 2(l + w)$$
$$\text{Area} = l \times w$$
where $l$ is the length and $w$ is the width.

### Triangle
$$\text{Perimeter} = a + b + c$$
$$\text{Area} = \frac{1}{2} \times b \times h$$
where $b$ is the base length and $h$ is the **perpendicular height** (at $90^\circ$ to the base).

### Parallelogram
$$\text{Perimeter} = 2(a + b)$$
$$\text{Area} = b \times h$$
where $b$ is the base length and $h$ is the **perpendicular height**.

### Trapezium
$$\text{Area} = \frac{1}{2}(a + b)h$$
where $a$ and $b$ are the lengths of the two **parallel sides**, and $h$ is the **perpendicular distance** between them.

```
       a
   +-------+
  / |       \
 /  | h      \
+---+---------+
       b
```

> 💡 **Exam Tip**: Always check that height $h$ forms a right angle ($90^\circ$) with the base $b$. Never use a slanted side length as the height when calculating the area of a triangle, parallelogram, or trapezium!

---

## 3. Step-by-Step Method & Worked Exam Demonstration

### Step-by-Step Method for Compound Shapes
1. **Divide or Enclose:** Split complex compound shapes into basic standard polygons (rectangles, triangles, trapeziums) or enclose the entire shape in a larger rectangle and subtract missing parts.
2. **Find Missing Lengths:** Calculate any unknown side lengths using known parallel segment differences.
3. **Calculate Individual Areas:** Apply standard area formulas for each component polygon.
4. **Sum or Subtract:** Add individual areas together to find total area.

---

### Worked Exam Question

The diagram shows a trapezium $ABCD$ joined to a rectangle $ADEF$ to form a composite floor plate $ABCDEF$.

* $AB = 8\text{ cm}$
* $DC = 14\text{ cm}$
* Perpendicular height of trapezium $ABCD$ is $h = 6\text{ cm}$
* Rectangle length $DE = 14\text{ cm}$ and width $EF = 5\text{ cm}$

```
       AB = 8 cm
    +--------------+
   / |              \
  /  | h = 6 cm      \
 /   |                \
+----+-----------------+  DC = 14 cm
|    A                D|
|                      |
|                      |  DE = 14 cm, EF = 5 cm
+----------------------+
F                      E
```

**(a)** Calculate the total area of the composite shape $ABCDEF$.

**(b)** Given that the outer sloping sides $BC = 7.2\text{ cm}$ and $AF = 5\text{ cm}$, calculate the perimeter of the entire composite shape $ABCDEF$.

#### Solution:

**(a) Calculating Total Area:**

1. Calculate Area of Trapezium $ABCD$:
   $$\text{Area}_{\text{trapezium}} = \frac{1}{2}(a + b)h = \frac{1}{2}(8 + 14) \times 6$$
   $$\text{Area}_{\text{trapezium}} = \frac{1}{2}(22) \times 6 = 11 \times 6 = 66\text{ cm}^2$$

2. Calculate Area of Rectangle $ADEF$:
   $$\text{Area}_{\text{rectangle}} = l \times w = 14 \times 5 = 70\text{ cm}^2$$

3. Sum the component areas:
   $$\text{Total Area} = 66 + 70 = 136\text{ cm}^2$$

**(b) Calculating Composite Perimeter:**

1. Identify outer boundary segments only ($AB$, $BC$, $CE$, $EF$, $FA$):
   * $AB = 8\text{ cm}$
   * $BC = 7.2\text{ cm}$
   * $CE = EF = 5\text{ cm}$ (since $DE = 14\text{ cm}$ is an internal line segment, $CE$ forms the right boundary wall equal to $EF = 5\text{ cm}$)
   * $EF = 14\text{ cm}$ (bottom edge)
   * $FA = 5\text{ cm}$ (left edge of rectangle)

2. Sum outer sides:
   $$\text{Perimeter} = AB + BC + CE + EF + FA$$
   $$\text{Perimeter} = 8 + 7.2 + 5 + 14 + 5 = 39.2\text{ cm}$$

---

## 4. Common Misconceptions & Diagnostic Exam Pitfalls

> ⚠️ **Common Misconception**: Including internal shared edge lengths when calculating the perimeter of compound shapes.
* **Incorrect:** Adding internal boundary line $AD = 14\text{ cm}$ into the perimeter equation. ❌
* **Correct:** Only sum lengths along the outer envelope of the shape! ✅

> ⚠️ **Common Misconception**: Confusing base $b$ and slant height $s$ in triangle and trapezium calculations.
* **Incorrect:** $\text{Area of Triangle} = \frac{1}{2} \times 10 \times 8.5$ using sloping length $8.5\text{ cm}$. ❌
* **Correct:** Always drop a perpendicular line to identify vertical height $h$. ✅

---

## 5. Key Terms & Revision Summary

| Polygon | Area Formula | Perimeter Formula |
| :--- | :--- | :--- |
| **Rectangle** | $\text{Area} = l \times w$ | $\text{Perimeter} = 2(l + w)$ |
| **Triangle** | $\text{Area} = \frac{1}{2}bh$ | $\text{Perimeter} = a + b + c$ |
| **Parallelogram** | $\text{Area} = bh$ | $\text{Perimeter} = 2(a + b)$ |
| **Trapezium** | $\text{Area} = \frac{1}{2}(a + b)h$ | Sum of 4 outer boundary edges |
| **Compound Shape** | $\text{Sum of sub-areas}$ | Sum of outer perimeter edges only |
