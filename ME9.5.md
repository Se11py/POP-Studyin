# Topic: ME9.5 Histograms with Unequal Widths

Histograms represent continuous grouped distributions with unequal class widths $w = b - a$, where vertical height is Frequency Density $\text{FD} = \frac{\text{Frequency } f}{\text{Class Width } w}$ and bar area represents frequency $f = \text{FD} \times w$.

---

### 1. Histogram Formulas & Key Features

| Parameter | Formula | Physical Meaning | Axis Assignment |
| --- | --- | --- | --- |
| **Class Width ($w$)** | $w = \text{Upper bound } b - \text{Lower bound } a$ | Base width of rectangle | Horizontal $x$-axis interval |
| **Frequency Density (FD)** | $\text{FD} = \frac{\text{Frequency } f}{\text{Class Width } w}$ | Height of rectangle | Vertical $y$-axis scale |
| **Frequency ($f$)** | $f = \text{FD} \times w = \text{Area of bar}$ | Area of rectangle | Represented by BAR AREA |
| **Sub-interval Count** | $f_{\text{sub}} = \text{FD} \times w_{\text{sub}}$ | Partial area of bar | Area over partial interval |

---

### 2. Anatomy of a Histogram (Frequency Density vs $x$)

```
  Frequency Density (FD) ^
                      6  +          +-------+
                         |          | Area  |  f = FD * w = 6 * 10 = 60
                      4  +  +----+  | = 60  |
                         |  | f=40  |       |  +------------+
                      2  +  |w=10|  | w=10  |  | Area = 40  | (w = 20, FD = 2)
                         |  |    |  |       |  |            |
                      0  +--+----+--+-------+--+------------+---> x
                         0  10   20 20      30 30           50
```

* **No Gaps Between Bars:** Bars are adjacent because continuous data covers all intervals seamlessly.
* **Area Proportional to Frequency:** Doubling class width doubles base; to keep area proportional to count, height must be Frequency Density.
* **Partial Area Calculation:** To estimate frequency between $x_1$ and $x_2$, calculate $\text{Area} = \text{FD} \times (x_2 - x_1)$.

$$\text{FD} = \frac{f}{w} \quad \text{and} \quad \text{Frequency } f = \text{Area} = \text{FD} \times w$$

---

### 3. Worked Example

> **Question:**
> The table shows the time $t$ (minutes) taken by $70$ people to complete a race:
>
> | Time ($t$ min) | $0 < t \le 10$ | $10 < t \le 20$ | $20 < t \le 35$ | $35 < t \le 55$ |
> | --- | --- | --- | --- | --- |
> | **Frequency ($f$)** | $20$ | $25$ | $15$ | $10$ |
>
> 1. Calculate the frequency density for each class interval.
> 2. Estimate the number of people who took between $15$ and $30$ minutes.

**Step 1: Calculate class widths ($w$) and frequency densities ($\text{FD} = \frac{f}{w}$)**

1. Interval $0 < t \le 10$: $w_1 = 10 - 0 = 10 \implies \text{FD}_1 = \frac{20}{10} = 2.0$

2. Interval $10 < t \le 20$: $w_2 = 20 - 10 = 10 \implies \text{FD}_2 = \frac{25}{10} = 2.5$

3. Interval $20 < t \le 35$: $w_3 = 35 - 20 = 15 \implies \text{FD}_3 = \frac{15}{15} = 1.0$

4. Interval $35 < t \le 55$: $w_4 = 55 - 35 = 20 \implies \text{FD}_4 = \frac{10}{20} = 0.5$

**Step 2: Calculate partial area for interval $15 \le t \le 30$**

1. Sub-interval 1 ($15 \le t \le 20$): width $= 20 - 15 = 5$, $\text{FD} = 2.5$:

$$f_{\text{part1}} = 5 \times 2.5 = 12.5$$

2. Sub-interval 2 ($20 \le t \le 30$): width $= 30 - 20 = 10$, $\text{FD} = 1.0$:

$$f_{\text{part2}} = 10 \times 1.0 = 10.0$$

3. Total estimated count $= 12.5 + 10.0 = 22.5 \approx 22 \text{ or } 23 \text{ people}$.

4. **Key result 1:** Frequency Densities are $2.0, 2.5, 1.0, 0.5$.
5. **Key result 2:** Estimated number of people taking between $15$ and $30$ minutes is $22.5$.

---

### 4. Common Examiner Traps

* **Plotting Frequency on $y$-axis:** Labeling the vertical axis "Frequency" instead of "Frequency Density" when class widths are unequal.
* **Incorrect Class Width Calculation:** Miscalculating interval width $w$ when boundaries change step size (e.g. calculating $20 < t \le 35$ as $10$ instead of $15$).
* **Treating Bar Heights as Frequency:** Assuming the tallest bar always contains the most data points; a wide bar with lower height can have a larger total frequency!

---
