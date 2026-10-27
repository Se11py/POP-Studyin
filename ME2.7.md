# Topic: ME2.7 Advanced Sequences

Advanced sequence analysis determines the general \(n^{\text{th}}\) term formula for linear (\(dn+c\)), quadratic (\(an^2+bn+c\)), cubic (\(an^3+\dots\)), and geometric (\(ar^{n-1}\)) progressions using method of differences.

---

### 1. Advanced Sequence Types Breakdown

| Sequence Type | Difference Pattern | \(n^{\text{th}}\) Term General Formula | Key Coefficient Formula |
| --- | --- | --- | --- |
| Quadratic Sequence | Constant 2nd difference (\(2a\)) | \(T_n = an^2 + bn + c\) | \(2a = \text{2nd diff}\); \(3a + b = T_2 - T_1\); \(a + b + c = T_1\) |
| Cubic Sequence | Constant 3rd difference (\(6a\)) | \(T_n = an^3 + bn^2 + cn + d\) | \(6a = \text{3rd diff}\) |
| Geometric Progression | Constant term ratio (\(r = \frac{T_n}{T_{n-1}}\)) | \(T_n = a \cdot r^{n-1}\) | \(a = \text{first term}\), \(r = \text{common ratio}\) |

---

### 2. Anatomy of Quadratic Difference Method

```
Term (n):            1          2          3          4          5
Sequence (T_n):      3          8         15         24         35
1st Difference:           +5         +7         +9        +11
2nd Difference:               +2         +2         +2   <-- Constant!
                               |
                   2a = 2 ──>  a = 1  (Coefficient of n²)
```

* **Second Difference Rule:** The constant second difference divided by 2 gives coefficient \(a\) in \(an^2 + bn + c\).
* **Residual Linear Sequence:** Subtracting \(an^2\) from each sequence term leaves a linear sequence \(bn + c\).

$$2a = \text{2nd Difference} \implies a = \frac{\text{2nd Diff}}{2}$$

---

### 3. Worked Example

> **Question:**
> Find the \(n^{\text{th}}\) term formula for each sequence:
> 1. Quadratic sequence: \(6, 11, 18, 27, 38, \dots\)
> 2. Geometric sequence: \(5, 15, 45, 135, \dots\)

**Step 1: Determine quadratic sequence formula T_n = an^2 + bn + c**

1. Calculate 1st and 2nd differences for sequence \(6, 11, 18, 27, 38\):

$$\text{1st diffs: } 5, 7, 9, 11 \implies \text{2nd diff: } +2$$

2. Calculate \(a\):

$$2a = 2 \implies a = 1 \quad (\text{Term contains } n^2)$$

3. Subtract \(n^2\) (\(1, 4, 9, 16, 25\)) from sequence terms (\(6, 11, 18, 27, 38\)):

$$\text{Residuals: } (6-1, 11-4, 18-9, 27-16, 38-25) = (5, 7, 9, 11, 13)$$

4. Find linear formula \(bn + c\) for residuals \(5, 7, 9, 11\) (diff = 2, term 0 = 3):

$$\text{Residual } = 2n + 3 \implies T_n = n^2 + 2n + 3$$

**Step 2: Determine geometric sequence formula T_n = a * r^(n-1)**

1. Identify first term \(a = 5\) and common ratio \(r = \frac{15}{5} = 3\):

$$a = 5, \quad r = 3$$

2. Combine into geometric formula:

$$T_n = 5 \times 3^{n-1}$$

3. **Key result 1:** Quadratic \(n^{\text{th}}\) term is \(T_n = n^2 + 2n + 3\).
4. **Key result 2:** Geometric \(n^{\text{th}}\) term is \(T_n = 5 \times 3^{n-1}\).

---

### 4. Common Examiner Traps

* **Forgetting to Divide Second Difference:** Setting \(a\) equal to the second difference directly instead of dividing by 2.
* **Geometric Exponent Error:** Writing \(T_n = a \cdot r^n\) instead of \(a \cdot r^{n-1}\), which shifts all sequence terms by one index.
