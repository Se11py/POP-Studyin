# Topic: ME9.4 Box Plots

Box plots (box-and-whisker diagrams) visually summarize distributions using five key statistics: minimum value, lower quartile $Q_1$, median $Q_2$, upper quartile $Q_3$, and maximum value, where box width equals Interquartile Range $\text{IQR} = Q_3 - Q_1$.

---

### 1. Five-Number Summary & Box Plot Elements

| Diagram Component | Associated Statistic | Position on Chart | Analytical Purpose |
| --- | --- | --- | --- |
| **Lower Whisker Tip** | Minimum value ($x_{\min}$) | Left vertical end-line | Boundary of lowest score |
| **Left Edge of Box** | Lower Quartile ($Q_1$) | $25^{\text{th}}$ percentile vertical line | Lower boundary of central $50\%$ |
| **Internal Box Line** | Median ($Q_2$) | $50^{\text{th}}$ percentile vertical line | Center of distribution |
| **Right Edge of Box** | Upper Quartile ($Q_3$) | $75^{\text{th}}$ percentile vertical line | Upper boundary of central $50\%$ |
| **Right Whisker Tip** | Maximum value ($x_{\max}$) | Right vertical end-line | Boundary of highest score |

---

### 2. Anatomy of a Box Plot

```
               Min         Q1       Q2 (Med)     Q3         Max
                |-----------+-----------+---------+----------|
                |           |           |         |          |
   -------------+           |   BOX     |         +----------+-------------
                |           |           |         |          |
                |-----------+-----------+---------+----------|
                            |<----- IQR --------->|
                |<---------------- Range ------------------->|
```

* **Box Boundaries:** The box encloses the central $50\%$ of data between $Q_1$ and $Q_3$.
* **Asymmetry / Skewness:** If median $Q_2$ is closer to $Q_1$, data is positively skewed; if closer to $Q_3$, negatively skewed.
* **Comparative Metrics:** When comparing distributions, always compare a measure of location (Median) and a measure of spread (IQR).

$$\text{Box Length} = \text{IQR} = Q_3 - Q_1 \quad \text{and} \quad \text{Total Span} = \text{Range} = x_{\max} - x_{\min}$$

---

### 3. Worked Example

> **Question:**
> A set of student test marks has minimum $= 15$, $Q_1 = 35$, median $= 55$, $Q_3 = 70$, and maximum $= 90$.
> 1. Calculate the Range and Interquartile Range (IQR).
> 2. Compare this distribution with Class B, which has median $= 65$ and $\text{IQR} = 18$.

**Step 1: Calculate Range and IQR**

1. Calculate total Range:

$$\text{Range} = x_{\max} - x_{\min} = 90 - 15 = 75$$

2. Calculate Interquartile Range (IQR):

$$\text{IQR} = Q_3 - Q_1 = 70 - 35 = 35$$

**Step 2: Make formal comparative statistical statements**

1. Compare central tendency (Medians):
   - Class B has a higher median ($65 > 55$), indicating that Class B scored higher on average.

2. Compare spread (IQRs):
   - Class A has a larger IQR ($35 > 18$), indicating that Class A scores are more spread out / less consistent than Class B.

3. **Key result 1:** $\text{Range} = 75$ and $\text{IQR} = 35$.
4. **Key result 2:** **Class B performed better on average** (higher median $65$ vs $55$), but **Class B was more consistent** (lower IQR $18$ vs $35$).

---

### 4. Common Examiner Traps

* **Comparing Mean Instead of Median on Box Plots:** Referencing the "mean" when comparing box plots; box plots display the MEDIAN, not the mean.
* **Drawing Box Lines Incorrectly:** Plotting the mean or range boundaries as box edges instead of $Q_1$ and $Q_3$.
* **Using Vague Comparison Words:** Stating "Class B is better" without providing specific statistical backing (e.g., higher median and lower IQR).

---
