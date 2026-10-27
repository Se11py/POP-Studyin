# E1.3 Powers, Roots & Fractional Exponents (Extended Tier)

## Understanding Fractional & Negative Exponents

In Extended Tier Mathematics, exponents expand beyond positive integers into **fractional powers** ($a^{m/n}$) and **negative powers** ($a^{-n}$).

* A **fractional exponent** $\frac{1}{n}$ represents the $n$-th root: $a^{1/n} = \sqrt[n]{a}$.
* A **fractional exponent** $\frac{m}{n}$ represents taking the $n$-th root and raising the result to power $m$:
  $$a^{m/n} = \left(\sqrt[n]{a}\right)^m = \sqrt[n]{a^m}$$
* A **negative exponent** represents the reciprocal of the positive power:
  $$a^{-n} = \frac{1}{a^n} \quad \text{and} \quad \left(\frac{a}{b}\right)^{-n} = \left(\frac{b}{a}\right)^n$$

---

## Fractional & Negative Exponents Master Reference

| Index Notation | Radical Equivalent | Mathematical Meaning & Derivation | Numerical Example |
| :--- | :--- | :--- | :--- |
| **$a^{1/2}$** | $\sqrt{a}$ | Square root of $a$ | $25^{1/2} = \sqrt{25} = 5$ |
| **$a^{1/3}$** | $\sqrt[3]{a}$ | Cube root of $a$ | $64^{1/3} = \sqrt[3]{64} = 4$ |
| **$a^{m/n}$** | $\left(\sqrt[n]{a}\right)^m$ | $n$-th root raised to power $m$ | $8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4$ |
| **$a^{-n}$** | $\frac{1}{a^n}$ | Reciprocal of $a^n$ | $5^{-2} = \frac{1}{5^2} = \frac{1}{25}$ |
| **$\left(\frac{a}{b}\right)^{-n}$** | $\left(\frac{b}{a}\right)^n = \frac{b^n}{a^n}$ | Flip fraction and make power positive | $\left(\frac{2}{3}\right)^{-3} = \left(\frac{3}{2}\right)^3 = \frac{27}{8}$ |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Evaluating Numerical Fractional & Negative Powers
Evaluate the following without a calculator:
(a) $16^{-3/4}$  
(b) $\left(\frac{27}{125}\right)^{-2/3}$  
(c) $32^{0.6}$

#### Solution & Line-by-Line Annotations

**(a) Evaluating $16^{-3/4}$:**
1. Handle negative power by taking reciprocal:
   $$16^{-3/4} = \frac{1}{16^{3/4}}$$
2. Split fractional exponent $\frac{3}{4}$ into root ($4$-th root) and power ($3$):
   $$16^{1/4} = \sqrt[4]{16} = 2 \quad (\text{since } 2^4 = 16)$$
3. Raise result to power $3$:
   $$16^{3/4} = (2)^3 = 8$$
4. Final answer:
   $$\frac{1}{8}$$

**(b) Evaluating $\left(\frac{27}{125}\right)^{-2/3}$:**
1. Handle negative power by flipping fraction:
   $$\left(\frac{27}{125}\right)^{-2/3} = \left(\frac{125}{27}\right)^{2/3}$$
2. Take cube root of numerator and denominator:
   $$\left(\frac{\sqrt[3]{125}}{\sqrt[3]{27}}\right)^2 = \left(\frac{5}{3}\right)^2$$
3. Square numerator and denominator:
   $$\left(\frac{5}{3}\right)^2 = \frac{25}{9} = 2\frac{7}{9}$$

**(c) Evaluating $32^{0.6}$:**
1. Convert decimal exponent $0.6$ to simplified fraction:
   $$0.6 = \frac{6}{10} = \frac{3}{5}$$
2. Evaluate $32^{3/5}$:
   $$32^{1/5} = \sqrt[5]{32} = 2 \quad (\text{since } 2^5 = 32)$$
   $$(2)^3 = 8$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Squaring/Cubing Before Taking the Root**  
  *Why it happens*: Evaluating $16^{3/4}$ as $\sqrt[4]{16^3} = \sqrt[4]{4096}$.  
  *The Correction*: While mathematically equivalent, computing $16^3 = 4096$ without a calculator is difficult! **Always take the root first**, then raise to the power: $(\sqrt[4]{16})^3 = 2^3 = 8$.

* **Mistake: Thinking Negative Exponents Make the Value Negative**  
  *Why it happens*: Writing $5^{-2} = -25$ or $-10$.  
  *The Correction*: A negative exponent **never** makes a number negative! It simply takes the reciprocal: $5^{-2} = \frac{1}{5^2} = +\frac{1}{25}$.
