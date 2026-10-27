# E1.2 Sets, Venn Diagrams & Set Builder Notation (Extended Tier)

## Advanced Set Theory & 3-Set Venn Diagrams

In Extended Tier Mathematics, set problems expand beyond 2-set circles into **3-set Venn diagrams**, set builder notation $\{x : \text{condition}\}$, and algebraic equations derived from set intersections.

Understanding set notation is also crucial for probability, where conditional probability problems $P(A|B) = \frac{P(A \cap B)}{P(B)}$ are solved directly using Venn diagram region counts.

---

## Complete Set Notation Reference Table

| Symbol / Notation | Read As | Mathematical Definition | Example |
| :--- | :--- | :--- | :--- |
| $\{x : \dots\}$ | Set builder notation | "The set of all $x$ such that..." | $\{x : x \in \mathbb{Z}, 1 \le x \le 10\}$ |
| $\in$ / $\notin$ | Element of / Not element of | Belongs to / does not belong to set | $5 \in \text{Primes}$, $4 \notin \text{Primes}$ |
| $A \subseteq B$ | Subset | Every element of $A$ is also in $B$ | $\{2, 3\} \subseteq \{1, 2, 3, 4\}$ |
| $A \subset B$ | Proper Subset | $A \subseteq B$ and $A \neq B$ | $\{2\} \subset \{2, 5\}$ |
| $A \cap B$ | Intersection ($A$ AND $B$) | Elements belonging to BOTH $A$ and $B$ | Central overlapping region |
| $A \cup B$ | Union ($A$ OR $B$) | Elements belonging to $A$, $B$, or both | Combined total region |
| $A'$ | Complement of $A$ | All elements in $\mathscr{E}$ OUTSIDE set $A$ | Everything outside circle $A$ |
| $n(A)$ | Number of elements | Total count of items inside set $A$ | $n(\{a, b, c\}) = 3$ |
| $\varnothing$ or $\{\}$ | Empty Set | Set containing zero elements | $n(\varnothing) = 0$ |

---

## 3-Set Venn Diagram Geometry

```
     ┌─────────────────────────────────────────────────┐
     │ Universal Set ℰ                                 │
     │        Set A                   Set B            │
     │      ┌─────────┐           ┌─────────┐          │
     │      │  Only A │   A∩B     │  Only B │          │
     │      │         │ ┌───────┐ │         │          │
     │      │   ┌─────┼─┼─┐   ┌─┼─┼─────┐   │          │
     │      └───┼─────┼─┼─┼───┼─┼─┼─────┼───┘          │
     │          │     │ │A∩B∩C│ │ │     │              │
     │          └─────┼─┼─┼───┼─┼─┼─────┘              │
     │                │ └───────┘ │                    │
     │                │   Only C  │                    │
     │                └───────────┘                    │
     │                    Set C                        │
     └─────────────────────────────────────────────────┘
```

1. **Central Triple Intersection ($A \cap B \cap C$)**: Always start by filling in this center-most region first.
2. **Double Intersections**:
   * $n(A \cap B \text{ ONLY}) = n(A \cap B) - n(A \cap B \cap C)$
3. **Single Regions**:
   * $n(A \text{ ONLY}) = n(A) - [n(A \cap B \text{ ONLY}) + n(A \cap C \text{ ONLY}) + n(A \cap B \cap C)]$

---

## Step-by-Step Worked Exam Demonstrations

### Question: 3-Set Algebraic Problem
A survey of $100$ students asked which languages they study: French ($F$), German ($G$), and Spanish ($S$).

* $n(F) = 50$, $n(G) = 40$, $n(S) = 35$
* $n(F \cap G) = 18$, $n(F \cap S) = 15$, $n(G \cap S) = 12$
* $n(F \cap G \cap S) = x$
* $8$ students study none of these languages.

(a) Form an equation in $x$ and solve for $x$ (the number of students studying all three languages).  
(b) Find the number of students who study French ONLY.  
(c) A student who studies German is chosen at random. Find the probability that this student also studies Spanish.

#### Solution & Line-by-Line Annotations

**(a) Forming and Solving the Equation for $x$:**

1. Express individual Venn diagram regions in terms of $x$:
   * Triple overlap: $n(F \cap G \cap S) = x$
   * $F \cap G \text{ only} = 18 - x$
   * $F \cap S \text{ only} = 15 - x$
   * $G \cap S \text{ only} = 12 - x$
   * $F \text{ only} = 50 - [(18 - x) + (15 - x) + x] = 50 - (43 - x) = 7 + x$
   * $G \text{ only} = 40 - [(18 - x) + (12 - x) + x] = 40 - (30 - x) = 10 + x$
   * $S \text{ only} = 35 - [(15 - x) + (12 - x) + x] = 35 - (27 - x) = 8 + x$
   * Neither $= 8$

2. Sum all 8 regions to equal total universal set ($100$):
   $$(7+x) + (10+x) + (8+x) + (18-x) + (15-x) + (12-x) + x + 8 = 100$$

3. Simplify linear terms:
   $$78 + x = 100 \implies x = 22$$

**(b) Finding French ONLY:**
$$n(F \text{ only}) = 7 + x = 7 + 22 = 29$$

**(c) Conditional Probability $P(S | G)$:**
1. Restricted sample space = total German students $n(G) = 40$.
2. German students who also study Spanish = $n(G \cap S) = 12$.
   $$P(\text{Spanish} \mid \text{German}) = \frac{n(G \cap S)}{n(G)} = \frac{12}{40} = \frac{3}{10} = 0.3$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Incorrect Conditional Probability Denominator**  
  *Why it happens*: In Part (c), dividing by total students $100$ ($\frac{12}{100}$) instead of German students $40$.  
  *The Correction*: "Given that a student studies German" restricts the denominator strictly to $n(G) = 40$.

* **Mistake: Double Counting Double-Intersections in 3-Set Diagrams**  
  *Why it happens*: Writing $18$ in the $F \cap G$ region without subtracting the central triple overlap $x$.  
  *The Correction*: Always subtract $x$ from double intersections: $18 - x$.
