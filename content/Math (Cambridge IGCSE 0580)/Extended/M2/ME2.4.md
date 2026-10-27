# ME2.4 Indices II | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Extended index laws extend exponent notation beyond whole positive numbers to include zero, negative integers, rational fractions, and algebraic exponents. Rational (fractional) indices provide a powerful unified algebraic language for expressing nth roots and powers simultaneously.

Think of a fractional index $x^{\frac{p}{q}}$ as a two-stage machine: the denominator $q$ acts as the "root cutter" (taking the $q$-th root of the base), and the numerator $p$ acts as the "power builder" (raising the result to the power of $p$). Reversing negative indices flips bases between numerator and denominator.

## 2. Key Definitions, Principles & Formulas
- **Fractional Index Law (Roots and Powers)**:
  $$x^{\frac{1}{n}} = \sqrt[n]{x}$$
  $$x^{\frac{p}{q}} = (\sqrt[q]{x})^p = \sqrt[q]{x^p}$$
- **Negative Fractional Index Law**:
  $$x^{-\frac{p}{q}} = \frac{1}{x^{\frac{p}{q}}} = \frac{1}{(\sqrt[q]{x})^p}$$
  $$\left(\frac{a}{b}\right)^{-n} = \left(\frac{b}{a}\right)^n$$
- **Solving Exponential Equations ($a^x = a^y \implies x = y$)**: Express both sides of the equation using the same common prime base, then equate the indices to solve for the unknown variable.

> 💡 **Exam Tip**: When evaluating a fractional power like $27^{\frac{2}{3}}$ by hand, ALWAYS take the root first before applying the power! Taking $\sqrt[3]{27} = 3$ and then squaring $3^2 = 9$ is much easier than squaring $27^2 = 729$ and trying to cube root $729$.

> ⚠️ **Common Misconception**: Students often confuse multiplying by a fraction with raising to a fractional power. $16 \times \frac{1}{2} = 8$, whereas $16^{\frac{1}{2}} = \sqrt{16} = 4$.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Evaluating Fractional Powers and Solving Exponential Equations
(a) Evaluate numerically: $16^{-\frac{3}{4}}$.
(b) Simplify fully: $\left(\frac{8x^6}{y^9}\right)^{-\frac{2}{3}}$.
(c) Solve the exponential equation for $x$: $4^{x+1} = 32^{x-1}$.

#### Solution:
(a)
- **Step 1: Apply the negative index reciprocal rule.**
  $$16^{-\frac{3}{4}} = \frac{1}{16^{\frac{3}{4}}}$$
- **Step 2: Rewrite the denominator taking the 4th root first.**
  $$16^{\frac{1}{4}} = \sqrt[4]{16} = 2$$
- **Step 3: Cube the result.**
  $$2^3 = 8$$
- **Step 4: Combine into final reciprocal fraction.**
  $$\frac{1}{8}$$

(b)
- **Step 1: Apply the negative sign to flip the inner fraction upside down.**
  $$\left(\frac{8x^6}{y^9}\right)^{-\frac{2}{3}} = \left(\frac{y^9}{8x^6}\right)^{\frac{2}{3}}$$
- **Step 2: Apply the power $\frac{2}{3}$ to numerator and denominator terms individually.**
  $$\text{Numerator: } (y^9)^{\frac{2}{3}} = y^{9 \times \frac{2}{3}} = y^6$$
  $$\text{Denominator: } 8^{\frac{2}{3}} \times (x^6)^{\frac{2}{3}} = (\sqrt[3]{8})^2 \times x^{6 \times \frac{2}{3}} = 2^2 \times x^4 = 4x^4$$
- **Step 3: Write down the fully simplified expression.**
  $$\frac{y^6}{4x^4}$$

(c)
- **Step 1: Identify a common prime base for $4$ and $32$.**
  $$4 = 2^2 \quad \text{and} \quad 32 = 2^5$$
- **Step 2: Rewrite both sides of the equation using base $2$.**
  $$(2^2)^{x+1} = (2^5)^{x-1}$$
- **Step 3: Apply the power of a power law $(x^a)^b = x^{ab}$ to multiply exponents.**
  $$2^{2(x+1)} = 2^{5(x-1)} \implies 2^{2x + 2} = 2^{5x - 5}$$
- **Step 4: Since the bases are identical ($2$), equate the exponents and solve for $x$.**
  $$2x + 2 = 5x - 5$$
  $$2 + 5 = 5x - 2x \implies 7 = 3x \implies x = \frac{7}{3} \text{ or } 2\frac{1}{3}$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Incorrect Base Equating**: Trying to solve $4^{x+1} = 32^{x-1}$ by writing $4(x+1) = 32(x-1)$ without converting to a shared prime base ($2$).
- **Forgetting Numerical Base Powers**: Simplifying $(8x^6)^{\frac{1}{3}}$ to $8x^2$ instead of taking the cube root of $8$ to get $2x^2$.
- **Confusing Roots and Denominators**: Writing $x^{\frac{2}{3}} = \sqrt{x^3}$ instead of $\sqrt[3]{x^2}$.

## 5. Key Terms & Revision Summary
| Form | Exponential Meaning | Numerical Example |
| :--- | :--- | :--- |
| **$x^{\frac{1}{n}}$** | $n$-th Root ($\sqrt[n]{x}$) | $81^{\frac{1}{4}} = \sqrt[4]{81} = 3$ |
| **$x^{\frac{p}{q}}$** | $(\sqrt[q]{x})^p$ | $8^{\frac{5}{3}} = (\sqrt[3]{8})^5 = 2^5 = 32$ |
| **$x^{-n}$** | Reciprocal ($\frac{1}{x^n}$) | $5^{-3} = \frac{1}{5^3} = \frac{1}{125}$ |
| **$(\frac{a}{b})^{-n}$** | $(\frac{b}{a})^n$ | $(\frac{2}{3})^{-3} = (\frac{3}{2})^3 = \frac{27}{8}$ |
