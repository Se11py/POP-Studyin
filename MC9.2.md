# Topic: MC9.2 Averages & Range from Ungrouped Data

Measures of central tendency summarize raw ungrouped datasets using the arithmetic mean $\bar{x} = \frac{\sum x}{n}$, the median (middle value of an ordered set), and the mode (most frequent value), while range ($\text{Max} - \text{Min}$) measures dispersion.

---

### 1. Ungrouped Summary Statistics

| Statistic | Definition / Calculation | Formula | Key Characteristic |
| --- | --- | --- | --- |
| **Mean ($\bar{x}$)** | Sum of all values divided by total count | $\bar{x} = \frac{\sum x}{n}$ | Sensitive to extreme outliers |
| **Median** | Middle score when data is ordered ascendingly | Position $= \frac{n+1}{2}$ | Unaffected by extreme outliers |
| **Mode** | Most frequently occurring value | Highest frequency item | Can have no mode, 1 mode, or bimodal |
| **Range** | Difference between largest and smallest value | $\text{Range} = x_{\max} - x_{\min}$ | Measure of spread (not an average!) |

---

### 2. Ordered Data Array & Median Position

```
  Unordered Data:  [ 7,  3,  9,  3,  8 ]
  Ordered Data:    [ 3,  3,  7,  8,  9 ]
                     ^   ^   ^   ^   ^
                    Min Mode Med    Max
                    (Range = 9 - 3 = 6)

  Even Number of Data Items (n = 4): [ 4,  6, | 8, 10 ]
                                            Median = (6 + 8) / 2 = 7
```

* **Always Order Data First:** Sort values from smallest to largest before locating median or range.
* **Even vs Odd $n$:** If $n$ is odd, median is the single middle number. If $n$ is even, median is the mean of the two central numbers.
* **Range is Single Number:** State range as a single calculated difference (e.g. $6$), NOT a pair of numbers (e.g. $3$ to $9$).

$$\bar{x} = \frac{\sum x}{n} \quad \text{and} \quad \text{Range} = x_{\max} - x_{\min}$$

---

### 3. Worked Example

> **Question:**
> A student records test scores: $12, 15, 11, 18, 15, 13, 20$.
> 1. Find the mean, median, mode, and range of these $7$ scores.
> 2. An 8th test score $x$ is added, making the new overall mean equal to $15$. Find the value of $x$.

**Step 1: Calculate statistics for original 7 scores**

1. Order dataset: $11, 12, 13, 15, 15, 18, 20$ ($n = 7$).

2. Calculate Mean ($\bar{x}$):

$$\bar{x} = \frac{11 + 12 + 13 + 15 + 15 + 18 + 20}{7} = \frac{104}{7} \approx 14.86$$

3. Determine Median position $\frac{7+1}{2} = 4^{\text{th}}$ item:

$$\text{Median} = 15$$

4. Identify Mode (most frequent) and Range:

$$\text{Mode} = 15, \quad \text{Range} = 20 - 11 = 9$$

**Step 2: Solve reverse mean problem for 8th score $x$**

1. Calculate target total sum for $8$ scores with mean $15$:

$$\sum x_{\text{new}} = 8 \times 15 = 120$$

2. Subtract original sum ($104$) from target total sum:

$$x = 120 - 104 = 16$$

3. **Key result 1:** Mean $\approx 14.86$, Median $= 15$, Mode $= 15$, Range $= 9$.
4. **Key result 2:** The 8th score $x = 16$.

---

### 4. Common Examiner Traps

* **Forgetting to Order Data for Median:** Finding median from unsorted lists (e.g. picking $18$ from $12, 15, 11, 18, 15, 13, 20$).
* **Writing Range as an Interval:** Writing "Range $= 11 \text{ to } 20$" instead of subtracting to get single value $9$.
* **Confusing Range with Average:** Misidentifying range as a measure of central tendency; it measures spread.

---
