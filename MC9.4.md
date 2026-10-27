# Topic: MC9.4 Grouped Frequency & Estimates

Grouped data organizes continuous observations into class intervals $a \le x < b$, where central tendency is summarized by estimated mean $\bar{x} = \frac{\sum f m}{\sum f}$ using mid-interval values $m = \frac{a+b}{2}$ and identifying the modal class.

---

### 1. Grouped Frequency Formulas & Concepts

| Concept / Statistic | Definition / Formula | Operational Step | Exam Distinction |
| --- | --- | --- | --- |
| **Mid-Interval Value ($m$)** | $m = \frac{\text{Lower bound } a + \text{Upper bound } b}{2}$ | Average of class bounds | Representative point for interval |
| **Estimated Mean ($\bar{x}$)** | $\bar{x} = \frac{\sum fm}{\sum f}$ | Divide sum of $fm$ by sum of $f$ | Always labeled an "ESTIMATE" |
| **Modal Class** | Class interval containing highest frequency $f$ | State full inequality range | E.g. $10 \le x < 20$ |
| **Class Interval Width** | $w = \text{Upper bound } b - \text{Lower bound } a$ | $b - a$ | Difference between bounds |

---

### 2. Anatomy of Grouped Frequency Table

```
   Class Interval | Midpoint (m) | Frequency (f) | Product (f * m)
  ----------------+--------------+---------------+-----------------
     0 <= x < 10  |      5       |       6       |   6 * 5 = 30
    10 <= x < 20  |     15       |      12       |  12 * 15 = 180  <-- Modal Class
    20 <= x < 30  |     25       |       8       |   8 * 25 = 200
  ----------------+--------------+---------------+-----------------
       TOTALS     |              |  sum f = 26   | sum fm = 410
```

* **Why an "Estimate"?** Exact individual data values are lost when grouped into intervals; midpoints represent average values.
* **Modal Class Format:** Write full inequality interval (e.g. $10 \le x < 20$), NOT midpoint or frequency.
* **Midpoint Integrity:** Midpoints must be precise averages of interval boundaries ($m = \frac{a+b}{2}$).

$$\text{Estimated Mean } \bar{x} = \frac{\sum fm}{\sum f}$$

---

### 3. Worked Example

> **Question:**
> The mass $m$ (kg) of $50$ parcels is recorded in the table:
>
> | Mass ($m$ kg) | $0 < m \le 5$ | $5 < m \le 10$ | $10 < m \le 20$ | $20 < m \le 30$ |
> | --- | --- | --- | --- | --- |
> | **Frequency ($f$)** | $12$ | $18$ | $14$ | $6$ |
>
> 1. Calculate an estimate of the mean mass of the parcels.
> 2. State the modal class.

**Step 1: Calculate mid-interval values ($m$) and product column ($fm$)**

1. Calculate midpoints for each interval:
   - $0 < m \le 5 \implies m_1 = \frac{0+5}{2} = 2.5$
   - $5 < m \le 10 \implies m_2 = \frac{5+10}{2} = 7.5$
   - $10 < m \le 20 \implies m_3 = \frac{10+20}{2} = 15.0$
   - $20 < m \le 30 \implies m_4 = \frac{20+30}{2} = 25.0$

2. Calculate products $f \times m$:

$$f_1 m_1 = 12 \times 2.5 = 30$$

$$f_2 m_2 = 18 \times 7.5 = 135$$

$$f_3 m_3 = 14 \times 15.0 = 210$$

$$f_4 m_4 = 6 \times 25.0 = 150$$

3. Sum product column: $\sum fm = 30 + 135 + 210 + 150 = 525$.

**Step 2: Calculate estimated mean and state modal class**

1. Apply mean estimate formula with total frequency $\sum f = 50$:

$$\text{Estimated Mean} = \frac{\sum fm}{\sum f} = \frac{525}{50} = 10.5 \text{ kg}$$

2. Identify class interval with maximum frequency ($f_{\max} = 18$):

$$\text{Modal Class} = 5 < m \le 10$$

3. **Key result 1:** Estimated mean mass $= 10.5 \text{ kg}$.
4. **Key result 2:** Modal class $= 5 < m \le 10$.

---

### 4. Common Examiner Traps

* **Using Class Widths Instead of Midpoints:** Multiplying frequency by class width (e.g. $12 \times 5$) instead of midpoint ($12 \times 2.5$).
* **Writing Frequency as Modal Class:** Stating "Modal class $= 18$" instead of full range "$5 < m \le 10$".
* **Failing Midpoint Calculation for Unequal Intervals:** Assuming equal step jumps for midpoints when class widths vary (e.g. $10 < m \le 20$ has midpoint $15$, not $12.5$).

---
