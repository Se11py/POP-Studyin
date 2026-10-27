# E1.7 Exponential Equations & Advanced Indices (Extended Tier)

## Solving Exponential Equations using Equal Base Identities

In Extended Tier Mathematics, index laws extend to solving **exponential equations** where the unknown variable $x$ appears in the exponent (e.g. $5^{2x-1} = 125$ or $4^x = 8$).

The governing principle for solving exponential equations is:
$$\text{If } a^x = a^y \quad (a > 0, a \neq 1), \quad \text{then } x = y$$

To solve an exponential equation, rewrite both sides using a **common prime base $a$**, apply index laws to simplify exponents, and equate the powers!

---

## Index Laws Master Summary (Including Extended Fractional Rules)

| Index Law | Algebraic Formula | Mathematical Derivation |
| :--- | :--- | :--- |
| **Multiplication** | $a^m \times a^n = a^{m+n}$ | Combine total multiplied factors of base $a$ |
| **Division** | $a^m \div a^n = a^{m-n}$ | Cancel matching factors of base $a$ |
| **Power of Power** | $(a^m)^n = a^{m \cdot n}$ | Scale powers by multiplying exponents |
| **Zero Exponent** | $a^0 = 1 \quad (a \neq 0)$ | Derived from $a^m \div a^m = a^{m-m} = a^0 = 1$ |
| **Negative Exponent** | $a^{-n} = \frac{1}{a^n}$ | Derived from $a^0 \div a^n = a^{0-n} = a^{-n} = \frac{1}{a^n}$ |
| **Fractional Exponent** | $a^{m/n} = (\sqrt[n]{a})^m$ | $n$-th root of $a$ raised to power $m$ |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Solving Exponential Equations with Equal Prime Bases
Solve the following equations for $x$:
(a) $5^{2x - 1} = 125$  
(b) $4^{x + 1} = 32$  
(c) $3^{-x} = \frac{1}{81}$

#### Solution & Line-by-Line Annotations

**(a) Solving $5^{2x - 1} = 125$:**
1. Express $125$ as a power of base $5$: $125 = 5^3$.
   $$5^{2x - 1} = 5^3$$
2. Since bases are identical ($5$), equate exponents:
   $$2x - 1 = 3 \implies 2x = 4 \implies x = 2$$

**(b) Solving $4^{x + 1} = 32$:**
1. Both $4$ and $32$ can be rewritten in base $2$:
   $$4 = 2^2 \quad \text{and} \quad 32 = 2^5$$
2. Substitute into equation:
   $$(2^2)^{x + 1} = 2^5$$
3. Apply power of a power law to LHS exponent ($2 \times (x+1) = 2x + 2$):
   $$2^{2x + 2} = 2^5$$
4. Equate exponents and solve for $x$:
   $$2x + 2 = 5 \implies 2x = 3 \implies x = \frac{3}{2} = 1.5$$

**(c) Solving $3^{-x} = \frac{1}{81}$:**
1. Express $\frac{1}{81}$ in base $3$:
   $$81 = 3^4 \implies \frac{1}{81} = 3^{-4}$$
2. Equate:
   $$3^{-x} = 3^{-4} \implies -x = -4 \implies x = 4$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Forgetting to Distribute Exponent in $(2^2)^{x+1}$**  
  *Why it happens*: Writing $(2^2)^{x+1} = 2^{2x + 1}$ instead of $2^{2x + 2}$.  
  *The Correction*: The power of a power law requires multiplying $2$ by the **entire** polynomial exponent: $2(x + 1) = 2x + 2$.

* **Mistake: Multiplying Bases Instead of Exponents**  
  *Why it happens*: Writing $2^3 \times 2^4 = 4^7$ or $4^{x+1} = 2 \cdot 2^{x+1}$.  
  *The Correction*: Always convert composite numbers ($4, 8, 9, 16, 27, 32, 125$) into their **prime power representations** ($2^2, 2^3, 3^2, 2^4, 3^3, 2^5, 5^3$) BEFORE operating!
