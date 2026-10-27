# C1.6 The Four Operations & BIDMAS (Core Tier)

## Order of Operations & Arithmetic Priority

The four fundamental operations of arithmetic are **Addition ($+$)**, **Subtraction ($-$)**, **Multiplication ($\times$)**, and **Division ($\div$)**.

When a mathematical expression contains multiple operations, you cannot simply calculate from left to right. You must follow the governing order of operations known as **BIDMAS** (or BODMAS / PEMDAS). Without BIDMAS, the expression $2 + 3 \times 4$ could produce two completely different answers ($20$ vs $14$). Following BIDMAS ensures that every mathematician gets the exact same correct answer ($14$).

---

## The BIDMAS Hierarchy Reference Table

| Priority Level | Letter | Operation | Example & Note |
| :--- | :--- | :--- | :--- |
| **1st (Highest)** | **B** | Brackets `( )` | Anything inside brackets must be evaluated first: $(3 + 5) \times 2 = 8 \times 2 = 16$. |
| **2nd** | **I** | Indices / Exponents | Powers and roots ($x^2, \sqrt{x}, 2^3$): $3 + 4^2 = 3 + 16 = 19$. |
| **3rd (Equal)** | **D / M** | Division & Multiplication | Division and multiplication have equal priority! Work **left to right**. |
| **4th (Equal)** | **A / S** | Addition & Subtraction | Addition and subtraction have equal priority! Work **left to right**. |

---

## Key Operating Rules for Negative Numbers

1. **Multiplying or Dividing Like Signs $\rightarrow$ Positive**:
   $$(+) \times (+) = + \quad \text{and} \quad (-) \times (-) = +$$
   $$(-12) \div (-3) = +4$$

2. **Multiplying or Dividing Unlike Signs $\rightarrow$ Negative**:
   $$(+) \times (-) = - \quad \text{and} \quad (-) \times (+) = -$$
   $$(-5) \times 6 = -30$$

3. **Combining Signs Side-by-Side**:
   * $a + (-b) \implies a - b$
   * $a - (-b) \implies a + b \quad \text{(Two minuses make a plus!)}$

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Multi-Step BIDMAS Calculation
Evaluate the following non-calculator expression:
$$15 - 3 \times (8 - 2^2) \div 6$$

#### Solution & Line-by-Line Annotations

1. **Step 1: Brackets & Indices inside brackets**  
   Inside the brackets $(8 - 2^2)$, evaluate index $2^2 = 4$:
   $$8 - 4 = 4$$
   Expression becomes:
   $$15 - 3 \times 4 \div 6$$

2. **Step 2: Multiplication & Division (Left to Right)**  
   Multiplication comes first working left-to-right ($3 \times 4 = 12$):
   $$15 - 12 \div 6$$

3. **Step 3: Division**  
   Evaluate $12 \div 6 = 2$:
   $$15 - 2$$

4. **Step 4: Subtraction**  
   $$15 - 2 = 13$$

---

### Question 2: Fraction Division & Mixed Numbers
Evaluate $2\frac{1}{3} \div 1\frac{3}{4}$, giving your answer as a simplified fraction.

#### Solution & Line-by-Line Annotations

1. Convert mixed numbers to improper fractions:
   $$2\frac{1}{3} = \frac{7}{3}, \quad 1\frac{3}{4} = \frac{7}{4}$$

2. Apply the fraction division rule (**Keep-Change-Flip**):
   $$\frac{7}{3} \div \frac{7}{4} = \frac{7}{3} \times \frac{4}{7}$$

3. Cancel common factor of $7$ in numerator and denominator:
   $$\frac{1}{3} \times \frac{4}{1} = \frac{4}{3} = 1\frac{1}{3}$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Evaluating Left-to-Right Without BIDMAS**  
  *Why it happens*: In $5 + 2 \times 3$, candidates add $5+2=7$ first, then multiply $7 \times 3 = 21$.  
  *The Correction*: Multiplication takes priority over addition! Evaluate $2 \times 3 = 6$ first, then $5 + 6 = 11$.

* **Mistake: Assuming Addition Comes Before Subtraction**  
  *Why it happens*: Because 'A' comes before 'S' in the acronym BIDMAS.  
  *The Correction*: Addition and Subtraction have **equal priority**. In $10 - 3 + 2$, work left-to-right: $(10 - 3) + 2 = 7 + 2 = 9$ (NOT $10 - 5 = 5$).
