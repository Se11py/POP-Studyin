# Topic: MC3.4 Equation of a Straight Line (y = mx + c)

The linear equation $y = mx + c$ expresses the functional relationship between horizontal position $x$ and vertical position $y$ for any straight line, governed by its gradient $m$ and $y$-intercept $c$.

---

### 1. Line Equation Parameter Breakdown

| Component | Symbol / Form | Definition / Graphical Meaning |
| --- | --- | --- |
| Gradient | $m$ | Steepness of line ($m = \frac{y_2 - y_1}{x_2 - x_1}$). |
| $y$-intercept | $c$ or $(0, c)$ | Point where the line crosses the vertical $y$-axis ($x=0$). |
| $x$-intercept | $\left(-\frac{c}{m}, 0\right)$ | Point where the line crosses the horizontal $x$-axis ($y=0$). |

---

### 2. Geometry & ASCII Diagram

```
         y ^
           |        /  y = mx + c
           |       /
           |      /|  rise = m
           | (0,c)/+---- run = 1
           |   * /
  ---------+----+------------------> x
           |   / (-c/m, 0)
           |  /
```

* **Gradient Substitution:** $m$ is positive for lines sloping up, negative for lines sloping down.
* **$y$-Intercept Identification:** Substitute $x = 0$ into equation to find $c$.
* **Point-Slope Method:** Given gradient $m$ and point $(x_1, y_1)$, solve $y_1 = m(x_1) + c$ for $c$.

$$y = mx + c$$

---

### 3. Worked Example

> **Question:**
> 1. Find the equation of the straight line with gradient $-3$ passing through the point $P(2, 5)$.
> 2. Find the equation of the straight line passing through points $A(1, 4)$ and $B(5, 12)$. Give your answers in the form $y = mx + c$.

**Step 1: Determine Equation with Gradient and One Point**

1. Substitute $m = -3$ and point $(x=2, y=5)$ into $y = mx + c$:

$$5 = (-3)(2) + c$$

2. Solve for intercept $c$:

$$5 = -6 + c \implies c = 11$$

**Step 2: Determine Equation Passing Through Two Points**

1. Calculate gradient $m$ using $A(1, 4)$ and $B(5, 12)$:

$$m = \frac{12 - 4}{5 - 1} = \frac{8}{4} = 2$$

2. Substitute $m = 2$ and point $A(1, 4)$ into $y = mx + c$ to find $c$:

$$4 = (2)(1) + c \implies 4 = 2 + c \implies c = 2$$

3. **Line 1 Equation:** $y = -3x + 11$
4. **Line 2 Equation:** $y = 2x + 2$

---

### 4. Common Examiner Traps

* **Swapping $m$ and $c$:** Writing $y = cx + m$ by mistake after finding gradient and intercept.
* **Not Rearranging Non-Standard Forms:** Reading gradient incorrectly from equations like $2y = 6x + 4$ before dividing by 2 to get $y = 3x + 2$.
* **Sign Flips when Rearranging:** Making algebraic errors when shifting terms across the equals sign.
