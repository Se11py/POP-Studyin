# Topic: ME8.3 Venn Diagrams & Set Notation

Venn diagrams structure set relations and element counts $n(A)$, using set notation for intersection ($A \cap B$), union ($A \cup B$), complement ($A'$), and conditional probabilities calculated via subset ratios $P(A|B) = \frac{n(A \cap B)}{n(B)}$.

---

### 1. Set Notation & Probability Translation

| Set Notation | Term / Description | Diagram Shading Area | Probability Definition |
| --- | --- | --- | --- |
| **$A \cap B$** | Intersection ("$A$ AND $B$") | Overlap region only | $P(A \cap B) = \frac{n(A \cap B)}{n(\mathscr{E})}$ |
| **$A \cup B$** | Union ("$A$ OR $B$ OR both") | Total inside circles $A$ and $B$ | $P(A \cup B) = \frac{n(A \cup B)}{n(\mathscr{E})}$ |
| **$A'$** | Complement ("NOT $A$") | Everything outside circle $A$ | $P(A') = 1 - P(A)$ |
| **$A \cap B'$** | In $A$ AND NOT in $B$ | Circle $A$ excluding intersection | $P(A \text{ only}) = \frac{n(A) - n(A \cap B)}{n(\mathscr{E})}$ |
| **$(A \cup B)'$** | Neither $A$ nor $B$ | Box region outside both circles | $P(\text{Neither}) = \frac{n(\text{Outside})}{n(\mathscr{E})}$ |

---

### 2. Anatomy of a 2-Set & 3-Set Venn Diagram

```
    Universal Set (E)
    +-----------------------------------------+
    |   Circle A              Circle B        |
    |   +--------+---------+--------+         |
    |   |        | A n B   |        |         |
    |   | A n B' | (Both)  | A' n B |         |
    |   |        |         |        |         |
    |   +--------+---------+--------+         |
    |                                         |
    |             (A u B)' (Neither)          |
    +-----------------------------------------+
```

* **Universal Set ($\mathscr{E}$):** The outer box represents all elements under consideration; total count $n(\mathscr{E}) = \text{Sum of all regions}$.
* **Central Overlap First:** Always fill in the central intersection $n(A \cap B)$ first when completing diagrams.
* **Conditional Subset:** $P(A|B)$ isolates circle $B$ as the new universe ($n(B)$ in denominator).

$$P(A|B) = \frac{n(A \cap B)}{n(B)}$$

---

### 3. Worked Example

> **Question:**
> In a class of $30$ students, $18$ study Spanish ($S$), $15$ study French ($F$), and $3$ study neither language.
> 1. Complete a Venn diagram showing the number of students in each region.
> 2. A student is picked at random. Find $P(S' \cap F)$ and $P(S | F)$.

**Step 1: Determine region numbers starting with intersection**

1. Calculate total students studying at least one language:

$$n(S \cup F) = n(\mathscr{E}) - n(\text{Neither}) = 30 - 3 = 27$$

2. Calculate overlap $n(S \cap F)$ using union equation $n(S \cup F) = n(S) + n(F) - n(S \cap F)$:

$$27 = 18 + 15 - n(S \cap F) \implies n(S \cap F) = 33 - 27 = 6$$

3. Calculate single-region counts:
   - Spanish only: $n(S \cap F') = 18 - 6 = 12$
   - French only: $n(S' \cap F) = 15 - 6 = 9$
   - Neither: $3$

**Step 2: Compute target probabilities**

1. Find $P(S' \cap F)$ (French only over total class $30$):

$$P(S' \cap F) = \frac{n(S' \cap F)}{n(\mathscr{E})} = \frac{9}{30} = \frac{3}{10}$$

2. Find conditional probability $P(S | F)$ (Spanish given French):

$$P(S | F) = \frac{n(S \cap F)}{n(F)} = \frac{6}{15} = \frac{2}{5}$$

3. **Key result 1:** Venn diagram regions: Spanish only = $12$, Both = $6$, French only = $9$, Neither = $3$.
4. **Key result 2:** $P(S' \cap F) = \frac{3}{10}$ and $P(S | F) = \frac{2}{5}$.

---

### 4. Common Examiner Traps

* **Putting Totals in Single Regions:** Writing $18$ in Spanish-only region instead of subtracting the overlap ($18 - 6 = 12$).
* **Wrong Denominator in Conditional Questions:** Calculating $P(S|F)$ as $\frac{6}{30}$ instead of restricting denominator to French students $\frac{6}{15}$.
* **Confusing Shading Notation:** Confusing $(A \cup B)'$ (outside both) with $A' \cup B'$ (everything except intersection).

---
