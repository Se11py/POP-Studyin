# Topic: ME9.3 Cumulative Frequency Diagrams

Cumulative frequency curves plot running total frequencies $\sum f$ against upper class boundaries to form an S-shaped curve (ogive) that estimates median $Q_2$ ($50\%$), quartiles $Q_1$ ($25\%$), $Q_3$ ($75\%$), and percentiles.

---

### 1. Cumulative Frequency Plotting & Reading Rules

| Feature / Goal | Axis / Plotting Rule | Projection Method | Calculation / Meaning |
| --- | --- | --- | --- |
| **Plotting Coordinates** | $(\text{Upper Class Boundary}, \text{Cumulative Frequency})$ | Plot at UPPER bound of interval | Never plot at midpoints! |
| **Median ($Q_2$)** | Horizontal line at $\text{CF} = 0.50 N$ | Project right to curve, then DOWN to $x$-axis | $50^{\text{th}}$ percentile |
| **Lower Quartile ($Q_1$)** | Horizontal line at $\text{CF} = 0.25 N$ | Project right to curve, then DOWN to $x$-axis | $25^{\text{th}}$ percentile |
| **Upper Quartile ($Q_3$)** | Horizontal line at $\text{CF} = 0.75 N$ | Project right to curve, then DOWN to $x$-axis | $75^{\text{th}}$ percentile |
| **Interquartile Range** | $\text{IQR} = Q_3 - Q_1$ | Subtract horizontal values | Spread of middle $50\%$ |

---

### 2. Anatomy of a Cumulative Frequency Curve

```
   Cum Freq (CF) ^
              N  +------------------------------------* (Max Bound, N)
                 |                                  /
         0.75 N  + - - - - - - - - - - - - - - *   /  Q3 Projection
                 |                           / |  |
         0.50 N  + - - - - - - - - - - *    /  |  |   Q2 Projection (Median)
                 |                   / |   |   |  |
         0.25 N  + - - - - - - *    /  |   |   |  |   Q1 Projection
                 |           / |   |   |   |   |  |
              0  +----------*--+---+---+---+---+--+---> Data Value x
                 0         L   Q1  Q2  Q3  Max
```

* **Upper Boundary Rule:** Always plot cumulative frequency at upper class boundaries (e.g. for $10 < x \le 20$, plot at $x = 20$).
* **Start at Zero:** Curve begins at lower boundary of first class interval with $\text{CF} = 0$.
* **Reading Above Threshold:** To find items $> k$, read CF value $y$ at $x = k$; count above threshold $= N - y$.

$$\text{Median } Q_2 = x \text{ value at } \text{CF} = \frac{N}{2} \quad \text{and} \quad \text{IQR} = Q_3 - Q_1$$

---

### 3. Worked Example

> **Question:**
> The table shows the distribution of test scores for $80$ students:
>
> | Score ($x$) | $0 < x \le 20$ | $20 < x \le 40$ | $40 < x \le 60$ | $60 < x \le 80$ | $80 < x \le 100$ |
> | --- | --- | --- | --- | --- | --- |
> | **Frequency ($f$)** | $8$ | $16$ | $30$ | $18$ | $8$ |
>
> 1. Construct a cumulative frequency table.
> 2. Use the cumulative values to estimate the median, IQR, and the number of students scoring more than $70$.

**Step 1: Construct running total cumulative frequency table**

1. Accumulate frequencies at upper class boundaries:
   - $x \le 20 \implies \text{CF} = 8$
   - $x \le 40 \implies \text{CF} = 8 + 16 = 24$
   - $x \le 60 \implies \text{CF} = 24 + 30 = 54$
   - $x \le 80 \implies \text{CF} = 54 + 18 = 72$
   - $x \le 100 \implies \text{CF} = 72 + 8 = 80$

2. Plot points $(20, 8)$, $(40, 24)$, $(60, 54)$, $(80, 72)$, $(100, 80)$ and start at $(0, 0)$.

**Step 2: Read median, quartiles, and threshold count**

1. Locate Median $Q_2$ at $\text{CF} = \frac{80}{2} = 40$:
   - Projecting across from $\text{CF} = 40$ to linear interpolation between $(40, 24)$ and $(60, 54)$:

$$Q_2 \approx 40 + \frac{40 - 24}{54 - 24} \times 20 = 40 + \frac{16}{30} \times 20 \approx 50.7$$

2. Locate $Q_1$ ($\text{CF} = 20$) and $Q_3$ ($\text{CF} = 60$):
   - $Q_1 \approx 35$, $Q_3 \approx 66.7$
   - $\text{IQR} = Q_3 - Q_1 = 66.7 - 35 = 31.7$

3. Find number of students scoring $> 70$:
   - Read CF at $x = 70 \implies \text{CF} \approx 63$ students scoring $\le 70$.
   - Students scoring $> 70 = 80 - 63 = 17$.

4. **Key result 1:** Cumulative frequencies are $8, 24, 54, 72, 80$.
5. **Key result 2:** Estimated Median $\approx 50.7$, $\text{IQR} \approx 31.7$, and $17$ students score $> 70$.

---

### 4. Common Examiner Traps

* **Plotting at Midpoints:** Plotting cumulative frequency points at interval midpoints instead of UPPER boundaries.
* **Misreading "Greater Than" Questions:** Forgetting to subtract CF reading from total $N$ when asked for students scoring MORE than a value.
* **Incorrect Axis Scale Reading:** Miscounting grid subdivisions when projecting horizontal lines from $\text{CF} = 0.5N$ or $0.75N$.

---
