# Topic: ME2.3 Factorising Quadratics & Advanced Expressions

Factorisation converts polynomial expressions into products of simpler linear or quadratic factors using quadratic splitting, difference of two squares (\(a^2 - b^2\)), and grouping in pairs.

---

### 1. Factorisation Techniques Breakdown

| Factorisation Method | Algebraic Pattern / Form | Factorised Equivalent |
| --- | --- | --- |
| Monic Quadratic (\(a = 1\)) | \(x^2 + bx + c\) | \((x + p)(x + q)\) where \(p+q = b\) and \(pq = c\) |
| Non-Monic Quadratic (\(a \ne 1\)) | \(ax^2 + bx + c\) | Split middle term \(bx = px + qx\) where \(pq = ac\) |
| Difference of Two Squares | \(a^2 - b^2\) | \((a - b)(a + b)\) |
| Grouping in Pairs | \(ax + ay + bx + by\) | \(a(x + y) + b(x + y) = (a + b)(x + y)\) |

---

### 2. Anatomy of Non-Monic Quadratic Factorisation

```
                        ax² + bx + c   -->   3x² + 11x + 6
                                                  |
                     Find p, q such that:  p + q = 11  (b)
                                           p * q = 18  (ac = 3 x 6)
                                                  |
                     Split Middle Term:    3x² + 9x + 2x + 6
                                                  |
                     Factorise in Pairs:   3x(x + 3) + 2(x + 3)
                                                  |
                     Extract Binomial:     (3x + 2)(x + 3)
```

* **Target Product (\(ac\)):** Find factors of \(ac\) that sum to the middle coefficient \(b\).
* **Binomial Extraction:** The matching pair bracket \((x + 3)\) is extracted as a common factor.

$$3x^2 + 11x + 6 = (3x + 2)(x + 3)$$

---

### 3. Worked Example

> **Question:**
> 1. Factorise completely: \(6x^2 - 7x - 20\).
> 2. Factorise completely: \(3x^3 - 12x\).

**Step 1: Factorise non-monic quadratic using splitting method**

1. Find two numbers that multiply to \(ac = 6 \times (-20) = -120\) and add to \(b = -7\):

$$\text{Pair} = -15 \text{ and } +8 \quad (-15 \times 8 = -120, \, -15 + 8 = -7)$$

2. Rewrite middle term \(-7x\) as \(-15x + 8x\):

$$6x^2 - 15x + 8x - 20$$

3. Group into pairs and factorise each pair:

$$3x(2x - 5) + 4(2x - 5) = (3x + 4)(2x - 5)$$

**Step 2: Factorise cubic expression by common factor and difference of squares**

1. Extract HCF \(3x\) from expression \(3x^3 - 12x\):

$$3x^3 - 12x = 3x(x^2 - 4)$$

2. Factorise remaining quadratic inside bracket as difference of two squares:

$$3x(x^2 - 4) = 3x(x - 2)(x + 2)$$

3. **Key result 1:** Fully factorised quadratic is \((3x + 4)(2x - 5)\).
4. **Key result 2:** Fully factorised cubic is \(3x(x - 2)(x + 2)\).

---

### 4. Common Examiner Traps

* **Incomplete Factorisation:** Leaving \(3x(x^2 - 4)\) without recognizing that \((x^2 - 4)\) can be further factorised into \((x - 2)(x + 2)\).
* **Sign Split Error:** Choosing incorrect factor pairs (e.g. using \(-12\) and \(+10\) for product \(-120\)) that do not sum to target coefficient \(-7\).
