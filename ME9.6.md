# Topic: ME9.6 Scatter Diagrams & Correlation

Bivariate linear relationships are modeled on scatter diagrams by calculating the mean point $(\bar{x}, \bar{y}) = \left(\frac{\sum x}{n}, \frac{\sum y}{n}\right)$, which serves as a required anchor point for the line of best fit.

---

### 1. Scatter Plot Rules & Anchor Metrics

| Statistic / Feature | Mathematical Formula | Construction Requirement | Analytic Role |
| --- | --- | --- | --- |
| **Mean $x$-value ($\bar{x}$)** | $\bar{x} = \frac{\sum x}{n}$ | Average of all horizontal coordinates | Horizontal component of mean point |
| **Mean $y$-value ($\bar{y}$)** | $\bar{y} = \frac{\sum y}{n}$ | Average of all vertical coordinates | Vertical component of mean point |
| **Mean Point $(\bar{x}, \bar{y})$** | $(\bar{x}, \bar{y})$ | MUST be plotted on graph with an 'X' or circled dot | Anchor point: line of best fit MUST pass through it |
| **Line Gradient ($m$)** | $m = \frac{y_2 - y_1}{x_2 - x_1}$ | Slope calculated using two points on line | Rate of change ratio |

---

### 2. Anatomy of Line of Best Fit Anchored at Mean Point

```
   y ^
     |               *             Line of Best Fit: y = mx + c
     |          *   /  *
     |            /
     |          (x_bar, y_bar)  <-- MEAN POINT ANCHOR
     |        /   *
     |   *   /  *
     |     *
     +-----------------------------------> x
```

* **Mean Point Requirement:** In extended IGCSE mark schemes, the line of best fit MUST pass directly through the plotted mean point $(\bar{x}, \bar{y})$.
* **Gradient Calculation:** Select two distinct points on the line far apart to calculate $m = \frac{\Delta y}{\Delta x}$.
* **Interpolation Reliability:** Predictions using $y = mx + c$ are reliable inside the data domain $[x_{\min}, x_{\max}]$.

$$\bar{x} = \frac{\sum x}{n}, \quad \bar{y} = \frac{\sum y}{n} \implies \text{Line passes through } (\bar{x}, \bar{y})$$

---

### 3. Worked Example

> **Question:**
> A set of $5$ paired measurements $(x, y)$ are recorded:
> $(2, 4), (4, 7), (6, 9), (8, 12), (10, 13)$.
> 1. Calculate the mean point $(\bar{x}, \bar{y})$.
> 2. Find the equation of the line of best fit in the form $y = mx + c$, given that it passes through the mean point and point $(2, 4)$.

**Step 1: Compute mean coordinates $\bar{x}$ and $\bar{y}$**

1. Calculate mean of $x$-values:

$$\bar{x} = \frac{2 + 4 + 6 + 8 + 10}{5} = \frac{30}{5} = 6$$

2. Calculate mean of $y$-values:

$$\bar{y} = \frac{4 + 7 + 9 + 12 + 13}{5} = \frac{45}{5} = 9$$

3. Form mean point: $(\bar{x}, \bar{y}) = (6, 9)$.

**Step 2: Determine line equation $y = mx + c$**

1. Calculate gradient $m$ using point $(2, 4)$ and mean point $(6, 9)$:

$$m = \frac{9 - 4}{6 - 2} = \frac{5}{4} = 1.25$$

2. Substitute $m = 1.25$ and mean point $(6, 9)$ into $y = mx + c$ to solve for $c$:

$$9 = 1.25(6) + c \implies 9 = 7.5 + c \implies c = 1.5$$

3. Write full equation:

$$y = 1.25x + 1.5$$

4. **Key result 1:** Mean point $(\bar{x}, \bar{y}) = (6, 9)$.
5. **Key result 2:** Line equation is $y = 1.25x + 1.5$.

---

### 4. Common Examiner Traps

* **Missing the Mean Point Anchor:** Drawing a line of best fit that does not pass through the plotted mean point $(\bar{x}, \bar{y})$.
* **Miscalculating Mean Coordinates:** Summing values incorrectly or dividing by the wrong $n$.
* **Confusing Correlation with Slope:** Stating that a line with a steep slope has "more correlation" than a line with a gentle slope. Strength of correlation depends on how closely points cluster around the line!

---
