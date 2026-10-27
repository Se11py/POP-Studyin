# Topic: ME2.1 Advanced Algebraic Manipulation & Rearranging Formulae

Advanced algebraic rearrangement isolates a target variable appearing multiple times or inside roots/powers by factorising common instances: \(x(a \pm b) = c \implies x = \frac{c}{a \pm b}\).

---

### 1. Advanced Rearrangement Techniques Breakdown

| Scenario | Algebraic Strategy | Example Transformation |
| --- | --- | --- |
| Target Variable on Both Sides | Group target terms on LHS, move non-target terms to RHS. | \(ax + b = cx + d \implies ax - cx = d - b\) |
| Repeated Target Variable | Factorise out the target variable as a common factor. | \(x(a - c) = d - b \implies x = \frac{d - b}{a - c}\) |
| Target Inside Radical / Power | Isolate square root/power term first, then apply inverse power operation. | \(\sqrt{x + a} = b \implies x + a = b^2 \implies x = b^2 - a\) |

---

### 2. Anatomy of Isolation with Repeated Subject

```
                       Original Formula:  y(x + a) = b - cx
                                               |
                       Expand Brackets:   yx + ya = b - cx
                                               |
                 Group x-terms on LHS:    yx + cx = b - ya
                                               |
                   Factorise out x:       x(y + c) = b - ya
                                               |
                Divide by factor:         x = (b - ya) / (y + c)
```

* **Expansion Step:** Remove brackets containing the target variable to allow grouping.
* **Factorisation Step:** Whenever target variable appears in multiple terms, extract it to positive single power coefficient.

$$x(y + c) = b - ya \implies x = \frac{b - ya}{y + c}$$

---

### 3. Worked Example

> **Question:**
> Rearrange the formula to make \(t\) the subject:
> 1. \(r = \sqrt{\frac{3t + h}{t - 2}}\)
> 2. Calculate \(t\) when \(r = 4\) and \(h = 5\).

**Step 1: Make t the subject of the formula**

1. Square both sides to eliminate the square root radical:

$$r^2 = \frac{3t + h}{t - 2}$$

2. Multiply both sides by denominator \((t - 2)\) and expand LHS:

$$r^2(t - 2) = 3t + h \implies r^2 t - 2r^2 = 3t + h$$

3. Collect terms containing \(t\) on LHS and non-\(t\) terms on RHS:

$$r^2 t - 3t = 2r^2 + h$$

4. Factorise \(t\) on LHS and divide by \((r^2 - 3)\):

$$t(r^2 - 3) = 2r^2 + h \implies t = \frac{2r^2 + h}{r^2 - 3}$$

**Step 2: Evaluate t given specific parameters**

1. Substitute \(r = 4\) and \(h = 5\) into rearranged formula:

$$t = \frac{2(4)^2 + 5}{(4)^2 - 3}$$

2. Simplify numerator and denominator:

$$t = \frac{2(16) + 5}{16 - 3} = \frac{32 + 5}{13} = \frac{37}{13}$$

3. **Key result 1:** Formula with subject \(t\) is \(t = \frac{2r^2 + h}{r^2 - 3}\).
4. **Key result 2:** Numerical value of \(t\) is \(\frac{37}{13}\) (or \(2\frac{11}{13}\)).

---

### 4. Common Examiner Traps

* **Forgetting Bracket Expansion:** Attempting to factorise without expanding products first, leaving target terms trapped inside brackets.
* **Sign Reversal in Grouping:** Changing signs incorrectly when moving terms across equal sign, writing \(r^2 t - 3t = h - 2r^2\) instead of \(+ 2r^2\).
