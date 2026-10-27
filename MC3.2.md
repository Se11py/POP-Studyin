# Topic: MC3.2 Distance Between Two Points

The distance $d$ between two points $A(x_1, y_1)$ and $B(x_2, y_2)$ on a Cartesian grid represents the length of the straight line segment joining them, derived directly from Pythagoras' Theorem.

---

### 1. Distance Calculation Breakdown

| Parameter | Mathematical Expression | Key Note |
| --- | --- | --- |
| Horizontal Change ($\Delta x$) | $x_2 - x_1$ | Difference between $x$-coordinates. |
| Vertical Change ($\Delta y$) | $y_2 - y_1$ | Difference between $y$-coordinates. |
| Distance Formula | $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ | Always returns a non-negative scalar value. |

---

### 2. Geometry & ASCII Diagram

```
         y ^
           |              B (x2, y2)
           |             /|
           |            / |
           |        d  /  | dy = y2 - y1
           |          /   |
           |         /    |
           |  A(x1,y1)----+ C (x2, y1)
           |      dx = x2 - x1
  ---------+--------------------------> x
           |
```

* **Hypotenuse Analogy:** The line segment $AB$ acts as the hypotenuse of right-angled triangle $ABC$.
* **Square Operation:** Squaring differences eliminates negative signs: $(x_2 - x_1)^2$ is always positive.
* **Exact vs Rounded:** Leave in surd form $\sqrt{N}$ if exact value is requested; otherwise round to 3 significant figures.

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

---

### 3. Worked Example

> **Question:**
> 1. Calculate the exact length of the line segment joining $P(-2, 3)$ and $Q(4, -1)$.
> 2. Give your answer to 3 significant figures.

**Step 1: Calculate Horizontal and Vertical Differences**

1. Find the horizontal difference $\Delta x = x_2 - x_1$:

$$\Delta x = 4 - (-2) = 4 + 2 = 6$$

2. Find the vertical difference $\Delta y = y_2 - y_1$:

$$\Delta y = -1 - 3 = -4$$

**Step 2: Apply Distance Formula and Evaluate**

1. Substitute values into Pythagoras' formula:

$$d^2 = (6)^2 + (-4)^2 = 36 + 16 = 52$$

2. Take the square root and evaluate:

$$d = \sqrt{52} \approx 7.2111...$$

3. **Exact Length:** $\sqrt{52}\text{ units}$ (or $2\sqrt{13}$)
4. **Length to 3 s.f.:** $7.21\text{ units}$

---

### 4. Common Examiner Traps

* **Negative Squaring Error:** Writing $(-4)^2 = -16$ instead of $+16$ on calculators when missing parentheses.
* **Forgetting the Square Root:** Leaving the final answer as $d^2 = 52$ instead of taking $\sqrt{52}$.
* **Adding Coordinates:** Mistakenly using $(x_1 + x_2)^2 + (y_1 + y_2)^2$ instead of taking the differences.
