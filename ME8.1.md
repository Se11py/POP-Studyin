# Topic: ME8.1 Combined & Conditional Probability

Combined probability evaluates compound events using multiplication rules for independent events ($P(A \cap B) = P(A) \times P(B)$) and addition rules for mutually exclusive events ($P(A \cup B) = P(A) + P(B)$), extended by conditional probability $P(A|B) = \frac{P(A \cap B)}{P(B)}$.

---

### 1. Probability Laws Summary

| Event Relationship | Condition / Definition | Mathematical Formula | Key Distinction |
| --- | --- | --- | --- |
| **Independent Events** | Event $A$ outcome does not alter $B$ | $P(A \cap B) = P(A) \times P(B)$ | "AND" rule (multiplication) |
| **Mutually Exclusive** | Events cannot occur at the same time | $P(A \cup B) = P(A) + P(B)$ | "OR" rule (addition), $P(A \cap B) = 0$ |
| **General Addition Rule** | Events can overlap ($A \cap B \neq \emptyset$) | $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ | Subtracts double-counted overlap |
| **Conditional Probability** | Probability of $A$ given event $B$ occurred | $P(A|B) = \frac{P(A \cap B)}{P(B)}$ | Reduces sample space to set $B$ |

---

### 2. Multi-Event Logic & Venn Overlap

```
    Mutually Exclusive Events:            Overlapping Events (Conditional):
    +-------+   +-------+                 +-------------------+
    |       |   |       |                 |  A  /-----\  B    |
    |   A   |   |   B   |                 |    / A n B \      |
    |       |   |       |                 |   (   ===   )     |
    +-------+   +-------+                 |    \       /      |
    P(A n B) = 0                          +-------------------+
    P(A u B) = P(A) + P(B)                P(A|B) = P(A n B) / P(B)
```

* **Independent Multiplication:** Use multiplication along sequential paths: $P(\text{First AND Second}) = P(\text{First}) \times P(\text{Second})$.
* **Exclusive Addition:** Use addition across distinct alternative scenarios: $P(\text{Case 1 OR Case 2}) = P(\text{Case 1}) + P(\text{Case 2})$.
* **Conditional Sample Reduction:** Given event $B$ has occurred, denominator shrinks to $P(B)$ or count $n(B)$.

$$P(A \cap B) = P(A) \cdot P(B) \quad \text{and} \quad P(A|B) = \frac{P(A \cap B)}{P(B)}$$

---

### 3. Worked Example

> **Question:**
> Two independent events $A$ and $B$ have probabilities $P(A) = 0.6$ and $P(B) = 0.4$.
> 1. Calculate $P(A \cap B)$ and $P(A \cup B)$.
> 2. In a separate experiment with cards, $P(\text{Maths}) = 0.5$, $P(\text{Physics}) = 0.3$, and $P(\text{Maths} \cap \text{Physics}) = 0.15$. Calculate $P(\text{Maths} | \text{Physics})$ and determine if choosing Maths and Physics are independent.

**Step 1: Apply independent multiplication and general addition formulas**

1. Calculate intersection $P(A \cap B)$ for independent events:

$$P(A \cap B) = P(A) \times P(B) = 0.6 \times 0.4 = 0.24$$

2. Calculate union $P(A \cup B)$ using general addition formula:

$$P(A \cup B) = P(A) + P(B) - P(A \cap B) = 0.6 + 0.4 - 0.24 = 0.76$$

**Step 2: Calculate conditional probability and verify independence**

1. Apply conditional formula $P(M|P) = \frac{P(M \cap P)}{P(P)}$:

$$P(\text{Maths} | \text{Physics}) = \frac{0.15}{0.30} = 0.5$$

2. Test independence condition $P(M \cap P) = P(M) \times P(P)$:

$$P(M) \times P(P) = 0.5 \times 0.3 = 0.15$$

3. Compare product to actual intersection $P(M \cap P) = 0.15$. Since they are equal ($0.15 = 0.15$), the events are independent.

4. **Key result 1:** $P(A \cap B) = 0.24$ and $P(A \cup B) = 0.76$.
5. **Key result 2:** $P(\text{Maths} | \text{Physics}) = 0.5$; events are **independent**.

---

### 4. Common Examiner Traps

* **Adding Probabilities for "AND" Problems:** Adding probabilities when events happen sequentially (e.g. calculating $0.6 + 0.4$ instead of $0.6 \times 0.4$).
* **Confusing Mutually Exclusive with Independent:** Mutually exclusive means $P(A \cap B) = 0$; independent means $P(A \cap B) = P(A)P(B)$. Non-zero independent events can NEVER be mutually exclusive!
* **Forgetting to Subtract Overlap in $P(A \cup B)$:** Writing $P(A \cup B) = P(A) + P(B)$ for overlapping non-mutually exclusive events double-counts $P(A \cap B)$.

---
