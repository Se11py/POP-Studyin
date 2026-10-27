# ME2.12 Functions | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
A function is an algebraic machine that takes an input value $x$, applies a specific set of operations, and outputs a unique result $f(x)$. Composite functions chain two machines together so that the output of the first function becomes the input of the second: $(fg)(x) = f(g(x))$. Inverse functions ($f^{-1}(x)$) perform the exact reverse operations in reverse order, undoing the function machine to return back to the original input $x$.

Think of a function $f(x) = 2x + 3$ as putting on socks and shoes. The inverse function $f^{-1}(x)$ is the exact process of taking off shoes and socks: reversing the operations (subtracting 3 instead of adding 3) and reversing the order (dividing by 2 last instead of multiplying by 2 first!).

## 2. Key Definitions, Principles & Formulas
- **Function Notation**:
  - $f(x) = 3x - 5$ or $f : x \mapsto 3x - 5$
  - Evaluating $f(4)$: Replace $x$ with $4 \implies f(4) = 3(4) - 5 = 7$.
- **Composite Functions ($fg(x)$ or $f(g(x))$)**:
  - Apply the **RIGHT-HAND function FIRST**, then feed the result into the left-hand function:
    $$\text{Given } f(x) = x^2, \, g(x) = x + 3 \implies fg(x) = f(g(x)) = (x + 3)^2$$
    $$gf(x) = g(f(x)) = x^2 + 3$$
  - Note: In general, $fg(x) \neq gf(x)$ (composition is non-commutative).
- **Inverse Functions ($f^{-1}(x)$)**:
  - Step 1: Replace $f(x)$ with $y$.
  - Step 2: Swap variables $x$ and $y$ (or rearrange for $x$).
  - Step 3: Rearrange to make $y$ the subject.
  - Step 4: Replace $y$ with $f^{-1}(x)$.
- **Identity Property**:
  $$f(f^{-1}(x)) = f^{-1}(f(x)) = x$$

> 💡 **Exam Tip**: In composite function $fg(x)$, remember the order: $g$ acts FIRST on $x$, then $f$ acts on $g(x)$. Work from inside out / right to left!

> ⚠️ **Common Misconception**: Students often confuse $f^{-1}(x)$ with a reciprocal $\frac{1}{f(x)}$. $f^{-1}(x)$ means the INVERSE FUNCTION, NOT $\frac{1}{f(x)}$.

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Evaluating Composites and Finding Inverse Functions
Functions $f$, $g$, and $h$ are defined by:
$$f(x) = 3x - 4, \quad g(x) = \frac{2}{x + 1} \, (x \neq -1), \quad h(x) = x^2 + 1$$

(a) Calculate $fg(3)$.
(b) Find an expression for $gf(x)$ in its simplest form.
(c) Find $f^{-1}(x)$, the inverse function of $f(x)$.
(d) Solve the equation $h(x) = f(5)$.

#### Solution:
(a)
- **Step 1: Evaluate the inner function $g(3)$ first.**
  $$g(3) = \frac{2}{3 + 1} = \frac{2}{4} = \frac{1}{2}$$
- **Step 2: Substitute $g(3) = \frac{1}{2}$ into outer function $f(x)$.**
  $$fg(3) = f\left(\frac{1}{2}\right) = 3\left(\frac{1}{2}\right) - 4 = 1.5 - 4 = -2.5$$

(b)
- **Step 1: Write down $gf(x) = g(f(x))$ by substituting $f(x) = 3x - 4$ into $g(x)$.**
  $$gf(x) = \frac{2}{(3x - 4) + 1}$$
- **Step 2: Simplify the denominator.**
  $$gf(x) = \frac{2}{3x - 3} \quad \text{or} \quad \frac{2}{3(x - 1)}$$

(c)
- **Step 1: Set $y = f(x) = 3x - 4$.**
  $$y = 3x - 4$$
- **Step 2: Rearrange the equation to make $x$ the subject.**
  $$y + 4 = 3x \implies x = \frac{y + 4}{3}$$
- **Step 3: Replace $x$ with $f^{-1}(x)$ and variable $y$ with $x$.**
  $$f^{-1}(x) = \frac{x + 4}{3}$$

(d)
- **Step 1: Evaluate $f(5)$.**
  $$f(5) = 3(5) - 4 = 15 - 4 = 11$$
- **Step 2: Set $h(x) = 11$.**
  $$x^2 + 1 = 11$$
- **Step 3: Solve for $x$.**
  $$x^2 = 10 \implies x = \pm \sqrt{10} \approx \pm 3.16 \quad \text{(3 s.f.)}$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Order Inversion in Composites**: Evaluating $fg(x)$ as $g(f(x))$ by applying the left function first.
- **Inverse notation confusion**: Writing $f^{-1}(x) = \frac{1}{3x - 4}$ instead of carrying out algebraic rearrangement to get $\frac{x + 4}{3}$.
- **Missing Negative Roots**: Giving only $x = +\sqrt{10}$ instead of $x = \pm \sqrt{10}$ when solving $x^2 = 10$.

## 5. Key Terms & Revision Summary
| Notation | Operation | Execution Step |
| :--- | :--- | :--- |
| **$f(a)$** | Evaluation | Replace variable $x$ with value $a$ |
| **$fg(x)$** | Composite | Substitute expression $g(x)$ into $f(x)$ |
| **$gf(x)$** | Composite | Substitute expression $f(x)$ into $g(x)$ |
| **$f^{-1}(x)$** | Inverse Function | Set $y = f(x)$, solve for $x$, swap variables |
