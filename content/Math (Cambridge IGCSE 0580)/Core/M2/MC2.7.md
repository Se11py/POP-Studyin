# MC2.7 Sequences | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
A number sequence is an ordered list of numbers following a systematic rule. Each individual number in the list is called a term. The position of a term in the sequence is denoted by $n$ ($n=1$ for the 1st term, $n=2$ for the 2nd term, etc.).

Think of a sequence like stepping stones across a river. A term-to-term rule tells you how to jump from one stone to the very next stone (e.g., "+3 each step"). An $n$th term rule acts like a GPS position locator: it gives a general formula where you plug in position $n$ to instantly find any term in the sequence without calculating all previous terms.

## 2. Key Definitions, Principles & Formulas
- **Term ($u_n$ or $T_n$)**: An individual number within a sequence at position $n$.
- **Term-to-Term Rule**: The rule describing how to generate the next term from the current term (e.g. "add 4").
- **Linear Sequence (Arithmetic Sequence)**: A sequence with a constant first difference $d$. The $n$th term formula is:
  $$\text{nth term} = dn + (a - d)$$
  where $d$ is the constant difference and $a$ is the 1st term ($n=1$).
- **Simple Quadratic Sequence**: A sequence where the second differences are constant. Common base quadratic sequence is $n^2$: $1, 4, 9, 16, 25, \dots$.
- **Simple Cubic Sequence**: A sequence based on cube numbers $n^3$: $1, 8, 27, 64, 125, \dots$.

> 💡 **Exam Tip**: For linear sequences, the coefficient of $n$ in the $n$th term formula is ALWAYS the constant first difference between consecutive terms.

> ⚠️ **Common Misconception**: Confusing term number ($n$) with term value ($T_n$). $n$ must always be a positive whole integer ($1, 2, 3, \dots$), whereas $T_n$ can be any real number (negative, fractional, or decimal).

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Finding $n$th Terms of Sequences
(a) Find the $n$th term formula for the linear sequence: $7, 11, 15, 19, 23, \dots$.
(b) Find the $100\text{th}$ term of this linear sequence.
(c) The $n$th term of a sequence is given by $T_n = n^2 + 3$. Find the first 3 terms.

#### Solution:
(a)
- **Step 1: Calculate the first differences between consecutive terms.**
  $$11 - 7 = 4, \quad 15 - 11 = 4, \quad 19 - 15 = 4$$
  The constant first difference is $d = +4$.
- **Step 2: Start the $n$th term expression with $4n$.**
  $$\text{Partial formula} = 4n$$
- **Step 3: Compare $4n$ outputs ($4, 8, 12, 16$) with actual terms ($7, 11, 15, 19$).**
  $$\text{Difference} = 7 - 4 = +3$$
- **Step 4: Combine to form the complete $n$th term formula.**
  $$\text{nth term} = 4n + 3$$

(b)
- **Step 1: Substitute position $n = 100$ into the $n$th term formula $4n + 3$.**
  $$T_{100} = 4(100) + 3$$
- **Step 2: Perform multiplication and addition.**
  $$T_{100} = 400 + 3 = 403$$

(c)
- **Step 1: Substitute $n = 1$ into $T_n = n^2 + 3$.**
  $$T_1 = 1^2 + 3 = 1 + 3 = 4$$
- **Step 2: Substitute $n = 2$ into $T_n = n^2 + 3$.**
  $$T_2 = 2^2 + 3 = 4 + 3 = 7$$
- **Step 3: Substitute $n = 3$ into $T_n = n^2 + 3$.**
  $$T_3 = 3^2 + 3 = 9 + 3 = 12$$
  The first 3 terms are $4, 7, 12$.

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Confusing Difference with Zero Term**: Writing $4n + 7$ instead of $4n + 3$ by adding the first term instead of the $n=0$ zero term.
- **Sign Error in Decreasing Sequences**: For decreasing sequence $20, 15, 10, 5$, the difference is $d = -5$, giving $-5n + 25$, NOT $5n - 25$.
- **Mishandling Quadratic Terms**: Misidentifying $2, 5, 10, 17$ ($n^2 + 1$) as a linear sequence. Always check if first differences are non-constant!

## 5. Key Terms & Revision Summary
| Sequence Type | Pattern Example | General $n$th Term Form |
| :--- | :--- | :--- |
| **Linear** | $5, 8, 11, 14, \dots$ | $dn + c$ (e.g. $3n + 2$) |
| **Square ($n^2$)** | $1, 4, 9, 16, \dots$ | $n^2$ |
| **Simple Quadratic** | $3, 6, 11, 18, \dots$ | $n^2 + c$ (e.g. $n^2 + 2$) |
| **Cube ($n^3$)** | $1, 8, 27, 64, \dots$ | $n^3$ |
