# Topic: ME8.4 Two-Way Tables & Expected Frequency

Two-way tables categorize bivariate frequency data into cross-tabulated rows and columns, providing marginal totals $n(\text{Row})$ and $n(\text{Col})$ to extract joint, conditional, and expected frequencies $E = N \times P$.

---

### 1. Two-Way Table Probability Formulas

| Goal / Query | Required Cell Values | Formula | Key Step |
| --- | --- | --- | --- |
| **Joint Probability** | Specific cell entry $n(R_i \cap C_j)$ | $P(R_i \cap C_j) = \frac{n(R_i \cap C_j)}{\text{Grand Total } N}$ | Divide cell by overall bottom-right total |
| **Marginal Probability** | Row total or column total | $P(R_i) = \frac{n(\text{Row } i)}{N}$ | Divide row/col total by grand total |
| **Conditional Probability** | Specific cell given column $C_j$ | $P(R_i \| C_j) = \frac{n(R_i \cap C_j)}{n(\text{Col } j)}$ | Denominator becomes column total! |
| **Expected Frequency** | New target population size $M$ | $E = M \times P(\text{Target})$ | Multiply target probability by $M$ |

---

### 2. Contingency Table Structure

```
                    Category A     Category B       TOTAL
                +--------------+--------------+---------------+
     Group 1    |  Cell (1,A)  |  Cell (1,B)  |  Row 1 Total  |
                +--------------+--------------+---------------+
     Group 2    |  Cell (2,A)  |  Cell (2,B)  |  Row 2 Total  |
                +--------------+--------------+---------------+
     TOTAL      |  Col A Total |  Col B Total |  GRAND TOTAL N|
                +--------------+--------------+---------------+
```

* **Row and Column Sum Integrity:** Sum of cells in row equals Row Total; sum of column totals equals Grand Total $N$.
* **Conditional Sub-Table:** Asking "given they are in Group 1" restricts calculations exclusively to Row 1.
* **Cell Intersection:** Cell $(1, A)$ represents elements belonging to BOTH Group 1 AND Category A simultaneously.

$$P(\text{Row } i \mid \text{Col } j) = \frac{\text{Cell}(i, j)}{\text{Col Total } j}$$

---

### 3. Worked Example

> **Question:**
> A survey of $100$ students recorded their grade level and transport method:
>
> | Grade Level | Bus | Car | Walk | Total |
> | --- | --- | --- | --- | --- |
> | **Year 10** | $25$ | $15$ | $10$ | $50$ |
> | **Year 11** | $18$ | $22$ | $10$ | $50$ |
> | **Total** | $43$ | $37$ | $20$ | $100$ |
>
> 1. A student is selected at random. Calculate $P(\text{Bus})$, $P(\text{Year 11} \cap \text{Car})$, and $P(\text{Walk} \mid \text{Year 10})$.
> 2. In a school of $800$ students, estimate how many Year 11 students travel by car.

**Step 1: Extract probabilities from two-way table**

1. Calculate $P(\text{Bus})$ using Bus column total over Grand Total:

$$P(\text{Bus}) = \frac{43}{100} = 0.43$$

2. Calculate joint probability $P(\text{Year 11} \cap \text{Car})$:

$$P(\text{Year 11} \cap \text{Car}) = \frac{22}{100} = 0.22$$

3. Calculate conditional probability $P(\text{Walk} \mid \text{Year 10})$ using Year 10 row total ($50$) as denominator:

$$P(\text{Walk} \mid \text{Year 10}) = \frac{10}{50} = \frac{1}{5} = 0.20$$

**Step 2: Calculate expected frequency for school population of $800$**

1. Identify proportion of Year 11 car travelers in survey sample ($22$ out of $100$ total students):

$$P(\text{Year 11 Car}) = \frac{22}{100} = 0.22$$

2. Multiply probability by total school size $N = 800$:

$$E = 800 \times 0.22 = 176$$

3. **Key result 1:** $P(\text{Bus}) = 0.43$, $P(\text{Year 11} \cap \text{Car}) = 0.22$, and $P(\text{Walk} \mid \text{Year 10}) = 0.20$.
4. **Key result 2:** Expected Year 11 car travelers in school is $176$.

---

### 4. Common Examiner Traps

* **Using Grand Total for Conditional Probabilities:** Writing $P(\text{Walk} \mid \text{Year 10}) = \frac{10}{100}$ instead of $\frac{10}{50}$. "Given Year 10" reduces denominator to $50$.
* **Arithmetic Errors when Completing Tables:** Adding row numbers incorrectly when completing blank table cells under exam time pressure.
* **Confusing Proportion of Row vs Proportion of School:** Multiplying expected frequency by row total fraction instead of overall sample fraction when scaling to school size.

---
