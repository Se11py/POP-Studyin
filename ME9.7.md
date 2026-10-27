# Topic: ME9.7 Statistical Comparisons & Data Interpretation

Comprehensive data comparison requires evaluating two complementary statistical dimensions: a measure of central tendency (location) paired with a measure of dispersion (spread), accounting for distribution skewness.

---

### 1. Statistical Comparison Pairing Rules

| Dimension | Standard Metric (Symmetrical) | Alternative Metric (Skewed / Outliers) | Comparative Vocabulary Required |
| --- | --- | --- | --- |
| **Location (Average)** | Arithmetic Mean ($\bar{x}$) | Median ($Q_2$) | "On average, group A scored higher / faster" |
| **Spread (Variability)** | Standard Deviation / Range | Interquartile Range ($\text{IQR} = Q_3 - Q_1$) | "Group B is more consistent / less spread out" |
| **Distribution Shape** | Symmetrical ($\text{Mean} \approx \text{Median}$) | Positive skew ($\text{Mean} > \text{Median}$) or Negative skew | "Distribution is skewed right/left" |

---

### 2. Skewness & Central Tendency Placement

```
   POSITIVE SKEW (Tail Right)           SYMMETRICAL (Normal)            NEGATIVE SKEW (Tail Left)
    Freq ^                                Freq ^                         Freq ^
         |  /\                                 |   /\                         |       /\
         | /  \                                |  /  \                        |      /  \
         |/____\________                       |_/____\_                      |_____/____\____
         Mode Med Mean                           Mode=Med=Mean                     Mean Med Mode
```

* **Paired Comparisons:** ALWAYS write two distinct sentences in exam responses: one for location (median/mean) and one for spread (IQR/range).
* **Context is Mandatory:** Always reference the problem units and entities (e.g. "Class A test scores" or "Runner times in seconds").
* **Outlier Impact:** For skewed datasets containing extreme values, Median and IQR provide a more reliable summary than Mean and Range.

$$\text{Comparison} = (\text{Location Sentence with Units}) + (\text{Spread/Consistency Sentence with Units})$$

---

### 3. Worked Example

> **Question:**
> Two machine lines produce metal rods. Samples of $50$ rods from Machine X and Machine Y give the following summary statistics:
> - Machine X: Median length $= 24.5\text{ cm}$, $\text{IQR} = 0.4\text{ cm}$, $\text{Range} = 1.8\text{ cm}$.
> - Machine Y: Median length $= 24.1\text{ cm}$, $\text{IQR} = 1.2\text{ cm}$, $\text{Range} = 3.5\text{ cm}$.
> 1. Compare the performance of Machine X and Machine Y in context.
> 2. Explain why the Median and IQR are preferred over the Mean and Range for comparing these machine productions if extreme faulty rods occur.

**Step 1: Write contextual comparative statements for location and spread**

1. Compare location (Medians):
   - Machine X produces longer rods on average than Machine Y because its median length is higher ($24.5\text{ cm} > 24.1\text{ cm}$).

2. Compare spread / consistency (IQRs):
   - Machine X is more consistent in production quality than Machine Y because its Interquartile Range is smaller ($0.4\text{ cm} < 1.2\text{ cm}$).

**Step 2: Justify metric selection for skewed/outlier data**

1. Explain outlier resistance:
   - Extreme faulty rods (outliers) distort the Mean and Range significantly.
   - The Median and IQR only depend on central positional ranks, making them resistant to extreme values and providing a more representative comparison of typical production quality.

2. **Key result 1:** **Machine X produces longer rods on average** (median $24.5\text{ cm}$ vs $24.1\text{ cm}$) and is **more consistent** (IQR $0.4\text{ cm}$ vs $1.2\text{ cm}$).
3. **Key result 2:** **Median and IQR are non-parametric metrics resistant to extreme outliers**, preventing distorted conclusions.

---

### 4. Common Examiner Traps

* **Stating Numbers Without Context:** Writing "$24.5 > 24.1$ and $0.4 < 1.2$" without explaining what it means in terms of rod lengths and production consistency.
* **Comparing Unmatched Pairs:** Comparing the Mean of dataset A with the Median of dataset B, or Range with IQR.
* **Vague Claims of "Better":** Using non-mathematical terms like "Machine X is better" without explicitly specifying "higher average" or "more consistent".

---
