# C1.2 Sets & Venn Diagrams (Core Tier)

## What Is a Set and Why Do We Use Venn Diagrams?

A **set** is simply a well-defined collection of distinct objects or numbers, called **elements**. In mathematics, set notation allows us to group numbers that share specific properties (like "all even numbers between 1 and 20" or "all prime factors of 60").

Venn diagrams provide a visual picture of sets. They organize elements into circles inside a universal frame, allowing you to quickly see overlaps (intersections), combined groupings (unions), or excluded elements (complements).

---

## Essential Set Language & Notation

| Notation / Symbol | Term Name | Meaning & Visual Representation |
| :--- | :--- | :--- |
| $\mathscr{E}$ or $\mathcal{U}$ | Universal Set | The master container holding **all** possible elements under consideration in the problem. |
| $n(A)$ | Number of Elements | The count of items inside set $A$. (This is a single integer, not a list!). |
| $\in$ | Element of | Indicates that an item belongs to a set (e.g., $3 \in \{1, 3, 5\}$). |
| $\notin$ | Not an Element of | Indicates that an item does **not** belong to a set (e.g., $4 \notin \{1, 3, 5\}$). |
| $A \cap B$ | Intersection ($A$ AND $B$) | The shared middle region where elements belong to **both** set $A$ and set $B$ simultaneously. |
| $A \cup B$ | Union ($A$ OR $B$) | The combined region of all elements belonging to set $A$, set $B$, or both. |
| $A'$ | Complement of $A$ | All elements in the universal set $\mathscr{E}$ that lie **outside** set $A$. |
| $\varnothing$ or $\{\}$ | Empty Set | A set containing zero elements ($n(\varnothing) = 0$). |

---

## Decoding Venn Diagram Regions

```
 ┌──────────────────────────────────────────────┐
 │ Universal Set ℰ                              │
 │   ┌─────────────┐       ┌─────────────┐      │
 │   │  Only A     │  A∩B  │  Only B     │      │
 │   │   (A ∩ B')  │       │   (B ∩ A')  │      │
 │   └─────────────┘       └─────────────┘      │
 │               Outside (A ∪ B)'               │
 └──────────────────────────────────────────────┘
```

1. **The Overlap ($A \cap B$)**: Always start by filling in this region first when constructing a Venn diagram from word problems.
2. **Only A ($A \cap B'$)**: Elements that belong exclusively to $A$. To find this count, subtract the intersection from total $n(A)$:
   $$n(A \text{ only}) = n(A) - n(A \cap B)$$
3. **Only B ($B \cap A'$)**: Elements that belong exclusively to $B$:
   $$n(B \text{ only}) = n(B) - n(A \cap B)$$
4. **Neither ($(A \cup B)'$)**: Elements inside $\mathscr{E}$ that belong to neither $A$ nor $B$, positioned outside both circles.

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Constructing a Venn Diagram from Word Problems
In a survey of $40$ people, $24$ like Tea ($T$), $18$ like Coffee ($C$), and $5$ like neither beverage.

(a) Complete the Venn diagram to represent this information.  
(b) Find $n(T \cap C)$ (the number of people who like both drinks).  
(c) Find $n(T \cap C')$ (the number of people who like Tea ONLY).  
(d) Calculate the probability that a person chosen at random likes Coffee ONLY.

#### Solution & Line-by-Line Annotations

**(a) & (b) Calculating the Overlap $n(T \cap C)$:**

1. Calculate how many people like at least one beverage:
   $$n(T \cup C) = \text{Total Surveyed} - \text{Neither} = 40 - 5 = 35$$

2. Add the individual set totals for Tea and Coffee:
   $$n(T) + n(C) = 24 + 18 = 42$$

3. The sum ($42$) is larger than the actual number of drink drinkers ($35$) because people who like **both** beverages were counted twice. Subtract to find the overlap:
   $$n(T \cap C) = 42 - 35 = 7$$

4. Fill in the remaining unique regions:
   * **Tea Only ($T \cap C'$)**: $24 - 7 = 17$
   * **Coffee Only ($C \cap T'$)**: $18 - 7 = 11$
   * **Neither ($(T \cup C)'$)**: $5$

5. Verify that all regions sum to $40$:
   $$17 + 7 + 11 + 5 = 40 \quad (\text{Verified!})$$

**(c) Finding $n(T \cap C')$:**
The number of people who like Tea ONLY is $17$.

**(d) Probability of "Coffee Only":**
$$\text{Probability} = \frac{\text{Number who like Coffee ONLY}}{\text{Total surveyed}} = \frac{11}{40}$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Writing Set Totals Directly into the Circles**  
  *Why it happens*: Candidates write $24$ in circle $T$ and $18$ in circle $C$ without subtracting the overlap.  
  *The Correction*: Always fill in the central intersection $n(T \cap C) = 7$ **first**, then subtract $7$ from $24$ ($17$) and $7$ from $18$ ($11$).

* **Mistake: Confusing $n(A)$ with Element Lists**  
  *Why it happens*: $n(A)$ means the **count** of elements. If $A = \{2, 4, 6\}$, then $n(A) = 3$. Writing $n(A) = \{3\}$ or $n(A) = \{2, 4, 6\}$ will lose marks.

* **Mistake: Confusing Union ($\cup$) and Intersection ($\cap$)**  
  *Memory Trick*: $\cup$ looks like a **U** for **Union** ("United together"). $\cap$ looks like an **n** for **aNd** ("Intersection").
