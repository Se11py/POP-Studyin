# C1.9 Estimation & Significant Figures (Core Tier)

## Why Estimate and How Does It Work?

In real-world problem-solving and examination papers, **estimation** allows you to approximate the value of a complex calculation quickly without using a calculator.

Estimation serves two vital purposes:
1. It gives a fast, mental sanity check to verify whether a calculator result is sensible (e.g. knowing that $49.8 \times 20.2$ should be close to $50 \times 20 = 1000$).
2. It tests your ability to round numbers appropriately to **1 significant figure (1 s.f.)**.

---

## The 1 Significant Figure Rule for Estimation

To estimate the value of any mathematical calculation:

1. **Round EVERY single number in the expression to 1 significant figure FIRST**, before performing any addition, subtraction, multiplication, or division.
2. Perform the arithmetic using the simplified 1 s.f. rounded values.

### Identifying the 1st Significant Figure
* The **first significant figure** of a number is the **first non-zero digit** reading from left to right.
* For $482$: 1st s.f. is $4 \implies$ rounds to $500$.
* For $0.00371$: 1st s.f. is $3 \implies$ rounds to $0.004$.

---

## 1 Significant Figure Rounding Table

| Original Number | 1st Significant Digit | Look to Next Digit | Rounded to 1 s.f. |
| :--- | :--- | :--- | :--- |
| **87.4** | $8$ | $7 \ge 5 \implies$ round up | **90** |
| **412.9** | $4$ | $1 < 5 \implies$ round down | **400** |
| **0.0562** | $5$ | $6 \ge 5 \implies$ round up | **0.06** |
| **0.00419** | $4$ | $1 < 5 \implies$ round down | **0.004** |
| **6.81** | $6$ | $8 \ge 5 \implies$ round up | **7** |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Estimating a Multi-Step Calculation
By rounding each number in the calculation to 1 significant figure, estimate the value of:
$$\frac{49.8 \times 20.4}{0.481}$$

Show all your working.

#### Solution & Line-by-Line Annotations

1. **Round each individual number to 1 s.f.**:
   * $49.8 \rightarrow 50$ (1st s.f. is 4, followed by 9)
   * $20.4 \rightarrow 20$ (1st s.f. is 2, followed by 0)
   * $0.481 \rightarrow 0.5$ (1st s.f. is 4, followed by 8)

2. **Substitute rounded values into the expression**:
   $$\text{Estimated Value} = \frac{50 \times 20}{0.5}$$

3. **Evaluate the numerator**:
   $$50 \times 20 = 1000$$

4. **Divide by $0.5$** (Dividing by $\frac{1}{2}$ is equivalent to multiplying by $2$):
   $$\frac{1000}{0.5} = 1000 \times 2 = 2000$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Calculating Exact Value First, Then Rounding at the End**  
  *Why it happens*: Candidates compute $\frac{49.8 \times 20.4}{0.481} = 2112.1 \dots$ on their calculator, then round $2112.1$ to $2000$.  
  *The Correction*: Mark schemes award **zero method marks** if you calculate the exact value first! You MUST round each number to 1 s.f. **before** calculating.

* **Mistake: Rounding Leading Zeroes in Decimals**  
  *Why it happens*: In $0.00481$, candidates treat the first zero after the decimal point as the 1st s.f.  
  *The Correction*: Leading zeroes are never significant! The 1st s.f. of $0.00481$ is the digit $4$, so it rounds to $0.005$.
