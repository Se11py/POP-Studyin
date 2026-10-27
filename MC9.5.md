# Topic: MC9.5 Scatter Graphs & Correlation

Scatter graphs plot paired bivariate quantitative observations $(x, y)$ on a coordinate plane to visually detect linear correlation (positive, negative, or zero) and make predictions using a line of best fit.

---

### 1. Correlation Classifications & Features

| Correlation Type | Trend Description | Variable Relationship | Example |
| --- | --- | --- | --- |
| **Positive Correlation** | Points slope upward left-to-right | As $x$ increases, $y$ increases | Revision hours vs Exam score |
| **Negative Correlation** | Points slope downward left-to-right | As $x$ increases, $y$ decreases | Car age vs Market value |
| **Zero / No Correlation** | Points scattered randomly | No linear relationship | Height vs Test score |
| **Line of Best Fit** | Straight line passing balanced through points | Equal number of points above and below | Estimation tool |

---

### 2. Scatter Plots & Correlation Patterns

```
   POSITIVE CORRELATION       NEGATIVE CORRELATION       ZERO CORRELATION
    y ^                        y ^                        y ^
      |       *  /               |  *                       |  *   *
      |     *   /                |    \  *                  |    *    *
      |   *    /                 |      \   *               |  *    *
      | *     /                  |        \   *             |    *   *
      +-------------> x          +-------------> x          +-------------> x
```

* **Line of Best Fit Placement:** Must follow general linear trend, extending across plotted points with roughly equal points above/below line.
* **Interpolation:** Estimating $y$ values WITHIN the range of plotted $x$ data (reliable).
* **Extrapolation:** Estimating $y$ values OUTSIDE the range of plotted $x$ data (unreliable).

$$\text{As } x \uparrow, y \uparrow \text{ (Positive)} \quad \text{vs} \quad \text{As } x \uparrow, y \downarrow \text{ (Negative)}$$

---

### 3. Worked Example

> **Question:**
> A teacher records the study time $x$ (hours) and test mark $y$ (%) for $8$ students:
>
> | Student | A | B | C | D | E | F | G | H |
> | --- | --- | --- | --- | --- | --- | --- | --- | --- |
> | **Study Time ($x$)** | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
> | **Test Mark ($y$)** | $40$ | $45$ | $55$ | $60$ | $70$ | $75$ | $85$ | $90$ |
>
> 1. Describe the correlation between study time and test mark.
> 2. Using line of best fit equation $y = 7.5x + 32$, estimate the test mark for a student studying $4.5$ hours.

**Step 1: Identify correlation type from data trend**

1. Observe relationship between variables: as study time $x$ increases ($1 \to 8$), test mark $y$ increases ($40 \to 90$).

2. Classify correlation:

$$\text{Correlation} = \text{Strong Positive Correlation}$$

**Step 2: Apply linear model to estimate test mark**

1. Substitute $x = 4.5$ into line of best fit model $y = 7.5x + 32$:

$$y = 7.5(4.5) + 32$$

2. Evaluate product and sum:

$$y = 33.75 + 32 = 65.75$$

3. Round to reasonable accuracy (nearest integer):

$$y \approx 66\%$$

4. **Key result 1:** The graph shows **strong positive correlation**.
5. **Key result 2:** Estimated test mark for $4.5$ hours of study is $66\%$.

---

### 4. Common Examiner Traps

* **Drawing Line of Best Fit Through Origin Automatically:** Forcing the line through $(0,0)$ when data points do not extend to the origin.
* **Extrapolating Beyond Data Range:** Predicting outcomes far beyond given values (e.g. estimating mark for 30 hours of study) without noting unreliability.
* **Confusing Correlation with Causation:** Assuming a statistical correlation guarantees one variable directly causes the other.

---
