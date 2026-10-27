# E1.1 Types of Number & Prime Factorisation (Extended Tier)

## What Are Types of Number and Why Do They Matter?

In Extended Tier Mathematics, numbers are classified into precise mathematical sets ($\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$). 

Prime numbers serve as the fundamental multiplicative building blocks of all integers (The Fundamental Theorem of Arithmetic). Beyond finding simple factors, Extended candidates must use prime factor decomposition in index form to find exact square roots, determine if a number is a perfect square or cube, and evaluate complex Highest Common Factors (HCF) and Lowest Common Multiples (LCM) for algebraic and numerical problems.

---

## Rigorous Classification of Real Number Sets ($\mathbb{R}$)

```
 ┌─────────────────────────────────────────────────────────────┐
 │ Real Numbers (ℝ)                                            │
 │  ┌──────────────────────────────────────────┐  ┌──────────┐ │
 │  │ Rational Numbers (ℚ)                     │  │Irrational│ │
 │  │  ┌────────────────────────────────────┐  │  │Numbers   │ │
 │  │  │ Integers (ℤ)                       │  │  │(π, √2)   │ │
 │  │  │  ┌──────────────────────────────┐  │  │  └──────────┘ │
 │  │  │  │ Natural Numbers (ℕ)          │  │  │             │ │
 │  │  │  │ {1, 2, 3, 4, ...}             │  │  │             │ │
 │  │  │  └──────────────────────────────┘  │  │             │ │
 │  │  │  {... -2, -1, 0, 1, 2, ...}        │  │             │ │
 │  │  └────────────────────────────────────┘  │             │ │
 │  │  {p/q : p, q ∈ ℤ, q ≠ 0} (e.g. 3/4, 0.3̄)  │             │ │
 │  └──────────────────────────────────────────┘             │ │
 └─────────────────────────────────────────────────────────────┘
```

| Number Set | Symbol | Mathematical Definition | Examples & Key Notes |
| :--- | :--- | :--- | :--- |
| **Natural Numbers** | $\mathbb{N}$ | Positive integers starting from $1$ | $\{1, 2, 3, 4, \dots\}$ ($0$ is NOT natural) |
| **Integers** | $\mathbb{Z}$ | Whole counting numbers (positive, negative, zero) | $\{\dots, -2, -1, 0, 1, 2, \dots\}$ |
| **Rational Numbers** | $\mathbb{Q}$ | Numbers expressible as exact ratio $\frac{p}{q}$ ($p,q \in \mathbb{Z}, q \neq 0$) | $\frac{3}{4}$, $0.75$, $-5$, $0.\dot{3} = \frac{1}{3}$, $\sqrt{0.16} = 0.4$ |
| **Irrational Numbers** | $\mathbb{Q}'$ or $\mathbb{R} \setminus \mathbb{Q}$ | Non-terminating, non-recurring decimals | $\pi \approx 3.14159\dots$, $\sqrt{2}$, $\sqrt{5}$, e |
| **Real Numbers** | $\mathbb{R}$ | All rational and irrational numbers combined | Any point on the continuous number line |

---

## Prime Factorization, HCF & LCM Strategy

### 1. Fundamental Theorem of Arithmetic
Every integer $n > 1$ can be expressed uniquely as a product of prime powers:
$$n = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$$

### 2. General Formula for HCF and LCM
Given two numbers decomposed into prime factors:
$$A = 2^{a_1} \cdot 3^{a_2} \cdot 5^{a_3} \dots \quad \text{and} \quad B = 2^{b_1} \cdot 3^{b_2} \cdot 5^{b_3} \dots$$

* **Highest Common Factor (HCF)**: Take the **minimum power** for each prime base:
  $$\text{HCF}(A, B) = 2^{\min(a_1, b_1)} \cdot 3^{\min(a_2, b_2)} \cdot 5^{\min(a_3, b_3)} \dots$$
* **Lowest Common Multiple (LCM)**: Take the **maximum power** for each prime base:
  $$\text{LCM}(A, B) = 2^{\max(a_1, b_1)} \cdot 3^{\max(a_2, b_2)} \cdot 5^{\max(a_3, b_3)} \dots$$
* **Fundamental Identity**:
  $$\text{HCF}(A, B) \times \text{LCM}(A, B) = A \times B$$

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Prime Factorization & Finding Perfect Squares/Cubes
(a) Express $504$ as a product of its prime factors in index form.  
(b) Find the smallest integer $k$ such that $504k$ is a perfect square.  
(c) Find the smallest integer $m$ such that $504m$ is a perfect cube.

#### Solution & Line-by-Line Annotations

**(a) Prime Factorization of $504$:**
1. Divide repeatedly by prime factors:
   $$504 = 2 \times 252 = 2 \times 2 \times 126 = 2 \times 2 \times 2 \times 63 = 2^3 \times 3 \times 21 = 2^3 \times 3^2 \times 7$$
2. Index Form:
   $$504 = 2^3 \times 3^2 \times 7^1$$

**(b) Finding $k$ for Perfect Square ($504k$):**
1. A number is a **perfect square** if and only if **all prime factor exponents are even integers**.
2. Examine current exponents of $504 = 2^3 \times 3^2 \times 7^1$:
   * Exponent of $2$ is $3$ (odd) $\rightarrow$ needs $+1$ to become $4$.
   * Exponent of $3$ is $2$ (even) $\rightarrow$ already even!
   * Exponent of $7$ is $1$ (odd) $\rightarrow$ needs $+1$ to become $2$.
3. Multiply missing prime factors to make all powers even:
   $$k = 2^1 \times 7^1 = 14$$
4. Check: $504 \times 14 = 7056 = (2^4 \times 3^2 \times 7^2) = (2^2 \times 3 \times 7)^2 = 84^2 \quad (\text{Verified!})$

**(c) Finding $m$ for Perfect Cube ($504m$):**
1. A number is a **perfect cube** if and only if **all prime factor exponents are multiples of 3**.
2. Examine exponents of $504 = 2^3 \times 3^2 \times 7^1$:
   * Exponent of $2$ is $3$ (multiple of 3) $\rightarrow$ needs $+0$.
   * Exponent of $3$ is $2$ $\rightarrow$ needs $+1$ to reach $3$.
   * Exponent of $7$ is $1$ $\rightarrow$ needs $+2$ to reach $3$.
3. Multiply required factors:
   $$m = 3^1 \times 7^2 = 3 \times 49 = 147$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Forgetting $1$ is NOT Prime**  
  *Why it happens*: Including $1$ in prime factor decompositions (e.g. $2^3 \times 3^2 \times 7 \times 1$).  
  *The Correction*: $1$ is not prime. Prime decompositions must contain **only** prime numbers $> 1$.

* **Mistake: Incorrectly Balancing Exponents for Perfect Squares**  
  *Why it happens*: Assuming $k = 504$ or squaring the whole number.  
  *The Correction*: Look strictly at the **odd exponents** in prime form. Multiply by the minimum prime powers needed to bring every odd exponent up to the next even integer.
