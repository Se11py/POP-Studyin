# C1.7 Index Laws I: Positive & Zero Powers (Core Tier)

## What Is an Index and Why Do Index Laws Work?

An **index** (plural: **indices**), also called an exponent or power, indicates how many times a base number is multiplied by itself:
$$\text{Base}^{\text{Index}} = a^n = \underbrace{a \times a \times \dots \times a}_{n \text{ times}}$$

When performing calculations with powers having the same base, index laws act as mathematical shortcuts. Rather than expanding $x^5 \times x^3$ into $(x \cdot x \cdot x \cdot x \cdot x) \times (x \cdot x \cdot x)$, index laws allow you to compute the final power instantly by operating on the exponents.

---

## Fundamental Index Laws Reference Table

| Rule Name | Algebraic Law | Mathematical Reasoning & Proof | Example |
| :--- | :--- | :--- | :--- |
| **Multiplication Law** | $a^m \times a^n = a^{m+n}$ | Adding powers combines total multiplied bases: $2^3 \times 2^2 = (2 \cdot 2 \cdot 2) \cdot (2 \cdot 2) = 2^5$. | $x^4 \times x^3 = x^{4+3} = x^7$ |
| **Division Law** | $a^m \div a^n = a^{m-n}$ | Subtracting powers cancels matching base factors: $\frac{5^4}{5^2} = \frac{5 \cdot 5 \cdot 5 \cdot 5}{5 \cdot 5} = 5^2$. | $y^9 \div y^4 = y^{9-4} = y^5$ |
| **Power of a Power** | $(a^m)^n = a^{m \cdot n}$ | Multiplying powers scales repeated groups: $(3^2)^4 = 3^2 \times 3^2 \times 3^2 \times 3^2 = 3^8$. | $(k^3)^5 = k^{3 \times 5} = k^{15}$ |
| **Zero Power Law** | $a^0 = 1 \quad (a \neq 0)$ | Any non-zero number raised to power 0 equals 1: $\frac{a^m}{a^m} = a^{m-m} = a^0 = 1$. | $7^0 = 1, \quad (5x)^0 = 1$ |
| **Power of a Product** | $(ab)^n = a^n b^n$ | Exponents distribute over internal factors. | $(2x)^3 = 2^3 \cdot x^3 = 8x^3$ |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Simplifying Algebraic Expressions Using Index Laws
Simplify the following expressions fully:
(a) $4x^3 y^2 \times 3x^5 y^4$  
(b) $\frac{20a^7 b^5}{4a^2 b^5}$  
(c) $(3m^4)^3$

#### Solution & Line-by-Line Annotations

**(a) Simplifying $4x^3 y^2 \times 3x^5 y^4$:**
1. Multiply numerical coefficients: $4 \times 3 = 12$.
2. Apply multiplication law to $x$-terms: $x^3 \times x^5 = x^{3+5} = x^8$.
3. Apply multiplication law to $y$-terms: $y^2 \times y^4 = y^{2+4} = y^6$.
4. Combine into final expression:
   $$12 x^8 y^6$$

**(b) Simplifying $\frac{20a^7 b^5}{4a^2 b^5}$:**
1. Divide numerical coefficients: $20 \div 4 = 5$.
2. Apply division law to $a$-terms: $a^7 \div a^2 = a^{7-2} = a^5$.
3. Apply zero power law to $b$-terms: $b^5 \div b^5 = b^{5-5} = b^0 = 1$.
4. Combine:
   $$5 a^5 \times 1 = 5a^5$$

**(c) Simplifying $(3m^4)^3$:**
1. Apply the exponent $3$ to the coefficient: $3^3 = 3 \times 3 \times 3 = 27$.
2. Apply power of a power law to $m$-terms: $(m^4)^3 = m^{4 \times 3} = m^{12}$.
3. Combine into final term:
   $$27 m^{12}$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Forgetting to Power the Numerical Coefficient**  
  *Why it happens*: Writing $(3m^4)^3 = 3m^{12}$ instead of $27m^{12}$.  
  *The Correction*: Remember that the power outside the bracket applies to **everything** inside, including the number $3$: $3^3 = 27$.

* **Mistake: Adding Bases Instead of Adding Powers**  
  *Why it happens*: Candidates write $2^3 \times 2^4 = 4^7$.  
  *The Correction*: The base number **never changes**! Only the powers are added: $2^3 \times 2^4 = 2^{3+4} = 2^7$.

* **Mistake: Thinking $a^0 = 0$**  
  *Why it happens*: Assuming zero power results in zero.  
  *The Correction*: Any quantity raised to the power of zero equals $1$ ($x^0 = 1$).
