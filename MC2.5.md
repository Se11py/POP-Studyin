# Topic: MC2.5 Sequences

A sequence is an ordered set of numbers following a mathematical pattern, where an arithmetic sequence has a constant first difference \(d\) generating an \(n^{\text{th}}\) term formula of \(T_n = dn + c\).

---

### 1. Sequence Types Breakdown

| Sequence Type | Rule / Pattern | \(n^{\text{th}}\) Term Formula / Form |
| --- | --- | --- |
| Arithmetic (Linear) | Constant difference \(d\) added/subtracted each step. | \(T_n = dn + (a - d)\) |
| Special Sequences | Squares (\(1, 4, 9, 16\)), Cubes (\(1, 8, 27, 64\)), Powers of 2 (\(2, 4, 8, 16\)). | \(n^2\), \(n^3\), \(2^n\) |
| Fibonacci-type | Each term is the sum of the previous two terms. | \(T_n = T_{n-1} + T_{n-2}\) |

---

### 2. Anatomy of an Arithmetic Sequence

```
Term Position (n):   1       2       3       4       ...    n
Sequence Term (T_n): 5       9      13      17       ...   4n + 1
                     \   /   \   /   \   /
Difference (d):       +4      +4      +4   -->  Multiplier of n = 4
```

* **Common Difference (\(d\)):** The constant difference between consecutive terms; becomes the coefficient of \(n\).
* **Zero Term (\(c = a - d\)):** The theoretical zero-th term (\(n = 0\)) added as a constant to complete the linear formula \(dn + c\).

$$T_n = dn + c \implies T_n = 4n + 1$$

---

### 3. Worked Example

> **Question:**
> For the sequence: \(7, 11, 15, 19, 23, \dots\)
> 1. Find the \(n^{\text{th}}\) term expression for this sequence.
> 2. Calculate the \(50^{\text{th}}\) term of the sequence.

**Step 1: Determine the general \(n^{\text{th}}\) term formula**

1. Find the common difference \(d\) between consecutive terms:

$$d = 11 - 7 = 4$$

2. Calculate the constant term \(c\) by subtracting \(d\) from the first term (\(a = 7\)):

$$c = a - d = 7 - 4 = +3$$

3. Combine into linear form \(T_n = dn + c\):

$$T_n = 4n + 3$$

**Step 2: Calculate the 50th term by substitution**

1. Substitute \(n = 50\) into the formula:

$$T_{50} = 4(50) + 3$$

2. Evaluate the product and addition:

$$T_{50} = 200 + 3 = 203$$

3. **Key result 1:** The \(n^{\text{th}}\) term expression is \(T_n = 4n + 3\).
4. **Key result 2:** The \(50^{\text{th}}\) term is \(203\).

---

### 4. Common Examiner Traps

* **Confusing Difference with Term Value:** Writing \(T_n = n + 4\) instead of \(4n + c\) when the common difference is 4.
* **Off-by-One Position Errors:** Substituting \(n = 49\) or \(n = 51\) when asked for the 50th term.
