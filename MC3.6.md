# Topic: MC3.6 Interpreting Linear Graphs

Interpreting linear graphs involves linking geometric properties ($m$ and $c$) to real-world variables, where the gradient represents a constant rate of change and the $y$-intercept represents an initial fixed amount.

---

### 1. Graph Feature Interpretation

| Graph Feature | Mathematical Symbol | Physical Real-World Meaning |
| --- | --- | --- |
| $y$-Intercept | $c$ | Initial quantity at time/distance zero (e.g. fixed fee, starting volume). |
| Gradient | $m = \frac{\Delta y}{\Delta x}$ | Rate of change of $y$ per unit of $x$ (e.g. speed, cost per km, flow rate). |
| Intersection Point | $(x, y)$ | Point of break-even, equal cost, or collision. |
| $x$-Intercept | $y=0$ | Threshold when quantity depletes to zero or process terminates. |

---

### 2. Geometry & ASCII Diagram

```
   Cost ($) ^
            |          /  Total Cost C = m*d + c
            |         /|
            |        / |  Variable Cost (m * d)
            |       /  |
          c *------+---|  Fixed Initial Fee
            |      | d |
  ----------+------+------------> Distance d (km)
            0
```

* **Fixed Portion:** $y$-intercept $c$ is constant regardless of horizontal value $x$.
* **Variable Portion:** The slope $m$ multiplies horizontal units $x$ to determine variable growth/reduction.
* **Axis Scales:** Always inspect grid square scale intervals before calculating rise over run.

$$\text{Rate of Change } m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}$$

---

### 3. Worked Example

> **Question:**
> A taxi firm charges a fixed hire fee plus a rate per kilometer traveled. The total cost $C$ ($) for a trip of distance $d$ (km) is shown by a linear graph passing through $(4, 11)$ and $(10, 23)$.
> 1. Calculate the rate per kilometer (gradient).
> 2. Determine the fixed hire fee ($y$-intercept) and state the complete linear equation for $C$ in terms of $d$.

**Step 1: Calculate Variable Rate per Kilometer (Gradient $m$)**

1. Apply gradient formula using $(d_1, C_1) = (4, 11)$ and $(d_2, C_2) = (10, 23)$:

$$m = \frac{23 - 11}{10 - 4} = \frac{12}{6} = 2$$

2. Interpret result: The variable rate is $\$2$ per kilometer.

**Step 2: Calculate Fixed Hire Fee (Intercept $c$) and Formulate Model**

1. Substitute $m = 2$ and point $(4, 11)$ into $C = md + c$:

$$11 = (2)(4) + c \implies 11 = 8 + c \implies c = 3$$

2. Construct complete linear function:

$$C = 2d + 3$$

3. **Rate per km:** $\$2\text{/km}$
4. **Fixed Fee & Model Equation:** Fixed fee is $\$3$; Equation is $C = 2d + 3$

---

### 4. Common Examiner Traps

* **Misreading Non-Unit Axis Scales:** Counting grid squares instead of calculating true value differences when axes step by 2s, 5s, or 10s.
* **Omitting Units:** Forgetting to state units (e.g. writing $2$ instead of $\$2\text{/km}$ for rate of change).
* **Confusing Independent & Dependent Variables:** Plotting or solving with $x$ and $y$ swapped instead of using context variables (e.g. $d$ and $C$).
