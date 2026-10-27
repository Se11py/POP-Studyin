# Topic: ME8.2 Tree Diagrams

Tree diagrams map sequential multi-stage probability trials, where probabilities are multiplied along continuous horizontal branches ($P(A \cap B) = P(A) \times P(B|A)$) and summed down alternative vertical endpoints ($\sum P = 1$).

---

### 1. Tree Diagram Rules & Mechanics

| Concept / Context | Probability Calculation Rule | Branch Characteristic | Common Exam Context |
| --- | --- | --- | --- |
| **With Replacement** | Probabilities remain CONSTANT on 2nd branch | Independent stages: denominator stays $N$ | Replacing ball before 2nd draw |
| **Without Replacement** | Probabilities CHANGE on 2nd branch | Conditional stages: denominator becomes $N-1$ | Selecting 2 items without replacement |
| **Along Branches (AND)** | Multiply probabilities along a path | $P(\text{Path}) = P(\text{1st}) \times P(\text{2nd})$ | $P(\text{Red AND Blue})$ |
| **Across Endpoints (OR)** | Add probabilities of combined paths | $P(\text{Total}) = P(\text{Path 1}) + P(\text{Path 2})$ | $P(\text{At least one Red})$ |

---

### 2. Anatomy of a Two-Stage Tree Diagram

```
                 1st Draw                    2nd Draw               Outcomes
                                           /--- (5/9) Red ------->  (R, R)  P = 6/10 x 5/9 = 30/90
                       /--- (6/10) Red ----
                      /                    \--- (4/9) Blue ------>  (R, B)  P = 6/10 x 4/9 = 24/90
       [START] ------<
                      \                    /--- (6/9) Red ------->  (B, R)  P = 4/10 x 6/9 = 24/90
                       \--- (4/10) Blue ---
                                           \--- (3/9) Blue ------>  (B, B)  P = 4/10 x 3/9 = 12/90
```

* **Branch Sum Rule:** The sum of probabilities emanating from any single node MUST equal $1$ (e.g. $\frac{6}{10} + \frac{4}{10} = 1$).
* **Conditional Reduction:** Without replacement reduces numerator and denominator by $1$ after selecting that color.
* **Complement Shortcut:** $P(\text{At least one Red}) = 1 - P(\text{No Red}) = 1 - P(\text{Blue, Blue})$.

$$P(\text{Path 1 OR Path 2}) = \sum P(\text{Valid Endpoint Paths})$$

---

### 3. Worked Example

> **Question:**
> A box contains $7$ red socks and $3$ blue socks. Two socks are picked at random **without replacement**.
> 1. Draw a tree diagram showing all probabilities.
> 2. Calculate the probability of picking at least one blue sock.

**Step 1: Construct tree diagram and evaluate branch probabilities**

1. 1st Draw probabilities ($N = 10$):

$$P(R_1) = \frac{7}{10}, \quad P(B_1) = \frac{3}{10}$$

2. 2nd Draw probabilities ($N = 9$):
   - If 1st sock was Red ($7-1=6$ red left): $P(R_2|R_1) = \frac{6}{9}$, $P(B_2|R_1) = \frac{3}{9}$
   - If 1st sock was Blue ($3-1=2$ blue left): $P(R_2|B_1) = \frac{7}{9}$, $P(B_2|B_1) = \frac{2}{9}$

**Step 2: Calculate probability of at least one blue sock**

1. Method A (Summing valid outcomes $(R, B), (B, R), (B, B)$):

$$P(R, B) = \frac{7}{10} \times \frac{3}{9} = \frac{21}{90}$$

$$P(B, R) = \frac{3}{10} \times \frac{7}{9} = \frac{21}{90}$$

$$P(B, B) = \frac{3}{10} \times \frac{2}{9} = \frac{6}{90}$$

$$P(\text{At least 1 Blue}) = \frac{21}{90} + \frac{21}{90} + \frac{6}{90} = \frac{48}{90} = \frac{8}{15}$$

2. Method B (Complement rule $1 - P(R, R)$):

$$P(R, R) = \frac{7}{10} \times \frac{6}{9} = \frac{42}{90}$$

$$P(\text{At least 1 Blue}) = 1 - \frac{42}{90} = \frac{48}{90} = \frac{8}{15}$$

3. **Key result 1:** Tree diagram completed with initial denominator $10$ and second stage denominator $9$.
4. **Key result 2:** $P(\text{At least one blue}) = \frac{8}{15}$ (or $\approx 0.533$).

---

### 4. Common Examiner Traps

* **Keeping Denominator Constant in "Without Replacement" Questions:** Failing to reduce total items from $10$ to $9$ on second branches.
* **Forgetting the Second Combination:** Calculating $P(\text{One Red and One Blue})$ as just $P(R, B)$ while forgetting $P(B, R)$.
* **Failing Branch Sum Check:** Not checking that each pair of branches sums to $1.0$ (e.g. $\frac{6}{9} + \frac{3}{9} = \frac{9}{9} = 1$).

---
