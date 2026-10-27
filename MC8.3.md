# Topic: MC8.3 Probability Diagrams & Sample Spaces

Sample space diagrams systematically display all possible combined outcomes of multi-stage events, allowing probabilities to be determined by counting outcomes matching criteria over the total outcome grid $n(S) = n_1 \times n_2$.

---

### 1. Sample Space Representations

| Representation | Structural Format | Best Used For | Key Advantage |
| --- | --- | --- | --- |
| **Possibility Grid** | 2D Table Matrix ($x$-axis vs $y$-axis) | Rolling 2 dice, spinning 2 spinners | Prevents missing outcome combinations |
| **Systematic Listing** | Ordered set $\{ (1,1), (1,2), \dots \}$ | Small sample spaces, coins | Clear identification of pairs |
| **Simple Tree Diagram** | Branching path diagram | Sequential two-stage decisions | Multiplies probabilities along branches |

---

### 2. Possibility Grid & Outcome Layout

```
          Spinner 2 Outcome
        +---+---+---+---+---+
        |   | 1 | 2 | 3 | 4 |
   S    +---+---+---+---+---+
   p  1 |   | 2 | 3 | 4 | 5 |   Grid Entries = Sum of Spinners
   i  2 |   | 3 | 4 | 5 | 6 |   Total Outcomes n(S) = 4 x 4 = 16
   n  3 |   | 4 | 5 | 6 | 7 |
   n  4 |   | 5 | 6 | 7 | 8 |
   er 1 +---+---+---+---+---+
```

* **Grid Dimensions:** Total sample space size $n(S) = \text{Rows} \times \text{Columns}$.
* **Favorable Region:** Highlight or circle grid cells meeting target condition (e.g. sum $> 5$ or matching pairs).
* **Equally Likely Cells:** Each cell in a fair grid has probability $\frac{1}{n(S)}$.

$$P(\text{Event}) = \frac{\text{Count of marked grid cells}}{n(S)}$$

---

### 3. Worked Example

> **Question:**
> Two fair 4-sided spinners, each numbered $1, 2, 3, 4$, are spun simultaneously. The score is the sum of the two numbers landed on.
> 1. Complete a sample space grid showing all possible sum outcomes.
> 2. Find the probability that the sum is greater than $5$.

**Step 1: Construct the $4 \times 4$ sum possibility grid**

1. Calculate sums for each pair $(r, c)$ where $r \in \{1,2,3,4\}$ and $c \in \{1,2,3,4\}$:

$$\text{Row 1: } 1+1=2, 1+2=3, 1+3=4, 1+4=5$$

$$\text{Row 2: } 2+1=3, 2+2=4, 2+3=5, 2+4=6$$

$$\text{Row 3: } 3+1=4, 3+2=5, 3+3=6, 3+4=7$$

$$\text{Row 4: } 4+1=5, 4+2=6, 4+3=7, 4+4=8$$

2. Identify total possible outcomes $n(S) = 4 \times 4 = 16$.

**Step 2: Count outcomes where sum $> 5$ and calculate probability**

1. List cells with sum $> 5$:
   - Sum = 6: $(2,4), (3,3), (4,2) \implies 3$ outcomes
   - Sum = 7: $(3,4), (4,3) \implies 2$ outcomes
   - Sum = 8: $(4,4) \implies 1$ outcome

2. Calculate total favorable count $n(\text{Sum} > 5) = 3 + 2 + 1 = 6$.

3. Calculate probability:

$$P(\text{Sum} > 5) = \frac{6}{16} = \frac{3}{8}$$

4. **Key result 1:** Grid contains $16$ total sum outcomes ranging from $2$ to $8$.
5. **Key result 2:** $P(\text{Sum} > 5) = \frac{3}{8}$ (or $0.375$).

---

### 4. Common Examiner Traps

* **Misreading Grid Operation:** Adding numbers when the question specifies finding the product or difference of scores.
* **Double Counting Cells:** Counting diagonal items twice when calculating probabilities.
* **Incorrect Grid Boundaries:** Missing $0$ if a spinner includes $0$ (e.g. numbered $0, 1, 2, 3$).

---
