# Topic: MC9.3 Averages from Frequency Tables

Frequency tables organize discrete repeated data values $x$ with frequencies $f$, where total sample size is $N = \sum f$, mean is $\bar{x} = \frac{\sum fx}{\sum f}$, and mode is the data value $x$ corresponding to maximum $f$.

---

### 1. Frequency Table Summary Statistics

| Statistic | Method / Column Formula | Mathematical Formula | Exam Action |
| --- | --- | --- | --- |
| **Total Frequency ($N$)** | Sum of frequency column | $N = \sum f$ | Sum column $f$ |
| **Mean ($\bar{x}$)** | Sum of $fx$ column divided by total frequency | $\bar{x} = \frac{\sum fx}{\sum f}$ | Add $fx$ product column |
| **Mode** | Data value $x$ with largest frequency $f$ | $x \text{ where } f = f_{\max}$ | Read $x$ value, NOT frequency! |
| **Median** | Data value at position $\frac{N+1}{2}$ | Position $= \frac{\sum f + 1}{2}$ | Use running cumulative total |

---

### 2. Anatomy of Discrete Frequency Table

```
   Data Value (x) | Frequency (f) | Product (f * x) | Cumulative f
  ----------------+---------------+-----------------+--------------
         0        |       4       |   0 * 4 = 0     |      4
         1        |       7       |   1 * 7 = 7     |     11
         2        |      10       |   2 * 10 = 20   |     21  <-- Median position (N+1)/2=13
         3        |       4       |   3 * 4 = 12    |     25
  ----------------+---------------+-----------------+--------------
       TOTALS     |  sum f = 25   | sum fx = 39     |
```

* **Product Column ($fx$):** Represents total contribution of each value ($x \times f$).
* **Mode Identification:** Mode is $2$ (because frequency $10$ is largest). Mode is NEVER $10$.
* **Median Cumulative Position:** Position $\frac{25+1}{2} = 13^{\text{th}}$ item falls in value $x = 2$ row.

$$\bar{x} = \frac{\sum fx}{\sum f}$$

---

### 3. Worked Example

> **Question:**
> The table shows the number of goals scored by a football team in $30$ matches:
>
> | Goals ($x$) | $0$ | $1$ | $2$ | $3$ | $4$ |
> | --- | --- | --- | --- | --- | --- |
> | **Frequency ($f$)** | $5$ | $9$ | $10$ | $4$ | $2$ |
>
> 1. Calculate the mean number of goals scored per match.
> 2. State the mode and median number of goals.

**Step 1: Compute $\sum f$ and construct product column $\sum fx$**

1. Calculate sum of frequencies:

$$\sum f = 5 + 9 + 10 + 4 + 2 = 30$$

2. Calculate sum of products $\sum fx$:

$$\sum fx = (0 \times 5) + (1 \times 9) + (2 \times 10) + (3 \times 4) + (4 \times 2)$$

$$\sum fx = 0 + 9 + 20 + 12 + 8 = 49$$

3. Calculate mean:

$$\bar{x} = \frac{\sum fx}{\sum f} = \frac{49}{30} \approx 1.63$$

**Step 2: Identify mode and calculate median position**

1. Identify value $x$ with highest frequency ($f_{\max} = 10 \implies x = 2$):

$$\text{Mode} = 2$$

2. Determine median position $\frac{30+1}{2} = 15.5^{\text{th}}$ score:
   - Cumulative frequencies: $0$ goals ($5$), $1$ goal ($5+9=14$), $2$ goals ($14+10=24$).
   - Scores $15^{\text{th}}$ and $16^{\text{th}}$ are both $2$.

$$\text{Median} = 2$$

3. **Key result 1:** Mean goals per match $\approx 1.63$ (or $\frac{49}{30}$).
4. **Key result 2:** Mode $= 2$ goals and Median $= 2$ goals.

---

### 4. Common Examiner Traps

* **Confusing Frequency for Mode:** Writing "Mode $= 10$" instead of "Mode $= 2$". The mode is the data value $x$, not the frequency count $f$.
* **Dividing by Number of Rows:** Dividing $\sum fx$ by $5$ (number of table columns/rows) instead of total frequency $\sum f = 30$.
* **Ignoring Zero Values:** Omitting $0 \times 5 = 0$ in the product column sum $\sum fx$.

---
