# E1.16 Compound Interest & Financial Investments (Extended Tier)

## What Is Compound Interest?

In Extended Tier Mathematics, financial problems focus heavily on **compound interest** and exponential asset growth.

Unlike simple interest (where interest is earned only on the initial principal), **compound interest** adds interest earned back to the principal at the end of each period. Subsequent interest is then calculated on the new, larger balance—causing investments to grow exponentially over time.

---

## Compound Interest Formula

$$A = P \left(1 + \frac{r}{100}\right)^n$$

* **$A$**: Final total balance (Principal + Compound Interest) ($$)
* **$P$**: Initial Principal amount invested or borrowed ($$)
* **$r$**: Interest rate per period ($\%$)
* **$n$**: Number of compounding periods (years)

$$\text{Compound Interest Earned (I)} = A - P = P \left[\left(1 + \frac{r}{100}\right)^n - 1\right]$$

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Compound Interest Total & Interest Earned
David invests $\$4000$ for $5$ years in a savings account paying compound interest at a rate of $3.5\%$ per year.

(a) Calculate the total amount in the account at the end of $5$ years.  
(b) Calculate the total compound interest earned.

#### Solution & Line-by-Line Annotations

**(a) Finding Total Amount $A$:**

1. Identify parameters: $P = 4000, r = 3.5, n = 5$.
2. Calculate multiplier: $1 + \frac{3.5}{100} = 1.035$.
3. Apply formula:
   $$A = 4000 \times (1.035)^5 = 4000 \times 1.187686... = \$4750.745...$$
4. Round to 2 decimal places for currency:
   $$A = \$4750.75$$

**(b) Finding Interest Earned $I$:**
$$I = A - P = \$4750.75 - \$4000 = \$750.75$$

---

### Question 2: Solving for Time $n$ (Trial/Error or Equation Setup)
An investment of $\$2000$ at $5\%$ compound interest per year grows to over $\$3000$. Find the minimum number of complete years required.

#### Solution & Line-by-Line Annotations

1. Set up inequality:
   $$2000 \times (1.05)^n > 3000 \implies (1.05)^n > 1.5$$

2. Test integer values for $n$:
   * $n = 7 \implies (1.05)^7 = 1.4071 < 1.5$
   * $n = 8 \implies (1.05)^8 = 1.4774 < 1.5$
   * $n = 9 \implies (1.05)^9 = 1.5513 > 1.5$

3. Minimum complete years:
   $$n = 9\text{ years}$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Confusing Simple and Compound Interest Formulas**  
  *Why it happens*: Using $I = \frac{PRT}{100}$ for compound interest.  
  *The Correction*: Compound interest scales exponentially: $A = P(1 + \frac{r}{100})^n$.

* **Mistake: Rounding Currency to 1 Decimal Place or 3 s.f.**  
  *Why it happens*: Writing $\$4750.7$ or $\$4750$.  
  *The Correction*: All monetary amounts MUST be rounded to **2 decimal places** (cents).
