# E1.4 Recurring Decimals to Fractions Proofs (Extended Tier)

## Converting Recurring Decimals into Exact Rational Fractions

In Extended Tier Mathematics, candidates must demonstrate how to convert **recurring decimals** (decimals with repeating digit patterns, indicated by dots above digits e.g. $0.\dot{7}$ or $0.2\dot{4}\dot{5}$) into exact rational fractions $\frac{p}{q}$ using algebraic proof.

---

## Algebraic Conversion Algorithm

To convert a recurring decimal $x$ into an exact fraction:

1. **Step 1**: Define $x$ as the recurring decimal:
   $$x = 0.d_1 d_2 d_3 \dots$$
2. **Step 2**: Multiply $x$ by a power of ten ($10, 100, 1000$) to move **one full repeating block** in front of the decimal point.
3. **Step 3**: Multiply $x$ by a power of ten to place the decimal point **immediately before** the first repeating block (if not already there).
4. **Step 4**: Subtract the two equations. The infinite repeating tails cancel out completely!
5. **Step 5**: Solve for $x$ and simplify the fraction to lowest terms.

---

## Recurring Decimal Notation Reference Table

| Notation | Expanded Decimal | Repeating Block Length | Power of 10 Multiplier | Equivalent Fraction |
| :--- | :--- | :--- | :--- | :--- |
| **$0.\dot{4}$** | $0.44444\dots$ | $1$ digit ($4$) | $10x$ | $\frac{4}{9}$ |
| **$0.\dot{2}\dot{7}$** | $0.272727\dots$ | $2$ digits ($27$) | $100x$ | $\frac{27}{99} = \frac{3}{11}$ |
| **$0.1\dot{6}$** | $0.16666\dots$ | $1$ digit ($6$), offset by $1$ | $100x$ and $10x$ | $\frac{15}{90} = \frac{1}{6}$ |
| **$0.\dot{1}2\dot{3}$** | $0.123123\dots$ | $3$ digits ($123$) | $1000x$ | $\frac{123}{999} = \frac{41}{333}$ |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Single and Double Recurring Decimal Proofs
Show algebraically that:
(a) $0.\dot{8} = \frac{8}{9}$  
(b) $0.\dot{3}\dot{6} = \frac{4}{11}$

#### Solution & Line-by-Line Annotations

**(a) Proof for $0.\dot{8}$:**

1. Define equation (1):
   $$x = 0.88888\dots \quad \text{--- (1)}$$

2. Multiply by $10$ (1 repeating digit):
   $$10x = 8.88888\dots \quad \text{--- (2)}$$

3. Subtract equation (1) from equation (2):
   $$10x - x = (8.88888\dots) - (0.88888\dots)$$
   $$9x = 8$$

4. Solve for $x$:
   $$x = \frac{8}{9} \quad (\text{Proved!})$$

**(b) Proof for $0.\dot{3}\dot{6}$:**

1. Define equation (1):
   $$x = 0.363636\dots \quad \text{--- (1)}$$

2. Multiply by $100$ (2 repeating digits):
   $$100x = 36.363636\dots \quad \text{--- (2)}$$

3. Subtract equation (1) from equation (2):
   $$100x - x = 36.363636\dots - 0.363636\dots$$
   $$99x = 36$$

4. Solve for $x$ and simplify:
   $$x = \frac{36}{99} = \frac{36 \div 9}{99 \div 9} = \frac{4}{11} \quad (\text{Proved!})$$

---

### Question 2: Offset Recurring Decimal Proof
Show algebraically that $0.2\dot{4}\dot{5} = \frac{27}{110}$.

#### Solution & Line-by-Line Annotations

1. Define $x$:
   $$x = 0.2454545\dots$$

2. Multiply by $10$ to align decimal point before repeating pattern:
   $$10x = 2.454545\dots \quad \text{--- (1)}$$

3. Multiply by $1000$ to move one full repeating block ($45$) past decimal:
   $$1000x = 245.454545\dots \quad \text{--- (2)}$$

4. Subtract equation (1) from equation (2):
   $$1000x - 10x = 245.454545\dots - 2.454545\dots$$
   $$990x = 243$$

5. Solve for $x$ and cancel common factor of $9$:
   $$x = \frac{243}{990} = \frac{243 \div 9}{990 \div 9} = \frac{27}{110} \quad (\text{Proved!})$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Skipping the Algebraic Working**  
  *Why it happens*: Writing $\frac{4}{11}$ directly from calculator memory.  
  *The Correction*: Questions starting with *"Show algebraically that..."* give **zero marks** for just writing the final answer. Full algebraic subtraction lines ($100x - x = 36$) are required.

* **Mistake: Incorrect Subtraction Alignment for Offset Decimals**  
  *Why it happens*: Subtracting $x$ from $100x$ for $0.2\dot{4}\dot{5}$ gives $99x = 24.31818\dots$ which leaves a non-cancelling decimal tail!  
  *The Correction*: For offset decimals, subtract $10x$ from $1000x$ so both decimal tails match $.454545\dots$ perfectly.
