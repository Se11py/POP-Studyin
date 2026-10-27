# Topic: ME3.4 Straight Line Equations (y = mx + c & ax + by = d)

Linear equations express straight lines in equivalent algebraic representations: slope-intercept form $y = mx + c$, point-slope form $y - y_1 = m(x - x_1)$, and general integer form $ax + by = d$.

---

### 1. Linear Equation Forms Breakdown

| Form Name | Algebraic Expression | Primary Advantage / Use Case |
| --- | --- | --- |
| Slope-Intercept Form | $y = mx + c$ | Direct reading of gradient $m$ and $y$-intercept $c$. |
| Point-Slope Form | $y - y_1 = m(x - x_1)$ | Rapid construction when given gradient $m$ and point $(x_1, y_1)$. |
| General Linear Form | $ax + by = d \quad (a, b, d \in \mathbb{Z})$ | Eliminates fractions; handles vertical lines ($b=0$). |

---

### 2. Geometry & ASCII Diagram

```
         y ^
           |        / ax + by = d
           |       /
           |      /|  y - y1 = m(x - x1)
           |     /* P(x1, y1)
           |    / |
           |   /  +---- (x, y)
  ---------+--+---------------------> x
           | /
```

* **Point-Slope Efficiency:** Avoids solving for $c$ separately by directly setting $y - y_1 = m(x - x_1)$.
* **Integer Requirement for General Form:** In $ax + by = d$, $a$, $b$, and $d$ must be integers with no common factor (usually $a \ge 0$).
* **Gradient Extraction from General Form:** Rearrange $ax + by = d \implies by = -ax + d \implies m = -\frac{a}{b}$.

$$y - y_1 = m(x - x_1)$$

---

### 3. Worked Example

> **Question:**
> 1. Find the equation of the line passing through $A(-2, 5)$ with gradient $-\frac{3}{4}$. Give your answer in the form $ax + by = d$ where $a, b, d$ are integers.
> 2. Convert $3x - 5y = 15$ into $y = mx + c$ form, and state its gradient and $y$-intercept.

**Step 1: Construct and Rearrange into General Form $ax + by = d$**

1. Apply point-slope formula with $m = -\frac{3}{4}$ and $(x_1, y_1) = (-2, 5)$:

$$y - 5 = -\frac{3}{4}(x - (-2)) \implies y - 5 = -\frac{3}{4}(x + 2)$$

2. Multiply entire equation by $4$ to clear fractions:

$$4(y - 5) = -3(x + 2) \implies 4y - 20 = -3x - 6$$

3. Rearrange terms to collect $x$ and $y$ on left side ($ax + by = d$):

$$3x + 4y = 20 - 6 \implies 3x + 4y = 14$$

**Step 2: Convert $3x - 5y = 15$ to Slope-Intercept Form**

1. Rearrange to isolate $y$:

$$-5y = -3x + 15 \implies y = \frac{-3}{-5}x + \frac{15}{-5}$$

2. Simplify coefficients:

$$y = \frac{3}{5}x - 3$$

3. **General Form Equation:** $3x + 4y = 14$
4. **Slope-Intercept Form:** $y = \frac{3}{5}x - 3$ (Gradient $m = \frac{3}{5}$, $y$-intercept $c = -3$)

---

### 4. Common Examiner Traps

* **Leaving Fractional Coefficients:** Leaving fractions in $ax + by = d$ form (e.g. $\frac{3}{4}x + y = \frac{7}{2}$) instead of multiplying through by LCM.
* **Expanding Double Negatives Incorrectly:** Writing $x - (-2)$ as $x - 2$ instead of $x + 2$.
* **Sign Flips in Division:** Dividing $-3x + 15$ by $-5$ and getting $+\frac{3}{5}x + 3$ instead of $-3$.
