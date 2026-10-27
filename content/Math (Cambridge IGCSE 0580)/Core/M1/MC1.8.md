# C1.8 Standard Form / Scientific Notation (Core Tier)

## What Is Standard Form and Why Do We Use It?

In science and mathematics, we frequently encounter extremely large numbers (like the speed of light: $300\,000\,000\text{ m/s}$) or extremely small numbers (like the mass of an electron: $0.000\,000\,000\,000\,000\,000\,000\,000\,000\,911\text{ kg}$). Writing these out with dozens of zeroes is slow and invites severe counting errors.

**Standard form** (also called scientific notation) solves this problem by expressing any number as a value between $1$ and $10$, multiplied by a power of ten.

---

## Anatomy of Standard Form

Every number in standard form is written in the exact mathematical format:

$$A \times 10^n$$

* **Condition 1 ($A$)**: The front number $A$ must satisfy $1 \le A < 10$. This means $A$ must have **exactly one non-zero digit before the decimal point** (e.g., $3.45$, $7.0$, $1.09$).
* **Condition 2 ($n$)**: The exponent $n$ must be an integer ($\mathbb{Z}$).
  * **Positive $n$ ($10^{+n}$)**: Represents **large numbers** ($\ge 10$).
  * **Negative $n$ ($10^{-n}$)**: Represents **small numbers** ($< 1$).

---

## Converting Between Standard Form and Normal Numbers

### 1. Converting Normal Numbers TO Standard Form
1. Place the decimal point after the **first non-zero digit** to create $A$ ($1 \le A < 10$).
2. Count how many places the decimal point moved to get there:
   * If the original number was **large** ($\ge 10$), $n$ is **positive**.
   * If the original number was **small** ($< 1$), $n$ is **negative**.

### 2. Converting Standard Form TO Normal Numbers
* If power is $+n$, move decimal point $n$ places to the **RIGHT** (make number bigger).
* If power is $-n$, move decimal point $n$ places to the **LEFT** (make number smaller).

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Conversion Between Formats
(a) Write $450\,000$ in standard form.  
(b) Write $0.00308$ in standard form.  
(c) Express $6.2 \times 10^{-4}$ as an ordinary number.

#### Solution & Line-by-Line Annotations

**(a) Converting $450\,000$ to standard form:**
1. Place decimal point after first non-zero digit: $4.5$.
2. Count decimal moves from end ($450\,000.0 \rightarrow 4.5$): moves $5$ places left.
3. Original number is large, so power is $+5$:
   $$4.5 \times 10^5$$

**(b) Converting $0.00308$ to standard form:**
1. Place decimal point after first non-zero digit ($3$): $3.08$.
2. Count decimal moves ($0.00308 \rightarrow 3.08$): moves $3$ places right.
3. Original number is small ($<1$), so power is $-3$:
   $$3.08 \times 10^{-3}$$

**(c) Converting $6.2 \times 10^{-4}$ to ordinary number:**
1. Exponent is $-4$, so move decimal point $4$ places to the left:
   $$6.2 \rightarrow 0.62 \rightarrow 0.062 \rightarrow 0.0062 \rightarrow 0.00062$$
2. Final ordinary number:
   $$0.00062$$

---

### Question 2: Calculations in Standard Form
Calculate $(4 \times 10^5) \times (3 \times 10^6)$, giving your answer in standard form.

#### Solution & Line-by-Line Annotations

1. Group front numbers together and powers of ten together:
   $$(4 \times 3) \times (10^5 \times 10^6)$$

2. Multiply front numbers and add powers of ten ($10^5 \times 10^6 = 10^{5+6} = 10^{11}$):
   $$12 \times 10^{11}$$

3. **Adjust to valid standard form**: $12$ is not between $1$ and $10$.
   $$12 = 1.2 \times 10^1$$
   $$1.2 \times 10^1 \times 10^{11} = 1.2 \times 10^{12}$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Invalid Front Number $A$**  
  *Why it happens*: Writing $12 \times 10^{11}$ or $0.45 \times 10^6$ as a final answer.  
  *The Correction*: $A$ must be between $1$ and $10$ ($1 \le A < 10$). $12$ is too large and $0.45$ is too small. You MUST convert $12 \times 10^{11}$ to $1.2 \times 10^{12}$.

* **Mistake: Confusing Positive and Negative Exponents**  
  *Why it happens*: Writing $0.005$ as $5 \times 10^3$ instead of $5 \times 10^{-3}$.  
  *The Correction*: Numbers smaller than $1$ **always** have negative powers of ten!
