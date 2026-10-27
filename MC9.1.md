# Topic: MC9.1 Classifying Data & Statistical Charts

Data is categorized as qualitative (non-numerical descriptive) or quantitative (numerical), where quantitative data is discrete (countable) or continuous (measurable), and represented graphically via pie charts using sector angle $\theta = \frac{f}{N} \times 360^\circ$.

---

### 1. Data Classification & Statistical Charts

| Data Type / Chart | Characteristic / Definition | Example | Graphical Feature |
| --- | --- | --- | --- |
| **Qualitative Data** | Non-numerical categories or labels | Eye color, preferred car brand | Bar charts with gaps |
| **Discrete Quantitative** | Numerical values obtained by counting | Number of pets, shoe sizes | Separate isolated bars |
| **Continuous Quantitative** | Numerical values obtained by measuring | Height (cm), time (s), mass (kg) | Continuous scale, no gap histograms |
| **Pie Chart** | Circular chart divided into sectors | Frequency distribution breakdown | Sector angle $\theta = \frac{f}{N} \times 360^\circ$ |

---

### 2. Anatomy of Pie Chart & Categorical Bar Chart

```
        PIE CHART SECTORS                  BAR CHART (DISCRETE)
            /---------\                     Freq ^
           /   A       \                         |   +---+     +---+
          |  (120 deg)  |                        |   |   |     |   |
          |--------+----|                        |   |   | +---+   |
           \   B  / C  /                         |   |   | |   |   |
            \----+----/                          +---+---+-+---+---+---> Category
                                                     Cat A Cat B Cat C
```

* **Pie Chart Sector Angle:** Sector angle $\theta$ is directly proportional to frequency $f$: $\theta = \frac{f}{\sum f} \times 360^\circ$.
* **Bar Chart Gaps:** Leave uniform gaps between bars for qualitative or discrete data categories.
* **Frequency Integrity:** Total sum of pie chart angles MUST equal $360^\circ$.

$$\theta = \frac{f}{N} \times 360^\circ$$

---

### 3. Worked Example

> **Question:**
> A survey recorded the favorite sports of $60$ students: Football ($25$), Tennis ($15$), Swimming ($12$), and Running ($8$).
> 1. Calculate the sector angle for Football and Tennis in a pie chart.
> 2. If a pie chart sector for Rugby has an angle of $54^\circ$ in a different survey of $120$ people, find how many people chose Rugby.

**Step 1: Calculate pie chart sector angles for survey data**

1. Identify total frequency $N = 60$.

2. Calculate angle for Football ($f = 25$):

$$\theta_{\text{Football}} = \frac{25}{60} \times 360^\circ = 25 \times 6^\circ = 150^\circ$$

3. Calculate angle for Tennis ($f = 15$):

$$\theta_{\text{Tennis}} = \frac{15}{60} \times 360^\circ = 15 \times 6^\circ = 90^\circ$$

**Step 2: Reverse calculate frequency from sector angle**

1. Use formula $f = \frac{\theta}{360^\circ} \times N$ with $\theta = 54^\circ$ and $N = 120$:

$$f_{\text{Rugby}} = \frac{54^\circ}{360^\circ} \times 120$$

2. Simplify fraction $\frac{54}{360} = \frac{3}{20}$:

$$f_{\text{Rugby}} = \frac{3}{20} \times 120 = 3 \times 6 = 18$$

3. **Key result 1:** Football angle $= 150^\circ$; Tennis angle $= 90^\circ$.
4. **Key result 2:** Number of people who chose Rugby $= 18$.

---

### 4. Common Examiner Traps

* **Confusing Discrete and Continuous Data:** Classifying shoe size as continuous (it is discrete because values increase in jumps of 0.5) or height as discrete.
* **Drawing Bar Charts Without Gaps:** Drawing touching bars for discrete/qualitative data; touching bars are reserved for continuous histogram intervals.
* **Pie Chart Angle Sum Error:** Failing to check that all calculated sector angles sum to exactly $360^\circ$.

---
