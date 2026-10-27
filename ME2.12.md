# Topic: ME2.12 Composite & Inverse Functions

A composite function \(gf(x) = g(f(x))\) applies function \(f\) first followed by function \(g\), while an inverse function \(f^{-1}(x)\) reverses the operation of \(f\) such that \(f(f^{-1}(x)) = x\).

---

### 1. Function Operations Breakdown

| Operation | Standard Notation | Operational Order / Algebraic Method |
| --- | --- | --- |
| Composite Function | \(gf(x) \equiv g(f(x))\) | Evaluate inner function \(f(x)\) first, then substitute output into outer function \(g\). |
| Self-Composition | \(f^2(x) \equiv ff(x) = f(f(x))\) | Substitute expression \(f(x)\) into itself. |
| Inverse Function | \(f^{-1}(x)\) | Set \(y = f(x)\), swap \(x\) and \(y\), and isolate \(y\) to find inverse rule. |

---

### 2. Anatomy of Composite & Inverse Operations

```
                   COMPOSITE FUNCTION: gf(x)
           x  ---> [ Function f ] ---> f(x) ---> [ Function g ] ---> g(f(x))
                                                                       |
                                                                  Output gf(x)

                   INVERSE FUNCTION: f⁻¹(x)
           y = f(x)  == Swap x, y ==>  x = f(y)  == Isolate y ==>  y = f⁻¹(x)
```

* **Composite Order:** Read from right to left in notation \(gf(x)\): \(f\) operates first, \(g\) operates second.
* **Symmetry Property:** Graph of inverse function \(y = f^{-1}(x)\) is a reflection of curve \(y = f(x)\) across line \(y = x\).

$$gf(x) \equiv g(f(x)) \quad \text{vs} \quad fg(x) \equiv f(g(x))$$

---

### 3. Worked Example

> **Question:**
> Given functions \(f(x) = 2x - 5\) and \(g(x) = \frac{3}{x + 1}\) (\(x \ne -1\)):
> 1. Find the composite expression \(gf(x)\) in its simplest form.
> 2. Find the inverse function expression \(f^{-1}(x)\).

**Step 1: Determine composite function gf(x)**

1. Substitute expression \(f(x) = 2x - 5\) into function \(g(x)\):

$$gf(x) = g(2x - 5)$$

2. Replace input variable in \(g(x)\) with \((2x - 5)\):

$$gf(x) = \frac{3}{(2x - 5) + 1} = \frac{3}{2x - 4}$$

**Step 2: Find inverse function f^(-1)(x)**

1. Set \(y = f(x) = 2x - 5\):

$$y = 2x - 5$$

2. Swap variables \(x\) and \(y\):

$$x = 2y - 5$$

3. Rearrange equation to isolate \(y\):

$$2y = x + 5 \implies y = \frac{x + 5}{2}$$

4. Write in formal inverse notation:

$$f^{-1}(x) = \frac{x + 5}{2}$$

5. **Key result 1:** Composite function is \(gf(x) = \frac{3}{2x - 4}\).
6. **Key result 2:** Inverse function is \(f^{-1}(x) = \frac{x + 5}{2}\).

---

### 4. Common Examiner Traps

* **Reversing Composite Order:** Evaluating \(fg(x)\) instead of \(gf(x)\), operating outer function first instead of rightmost inner function.
* **Notation Confusion:** Misinterpreting \(f^{-1}(x)\) as reciprocal \(\frac{1}{f(x)}\).
