# Topic: ME2.13 Differentiation & Turning Points

Differentiation finds the derivative function \(\frac{dy}{dx} = anx^{n-1}\) representing gradient rate of change, where turning points occur at stationary coordinates satisfying \(\frac{dy}{dx} = 0\).

---

### 1. Calculus Differentiation Rules Breakdown

| Feature / Concept | Mathematical Rule / Operation | Geometric Meaning |
| --- | --- | --- |
| Power Differentiation Rule | \(y = ax^n \implies \frac{dy}{dx} = a \cdot n \cdot x^{n-1}\) | Formula for gradient of tangent at any point \(x\) |
| Constant Differentiation Rule | \(y = c \implies \frac{dy}{dx} = 0\) | Derivative of constant term is zero (horizontal line gradient) |
| Stationary Turning Points | Solve \(\frac{dy}{dx} = 0\) for \(x\) | Points of zero gradient (local maximum or minimum) |

---

### 2. Anatomy of Curve Differentiation & Turning Points

```
                       y-axis
                         |       Local Maximum (dy/dx = 0)
                         |       /-----\
                         |      /       \
                         |     /         \
                         |    /           \       Local Minimum (dy/dx = 0)
                         |   /             \-----/
                         +---------------------------- x-axis
                                    dy/dx = 3ax² + 2bx + c
```

* **Power Rule:** Multiply term coefficient by current exponent \(n\), then decrease exponent power by 1.
* **Turning Point Condition:** Derivative must equal zero (\(\frac{dy}{dx} = 0\)) because tangent line is horizontal.

$$\frac{d}{dx}\left(ax^n\right) = anx^{n-1}$$

---

### 3. Worked Example

> **Question:**
> A curve has equation \(y = x^3 - 6x^2 + 9x + 4\).
> 1. Find the derivative expression \(\frac{dy}{dx}\).
> 2. Find the coordinates of the turning points of the curve.

**Step 1: Differentiate the polynomial equation term-by-term**

1. Apply power rule \(\frac{d}{dx}(ax^n) = anx^{n-1}\) to each term:

$$\frac{d}{dx}(x^3) = 3x^2$$

$$\frac{d}{dx}(-6x^2) = -12x$$

$$\frac{d}{dx}(9x) = 9, \quad \frac{d}{dx}(4) = 0$$

2. Combine into single derivative expression:

$$\frac{dy}{dx} = 3x^2 - 12x + 9$$

**Step 2: Find coordinates of stationary turning points**

1. Set derivative to zero (\(\frac{dy}{dx} = 0\)) and divide by 3:

$$3x^2 - 12x + 9 = 0 \implies x^2 - 4x + 3 = 0$$

2. Factorise quadratic equation to find \(x\)-coordinates:

$$(x - 1)(x - 3) = 0 \implies x_1 = 1, \, x_2 = 3$$

3. Calculate corresponding \(y\)-coordinates by substituting \(x\)-values into original curve equation:

$$\text{For } x_1 = 1: \, y_1 = (1)^3 - 6(1)^2 + 9(1) + 4 = 1 - 6 + 9 + 4 = 8 \implies (1, 8)$$

$$\text{For } x_2 = 3: \, y_2 = (3)^3 - 6(3)^2 + 9(3) + 4 = 27 - 54 + 27 + 4 = 4 \implies (3, 4)$$

4. **Key result 1:** Derivative function is \(\frac{dy}{dx} = 3x^2 - 12x + 9\).
5. **Key result 2:** Coordinates of turning points are \((1, 8)\) and \((3, 4)\).

---

### 4. Common Examiner Traps

* **Substituting x into Derivative for y-Value:** Substituting calculated turning point \(x\)-values back into \(\frac{dy}{dx}\) (which gives 0) instead of the original curve equation \(y = f(x)\).
* **Differentiating Linear / Constant Terms Incorrectly:** Writing \(\frac{d}{dx}(9x) = 9x\) instead of \(9\), or \(\frac{d}{dx}(4) = 4\) instead of \(0\).
