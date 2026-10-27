# E1.8 Standard Form Arithmetic & Algebraic Notation (Extended Tier)

## Performing Operations in Standard Form Without a Calculator

In Extended Tier Mathematics, candidates must add, subtract, multiply, and divide quantities written in standard form ($A \times 10^n$) both with and without a calculator, ensuring answers are expressed in valid standard form.

---

## Standard Form Arithmetic Rules

### 1. Multiplication and Division
Separate front numbers from powers of ten:
* **Multiplication**: Multiply front numbers and **add** exponents:
  $$(A \times 10^m) \times (B \times 10^n) = (A \times B) \times 10^{m+n}$$
* **Division**: Divide front numbers and **subtract** exponents:
  $$(A \times 10^m) \div (B \times 10^n) = (A \div B) \times 10^{m-n}$$

### 2. Addition and Subtraction
You **cannot** add or subtract standard form quantities directly unless their powers of ten are **identical**!
* Convert both quantities to have the **same power of ten** before factoring out the power:
  $$(A \times 10^n) + (B \times 10^n) = (A + B) \times 10^n$$

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Non-Calculator Addition & Subtraction in Standard Form
Evaluate $3.4 \times 10^7 + 5.8 \times 10^6$, giving your answer in standard form.

#### Solution & Line-by-Line Annotations

1. **Step 1: Align powers of ten**  
   Convert $5.8 \times 10^6$ to have power $10^7$:
   $$5.8 \times 10^6 = 0.58 \times 10^7$$

2. **Step 2: Add front numbers**:
   $$(3.4 + 0.58) \times 10^7 = 3.98 \times 10^7$$

3. **Step 3: Check standard form validity**:
   $3.98$ satisfies $1 \le A < 10 \implies 3.98 \times 10^7$ (Valid!).

---

### Question 2: Division in Standard Form with Exponent Adjustment
Evaluate $\frac{1.2 \times 10^{-3}}{4 \times 10^{-7}}$, giving your answer in standard form.

#### Solution & Line-by-Line Annotations

1. Group front numbers and powers of ten:
   $$\left(\frac{1.2}{4}\right) \times \left(\frac{10^{-3}}{10^{-7}}\right)$$

2. Divide front numbers:
   $$\frac{1.2}{4} = 0.3$$

3. Subtract exponents for division ($(-3) - (-7) = -3 + 7 = 4$):
   $$10^{-3} \div 10^{-7} = 10^4$$

4. Combine results:
   $$0.3 \times 10^4$$

5. **Adjust front number to valid standard form** ($0.3$ is not between $1$ and $10$):
   $$0.3 = 3 \times 10^{-1}$$
   $$3 \times 10^{-1} \times 10^4 = 3 \times 10^3$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Adding Exponents During Addition**  
  *Why it happens*: Writing $(3 \times 10^4) + (2 \times 10^4) = 5 \times 10^8$.  
  *The Correction*: Powers of ten are ONLY added during **multiplication**! For addition, factor out $10^4$: $(3+2) \times 10^4 = 5 \times 10^4$.

* **Mistake: Forgetting to Adjust Front Number $A$**  
  *Why it happens*: Leaving $0.3 \times 10^4$ or $15 \times 10^8$ as final answers.  
  *The Correction*: $A$ must be $1 \le A < 10$. Always re-adjust: $15 \times 10^8 = 1.5 \times 10^9$.
