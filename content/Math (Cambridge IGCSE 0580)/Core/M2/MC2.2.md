# MC2.2 Algebraic Manipulation | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Algebraic manipulation is the process of transforming algebraic expressions into equivalent forms to simplify calculations or solve equations. Expanding brackets removes parentheses by distributing multiplication over addition or subtraction. Factorising does the exact opposite: it rewrites an expression as a product of its factors by pulling out common components.

Think of expanding brackets like unpacking boxes to see all individual components laid out. Factorising is like packing items into neat, shared containers to identify what they have in common. Mastering both directions allows algebraic expressions to be simplified with zero change to their underlying value.

## 2. Key Definitions, Principles & Formulas
- **Expanding Single Brackets**: Multiply the term outside the bracket by every term inside:
  $$a(b + c) = ab + ac$$
  $$a(b - c) = ab - ac$$
- **Expanding Double Brackets (FOIL Method)**: Multiply First terms, Outside terms, Inside terms, and Last terms:
  $$(a + b)(c + d) = ac + ad + bc + bd$$
- **Factorising by Single Common Factor**: Identify the Highest Common Factor (HCF) of all terms, place it outside parentheses, and divide each term by the HCF:
  $$ab + ac = a(b + c)$$
- **Like Terms**: Terms with identical variable parts that can be added or subtracted together (e.g. $4x + 3x = 7x$).

> 💡 **Exam Tip**: Pay extreme attention to negative signs outside brackets. Expanding $-3(2x - 5)$ yields $-6x + 15$, not $-6x - 15$. Negative multiplied by negative gives positive.

> ⚠️ **Common Misconception**: Expanding $(x + 5)^2$ is NOT $x^2 + 25$. Square means multiplying the bracket by itself: $(x + 5)(x + 5) = x^2 + 10x + 25$.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Expanding Double Brackets and Factorising
(a) Expand and simplify fully: $3(2x - 4) - 2(x - 5)$.
(b) Expand and simplify fully: $(3x - 2)(x + 4)$.
(c) Factorise fully: $12a^2b + 18ab^2$.

#### Solution:
(a)
- **Step 1: Expand the first bracket by multiplying $3$ by $2x$ and $-4$.**
  $$3(2x - 4) = 6x - 12$$
- **Step 2: Expand the second bracket by multiplying $-2$ by $x$ and $-5$.**
  $$-2(x - 5) = -2x + 10$$
- **Step 3: Combine both expanded parts into one expression.**
  $$6x - 12 - 2x + 10$$
- **Step 4: Group and simplify like terms ($6x - 2x$ and $-12 + 10$).**
  $$4x - 2$$

(b)
- **Step 1: Apply the FOIL method to expand $(3x - 2)(x + 4)$.**
  $$\text{First: } 3x \times x = 3x^2$$
  $$\text{Outside: } 3x \times 4 = 12x$$
  $$\text{Inside: } -2 \times x = -2x$$
  $$\text{Last: } -2 \times 4 = -8$$
- **Step 2: Combine all four terms.**
  $$3x^2 + 12x - 2x - 8$$
- **Step 3: Simplify middle like terms ($12x - 2x$).**
  $$3x^2 + 10x - 8$$

(c)
- **Step 1: Find the HCF of numerical coefficients $12$ and $18$.**
  $$\text{HCF}(12, 18) = 6$$
- **Step 2: Find the lowest power of variable $a$ present in both terms ($a^2$ and $a$).**
  $$\text{HCF for } a = a$$
- **Step 3: Find the lowest power of variable $b$ present in both terms ($b$ and $b^2$).**
  $$\text{HCF for } b = b$$
- **Step 4: Combine to find the overall common factor outside the bracket.**
  $$\text{Common Factor} = 6ab$$
- **Step 5: Divide each term by $6ab$ to determine the expression inside brackets.**
  $$\frac{12a^2b}{6ab} = 2a, \quad \frac{18ab^2}{6ab} = 3b$$
  $$12a^2b + 18ab^2 = 6ab(2a + 3b)$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Sign Error with Distributive Law**: Omitting to change signs inside brackets when multiplying by a negative integer, e.g., $-4(x - 3) = -4x - 12$ (Incorrect) vs $-4x + 12$ (Correct).
- **Incomplete Factorisation**: Stopping after taking out a partial factor, e.g. factorising $8x^2 + 12x$ as $2x(4x + 6)$ instead of taking out the full HCF $4x(2x + 3)$.
- **Freshmen's Dream Error**: Assuming $(a + b)^2 = a^2 + b^2$. Always write out the double brackets $(a + b)(a + b)$ and expand fully.

## 5. Key Terms & Revision Summary
| Term | Definition & Formula |
| :--- | :--- |
| **Expanding** | Removing brackets by distributing multiplication: $a(b+c) = ab+ac$ |
| **Factorising** | Rewriting as a product of factors: $ab+ac = a(b+c)$ |
| **HCF (Highest Common Factor)** | Largest factor shared by all terms in an expression |
| **FOIL** | First, Outside, Inside, Last expansion rule for double brackets |
