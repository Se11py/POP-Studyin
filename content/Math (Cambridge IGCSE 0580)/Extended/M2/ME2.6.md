# ME2.6 Inequalities & Regions | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Graphical inequalities represent two-dimensional regions on a Cartesian plane where multiple spatial constraints are satisfied simultaneously. A single linear inequality in two variables (such as $y \leqslant 2x + 3$) divides the entire $xy$-plane into two half-planes separated by a boundary line.

Think of a 2D inequality region like a fenced yard. The boundary line acts as the fence line: solid if points on the fence are included ($\leqslant$ or $\geqslant$), dashed if excluded ($<$ or $>$). By testing a sample coordinate point (like $(0,0)$), you determine which side of the fence is the valid region ($R$) and shade out the unwanted side.

## 2. Key Definitions, Principles & Formulas
- **Boundary Line Types**:
  - **Solid Line ($\text{---}$)**: Used for inclusive inequalities ($\leqslant$ or $\geqslant$). Points on the line are included.
  - **Dashed Line ($\dots$)**: Used for strict inequalities ($<$ or $>$). Points on the line are excluded.
- **Convention for Unwanted Region Shading**:
  - Cambridge IGCSE exam questions usually request candidates to **shade the UNWANTED region**, leaving the required region $R$ unshaded (clear).
- **Test Point Method**: Choose a simple coordinate point not on the line (usually $(0,0)$), substitute its values into the inequality:
  - If true: the region containing $(0,0)$ satisfies the inequality.
  - If false: the opposite side satisfies the inequality.

> 💡 **Exam Tip**: Always read the question carefully to see whether you must shade the WANTED region or the UNWANTED region. Cambridge 0580 standard practice is to leave the target region $R$ UNSHADED.

> ⚠️ **Common Misconception**: Drawing a solid line for strict inequalities ($<$ or $>$) loses marks. Double check whether boundary lines should be dashed or solid before drawing!

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Identifying and Constructing Graphical Regions
Find the three linear inequalities that define the unshaded region $R$ bounded by:
- A vertical line passing through $x = 1$.
- A horizontal line passing through $y = 2$.
- A sloped line passing through $(0, 6)$ and $(3, 0)$.

Region $R$ lies to the right of $x = 1$, above $y = 2$, and below the sloped boundary line. All boundaries are solid lines.

#### Solution:
- **Step 1: Determine the inequality for the vertical boundary.**
  The line equation is $x = 1$. Region $R$ lies to the right ($x \geqslant 1$). Since the boundary is solid:
  $$x \geqslant 1$$
- **Step 2: Determine the inequality for the horizontal boundary.**
  The line equation is $y = 2$. Region $R$ lies above ($y \geqslant 2$). Since the boundary is solid:
  $$y \geqslant 2$$
- **Step 3: Find the equation of the sloped boundary line.**
  $$\text{Gradient } m = \frac{0 - 6}{3 - 0} = \frac{-6}{3} = -2$$
  $$y\text{-intercept } c = 6 \implies \text{Line equation: } y = -2x + 6 \quad \text{or} \quad 2x + y = 6$$
- **Step 4: Determine the inequality direction for the sloped boundary.**
  Test point $(1, 2)$ inside region $R$:
  $$2(1) + (2) = 4 \leqslant 6 \quad \text{(True)}$$
  Since region $R$ lies below the solid sloped line:
  $$y \leqslant -2x + 6 \quad \text{or} \quad 2x + y \leqslant 6$$
- **Step 5: State the final system of 3 inequalities defining region $R$.**
  $$x \geqslant 1, \quad y \geqslant 2, \quad 2x + y \leqslant 6$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Shading the Wrong Side**: Shading the wanted region instead of the unwanted region (or vice versa). Always verify with a test point like $(0,0)$.
- **Reversing Inequality Direction**: Confusing $y \geqslant 2x + 1$ (above the line) with $y \leqslant 2x + 1$ (below the line).
- **Line Style Inaccuracy**: Drawing continuous solid lines for strict inequalities ($<$ or $>$) instead of broken dashed lines.

## 5. Key Terms & Revision Summary
| Symbol | Line Style | Region Direction | Test Point Strategy |
| :--- | :--- | :--- | :--- |
| **$y > mx + c$** | Dashed | Above line | Test $(0,0)$: If true, region includes $(0,0)$ |
| **$y \geqslant mx + c$** | Solid | Above line & on line | Test $(0,0)$: If false, region is opposite side |
| **$y < mx + c$** | Dashed | Below line | Check boundary inclusion |
| **$y \leqslant mx + c$** | Solid | Below line & on line | Leave region $R$ unshaded |
