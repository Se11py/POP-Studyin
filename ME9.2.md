# Topic: ME9.2 Averages & Measures of Spread

Extended dispersion statistics evaluate dataset spread using quartiles: lower quartile $Q_1$ ($25^{\text{th}}$ percentile), median $Q_2$ ($50^{\text{th}}$ percentile), upper quartile $Q_3$ ($75^{\text{th}}$ percentile), and Interquartile Range $\text{IQR} = Q_3 - Q_1$.

---

### 1. Quartile & Spread Summary

| Statistic | Definition / Position Formula | Symbol | Key Advantage |
| --- | --- | --- | --- |
| **Lower Quartile ($Q_1$)** | Value at $25\%$ of ordered dataset: $\frac{N+1}{4}$ position | $Q_1$ | Boundary for lower $25\%$ |
| **Median ($Q_2$)** | Value at $50\%$ of ordered dataset: $\frac{N+1}{2}$ position | $Q_2$ | Middle value of distribution |
| **Upper Quartile ($Q_3$)** | Value at $75\%$ of ordered dataset: $\frac{3(N+1)}{4}$ position | $Q_3$ | Boundary for upper $25\%$ |
| **Interquartile Range (IQR)** | Difference between upper and lower quartiles | $\text{IQR} = Q_3 - Q_1$ | Measures spread of middle $50\%$ (outlier resistant!) |

---

### 2. Ordered Data Quartile Partition

```
  Ordered Dataset (N = 11):
  [ 2,  4,  5, | 7, | 8,  10,  12, | 15, | 16,  18,  20 ]
                 ^                 ^                  ^
                Q1 (Position 3)   Q2 (Position 6)    Q3 (Position 9)

  <-- Lower 25% --> <------ Middle 50% ------> <-- Upper 25% -->
                    |------- IQR = Q3 - Q1 ---|
```

* **Outlier Resistance:** Unlike range ($\text{Max} - \text{Min}$), IQR ignores extreme extreme values at the top or bottom of a dataset.
* **Continuous Percentiles:** $Q_1 = 25^{\text{th}}$ percentile, $Q_2 = 50^{\text{th}}$ percentile, $Q_3 = 75^{\text{th}}$ percentile.
* **Linear Interpolation:** For large grouped datasets, $Q_1 \approx \frac{N}{4}$ position, $Q_2 \approx \frac{N}{2}$ position, $Q_3 \approx \frac{3N}{4}$ position.

$$\text{IQR} = Q_3 - Q_1$$

---

### 3. Worked Example

> **Question:**
> A set of $11$ student exam scores ordered from lowest to highest is:
> $32, 45, 51, 58, 62, 67, 71, 78, 83, 89, 94$.
> 1. Find the median ($Q_2$), lower quartile ($Q_1$), upper quartile ($Q_3$), and Interquartile Range (IQR).
> 2. An error changed the highest score from $94$ to $194$. State which measure of spread changes and which remains unchanged.

**Step 1: Locate positions for $Q_1, Q_2, Q_3$ and compute IQR**

1. Locate Median $Q_2$ at position $\frac{11+1}{2} = 6^{\text{th}}$ item:

$$Q_2 = 67$$

2. Locate Lower Quartile $Q_1$ at position $\frac{11+1}{4} = 3^{\text{rd}}$ item:

$$Q_1 = 51$$

3. Locate Upper Quartile $Q_3$ at position $\frac{3(11+1)}{4} = 9^{\text{th}}$ item:

$$Q_3 = 83$$

4. Calculate Interquartile Range $\text{IQR} = Q_3 - Q_1$:

$$\text{IQR} = 83 - 51 = 32$$

**Step 2: Evaluate impact of extreme outlier ($194$)**

1. Range depends on maximum value ($\text{Range} = 194 - 32 = 162$), so Range CHANGES dramatically.

2. Quartiles $Q_1, Q_2, Q_3$ depend on positional order in the middle of the set, so IQR REMAINS UNCHANGED ($32$).

3. **Key result 1:** $Q_1 = 51$, $Q_2 = 67$, $Q_3 = 83$, and $\text{IQR} = 32$.
4. **Key result 2:** **Range** increases, while **Interquartile Range (IQR)** remains unchanged.

---

### 4. Common Examiner Traps

* **Confusing IQR with Range:** Subtracting $x_{\min}$ from $x_{\max}$ when asked for Interquartile Range (IQR).
* **Forgetting to Order Data First:** Finding $Q_1$ or $Q_3$ from an unsorted data list.
* **Adding Position Index to Value:** Giving the position number (e.g. $3^{\text{rd}}$) as the quartile value instead of the data item at that position ($51$).

---
