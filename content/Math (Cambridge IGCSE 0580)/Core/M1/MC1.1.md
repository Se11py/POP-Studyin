# C1.1 Types of Number (Core Tier)

## What Are Types of Number and Why Do They Matter?

Before you can perform calculations or solve complex algebraic equations, you need to understand the fundamental categories of numbers. Think of numbers like chemical elements: just as atoms are classified as metals, non-metals, or noble gases based on how they react, numbers are categorized based on their arithmetic properties.

In Cambridge IGCSE Mathematics, understanding these classifications prevents simple yet costly mistakes—such as confusing factors with multiples, or assuming that $1$ is a prime number.

---

## Core Definitions & Key Classifications

### 1. Natural Numbers ($\mathbb{N}$)
Natural numbers are positive counting whole numbers starting from $1$:
$$\mathbb{N} = \{1, 2, 3, 4, 5, \dots\}$$
*Note: Zero ($0$) and negative numbers are **not** natural numbers.*

### 2. Integers ($\mathbb{Z}$)
Integers are all whole numbers, including positive values, negative values, and zero:
$$\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$$

### 3. Prime Numbers
A prime number is a whole number strictly greater than $1$ that has **exactly two distinct positive factors**: $1$ and itself.
* The first 10 prime numbers are: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29$.
* **Key Fact**: $2$ is the **only even prime number**. All other even numbers can be divided by $2$, so they have more than two factors.
* **Key Fact**: $1$ is **not** a prime number because it only has one factor ($1$).

### 4. Square Numbers & Cube Numbers
* **Square Numbers ($n^2$)**: Formed by multiplying an integer by itself.
  $$1^2=1, \quad 2^2=4, \quad 3^2=9, \quad 4^2=16, \quad 5^2=25, \quad 6^2=36, \quad 7^2=49, \quad 8^2=64, \quad 9^2=81, \quad 10^2=100$$
* **Cube Numbers ($n^3$)**: Formed by multiplying an integer by itself twice.
  $$1^3=1, \quad 2^3=8, \quad 3^3=27, \quad 4^3=64, \quad 5^3=125, \quad 10^3=1000$$

### 5. Common Factors & Highest Common Factor (HCF)
* A **factor** is a whole number that divides into another number with no remainder. For example, the factors of $12$ are $1, 2, 3, 4, 6, 12$.
* The **Highest Common Factor (HCF)** is the largest factor shared by two or more numbers.

### 6. Common Multiples & Lowest Common Multiple (LCM)
* A **multiple** is the result of multiplying a number by an integer (its times table). For example, multiples of $6$ are $6, 12, 18, 24, 30, \dots$
* The **Lowest Common Multiple (LCM)** is the smallest positive number that is a multiple of two or more numbers.

### 7. Rational and Irrational Numbers
* **Rational Numbers ($\mathbb{Q}$)**: Any number that can be expressed as a fraction $\frac{a}{b}$ where $a$ and $b$ are integers and $b \neq 0$. This includes all whole numbers, terminating decimals ($0.75 = \frac{3}{4}$), and recurring decimals ($0.\dot{3} = \frac{1}{3}$).
* **Irrational Numbers**: Numbers that **cannot** be written as a fraction of two integers. Their decimal representations go on forever without repeating (e.g., $\pi \approx 3.14159\dots$, $\sqrt{2} \approx 1.41421\dots$).

### 8. Reciprocals
The reciprocal of a number is $1$ divided by that number. Multiplying a number by its reciprocal always equals $1$:
$$\text{Reciprocal of } x = \frac{1}{x} \quad \left(x \neq 0\right)$$
* The reciprocal of $5$ is $\frac{1}{5}$.
* The reciprocal of $\frac{2}{3}$ is $\frac{3}{2}$ (simply flip the numerator and denominator).

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Prime Factor Decomposition & Index Notation
Write $180$ as a product of its prime factors in index form.

#### Solution & Line-by-Line Annotations

1. Split $180$ into two factors (e.g., $2 \times 90$).
2. $2$ is prime, so circle it. Split $90$ into $2 \times 45$.
3. $2$ is prime, circle it. Split $45$ into $3 \times 15$.
4. $3$ is prime, circle it. Split $15$ into $3 \times 5$.
5. Both $3$ and $5$ are prime.

Collect all circled prime factors:
$$180 = 2 \times 2 \times 3 \times 3 \times 5$$

Group like factors using exponents (index form):
$$180 = 2^2 \times 3^2 \times 5$$

---

### Question 2: Finding HCF and LCM Using Prime Factors
Given that $A = 2^3 \times 3 \times 5^2$ and $B = 2^2 \times 3^3 \times 5$:
(a) Find the Highest Common Factor (HCF) of $A$ and $B$.
(b) Find the Lowest Common Multiple (LCM) of $A$ and $B$.

#### Solution & Line-by-Line Annotations

**(a) Finding the HCF:**
To find the HCF from prime factorizations, take the **smallest power** of each common prime factor:
* For factor $2$: compare $2^3$ and $2^2 \rightarrow$ choose $2^2$.
* For factor $3$: compare $3^1$ and $3^3 \rightarrow$ choose $3^1$.
* For factor $5$: compare $5^2$ and $5^1 \rightarrow$ choose $5^1$.

$$\text{HCF} = 2^2 \times 3^1 \times 5^1 = 4 \times 3 \times 5 = 60$$

**(b) Finding the LCM:**
To find the LCM from prime factorizations, take the **largest power** of every prime factor present:
* For factor $2$: compare $2^3$ and $2^2 \rightarrow$ choose $2^3$.
* For factor $3$: compare $3^1$ and $3^3 \rightarrow$ choose $3^3$.
* For factor $5$: compare $5^2$ and $5^1 \rightarrow$ choose $5^2$.

$$\text{LCM} = 2^3 \times 3^3 \times 5^2 = 8 \times 27 \times 25 = 5400$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Thinking $1$ is a Prime Number**  
  *Why it happens*: Students assume $1$ is prime because it can only be divided by $1$.  
  *The Correction*: By definition, a prime number must have **exactly two** distinct factors. $1$ only has one factor ($1$), so it is not prime.

* **Mistake: Confusing Factors and Multiples**  
  *Why it happens*: Mixing up the vocabulary during timed exam conditions.  
  *The Correction*: Remember that **Factors** are *Fewer/Smaller* ($\text{HCF} \le \text{smallest number}$), while **Multiples** are *More/Bigger* ($\text{LCM} \ge \text{largest number}$).

* **Mistake: Writing Prime Products in Expanded Form**  
  *Why it happens*: Forgetting the instruction "in index form".  
  *The Correction*: If the question asks for index form, write $2^2 \times 3^2 \times 5$, not $2 \times 2 \times 3 \times 3 \times 5$. Expanded form loses the final accuracy mark.
