# Topic: MC8.1 Basic Probability & Single Events

Probability quantifies the likelihood of an event $A$ occurring on a scale from $0$ (impossible) to $1$ (certain), defined for equally likely outcomes as $P(A) = \frac{n(A)}{n(S)}$, where $n(A)$ is the number of favorable outcomes and $n(S)$ is the total sample space size.

---

### 1. Probability Scale & Basic Rules

| Probability Value | Verbal Scale Term | Fraction / Decimal / Percentage | Mathematical Rule |
| --- | --- | --- | --- |
| **$0$** | Impossible | $0 / 0.0 / 0\%$ | $n(A) = 0$ |
| **$0.5$** | Even Chance | $1/2 / 0.5 / 50\%$ | Favorable outcomes equal half total |
| **$1$** | Certain | $1 / 1.0 / 100\%$ | $n(A) = n(S)$ |
| **$P(A')$** | Complementary ("Not $A$") | $1 - P(A)$ | Sum of all event probabilities is $1$ |

---

### 2. Probability Scale & Complementary Venn Concept

```
  0                     0.5                   1
  +----------------------+--------------------+
  Impossible         Even Chance            Certain
  (e.g., Rolling 7)  (e.g., Fair Coin)      (e.g., Sun rises)

  Sample Space S:
  +-----------------------------------+
  |  Event A          Event A'        |
  |  (Favorable)     (Complement)     |
  |  P(A)            P(A') = 1 - P(A) |
  +-----------------------------------+
```

* **Valid Ranges:** Probabilities MUST satisfy $0 \le P(A) \le 1$. They can be written as fractions, decimals, or percentages.
* **Equally Likely Outcomes:** Assumes fair spinners, unbiased dice, or random selections.
* **Complement Rule:** $P(\text{Not } A) = 1 - P(A)$.

$$P(A) = \frac{n(A)}{n(S)} \quad \text{and} \quad P(A') = 1 - P(A)$$

---

### 3. Worked Example

> **Question:**
> A bag contains $5$ red balls, $3$ blue balls, and $4$ green balls. A ball is drawn at random.
> 1. Find the probability that the ball drawn is blue.
> 2. Find the probability that the ball drawn is NOT red.

**Step 1: Calculate total sample space size $n(S)$ and favorable outcomes $n(\text{Blue})$**

1. Sum total balls in the bag:

$$n(S) = 5 + 3 + 4 = 12$$

2. Calculate probability of drawing a blue ball ($n(\text{Blue}) = 3$):

$$P(\text{Blue}) = \frac{n(\text{Blue})}{n(S)} = \frac{3}{12} = \frac{1}{4}$$

**Step 2: Calculate complementary probability for NOT red**

1. Find probability of drawing a red ball ($n(\text{Red}) = 5$):

$$P(\text{Red}) = \frac{5}{12}$$

2. Apply complement rule $P(\text{Not Red}) = 1 - P(\text{Red})$:

$$P(\text{Not Red}) = 1 - \frac{5}{12} = \frac{7}{12}$$

3. **Key result 1:** $P(\text{Blue}) = \frac{1}{4}$ (or $0.25$).
4. **Key result 2:** $P(\text{Not Red}) = \frac{7}{12}$.

---

### 4. Common Examiner Traps

* **Writing Probabilities as Ratios:** Writing $3:12$ or $3$ to $12$ is marked WRONG in IGCSE Mathematics. Probabilities must be fractions, decimals, or percentages.
* **Probabilities Greater Than 1:** Any final probability answer like $1.2$ or $\frac{12}{5}$ indicates a calculation mistake.
* **Unreduced Fractions:** While fractions do not always need simplifying unless specified, simplifying (e.g. $\frac{3}{12} \to \frac{1}{4}$) avoids transcription errors.

---
