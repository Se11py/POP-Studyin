# ME2.13 Differentiation & Kinematics | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Differentiation is the fundamental branch of calculus that determines the exact instantaneous rate of change (gradient) of a non-linear function at any point. The derivative, written as $\frac{dy}{dx}$ or $f'(x)$, gives a universal formula for the gradient of the tangent line to the curve $y = f(x)$.

Think of differentiation like a digital speedometer. Position or curve height tells you *where* you are, but the derivative $\frac{dy}{dx}$ tells you exactly *how fast* your height is changing at that split second. When a curve reaches the crest of a hill (maximum) or the trough of a valley (minimum), it flattens out horizontally for a moment—meaning its gradient $\frac{dy}{dx} = 0$!

## 2. Key Definitions, Principles & Formulas
- **Power Rule for Differentiation**: For any constant $a$ and real power $n$:
  $$\frac{d}{dx}(a x^n) = n \cdot a x^{n-1}$$
  $$\frac{d}{dx}(c) = 0 \quad (\text{Derivative of any constant is zero})$$
- **Stationary Points (Turning Points)**: Points on a curve where the gradient is zero:
  $$\frac{dy}{dx} = 0$$
- **Determining Nature of Turning Points**:
  - **Local Minimum**: $\frac{dy}{dx}$ changes sign from negative to positive (slope curves up like U). Second derivative $\frac{d^2y}{dx^2} > 0$.
  - **Local Maximum**: $\frac{dy}{dx}$ changes sign from positive to negative (slope curves down like n). Second derivative $\frac{d^2y}{dx^2} < 0$.
- **Kinematics & Calculus**:
  - Distance/Displacement: $s(t)$
  - Velocity: $v(t) = \frac{ds}{dt}$
  - Acceleration: $a(t) = \frac{dv}{dt} = \frac{d^2s}{dt^2}$

> 💡 **Exam Tip**: To find turning points, ALWAYS set $\frac{dy}{dx} = 0$, solve the resulting equation for $x$, and then substitute $x$ back into the ORIGINAL equation $y = f(x)$ to find the corresponding $y$-coordinates!

> ⚠️ **Common Misconception**: Students often differentiate a constant term like $+5$ to $+5$ instead of $0$. Remember: the derivative of a constant is zero ($\frac{d}{dx}(5) = 0$).

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Finding Stationary Points and Kinematic Derivatives
(a) A curve has equation $y = 2x^3 - 3x^2 - 12x + 7$.
    (i) Find $\frac{dy}{dx}$.
    (ii) Find the coordinates of the two stationary points on the curve.
    (iii) Determine the nature of each stationary point.
(b) The distance, $s$ metres, traveled by a particle in $t$ seconds is given by $s = t^3 - 6t^2 + 9t$.
    (i) Find an expression for velocity $v$ in terms of $t$.
    (ii) Find the time $t$ when the particle is instantaneously at rest.

#### Solution:
(a)
- **(i) Step 1: Apply the power rule $\frac{d}{dx}(ax^n) = n ax^{n-1}$ term by term.**
  $$\frac{d}{dx}(2x^3) = 3 \times 2 x^{3-1} = 6x^2$$
  $$\frac{d}{dx}(-3x^2) = 2 \times (-3) x^{2-1} = -6x$$
  $$\frac{d}{dx}(-12x) = 1 \times (-12) x^{1-1} = -12$$
  $$\frac{d}{dx}(7) = 0$$
  $$\frac{dy}{dx} = 6x^2 - 6x - 12$$

- **(ii) Step 1: Set $\frac{dy}{dx} = 0$ to find stationary points.**
  $$6x^2 - 6x - 12 = 0$$
- **(ii) Step 2: Divide the equation by $6$ to simplify.**
  $$x^2 - x - 2 = 0$$
- **(ii) Step 3: Factorise the quadratic equation.**
  $$(x - 2)(x + 1) = 0 \implies x = 2 \quad \text{or} \quad x = -1$$
- **(ii) Step 4: Substitute $x = 2$ back into the original curve equation $y = 2x^3 - 3x^2 - 12x + 7$.**
  $$y = 2(2)^3 - 3(2)^2 - 12(2) + 7 = 16 - 12 - 24 + 7 = -13 \implies (2, -13)$$
- **(ii) Step 5: Substitute $x = -1$ back into the original curve equation.**
  $$y = 2(-1)^3 - 3(-1)^2 - 12(-1) + 7 = -2 - 3 + 12 + 7 = 14 \implies (-1, 14)$$
  Stationary points are $(-1, 14)$ and $(2, -13)$.

- **(iii) Step 1: Find the second derivative $\frac{d^2y}{dx^2}$.**
  $$\frac{d^2y}{dx^2} = \frac{d}{dx}(6x^2 - 6x - 12) = 12x - 6$$
- **(iii) Step 2: Evaluate $\frac{d^2y}{dx^2}$ at $x = -1$.**
  $$\frac{d^2y}{dx^2} = 12(-1) - 6 = -18 < 0 \implies (-1, 14) \text{ is a Local Maximum}$$
- **(iii) Step 3: Evaluate $\frac{d^2y}{dx^2}$ at $x = 2$.**
  $$\frac{d^2y}{dx^2} = 12(2) - 6 = +18 > 0 \implies (2, -13) \text{ is a Local Minimum}$$

(b)
- **(i) Step 1: Differentiate displacement $s(t)$ with respect to time $t$ to find velocity $v$.**
  $$v = \frac{ds}{dt} = \frac{d}{dt}(t^3 - 6t^2 + 9t) = 3t^2 - 12t + 9$$

- **(ii) Step 1: Set velocity $v = 0$ for "instantaneously at rest".**
  $$3t^2 - 12t + 9 = 0$$
- **(ii) Step 2: Divide by $3$ and factorise.**
  $$t^2 - 4t + 3 = 0 \implies (t - 1)(t - 3) = 0$$
- **(ii) Step 3: State the times when particle is at rest.**
  $$t = 1\text{ second} \quad \text{and} \quad t = 3\text{ seconds}$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Substituting into Derivative for $y$-values**: Substituting $x = 2$ back into $\frac{dy}{dx}$ instead of original $y = f(x)$, which gives $0$ instead of the actual $y$-coordinate.
- **Second Derivative Sign Confusion**: Mistaking $\frac{d^2y}{dx^2} > 0$ for a maximum. Positive second derivative means local MINIMUM (curving up).
- **Constant Differentiation Error**: Leaving constants untouched (e.g. differentiating $x^2 + 5$ as $2x + 5$ instead of $2x$).

## 5. Key Terms & Revision Summary
| Physical / Geometric Concept | Mathematical Operation | Exam Condition |
| :--- | :--- | :--- |
| **Gradient / Speed** | Derivative $\frac{dy}{dx}$ or $\frac{ds}{dt}$ | Rate of change at $x$ |
| **Stationary / Turning Point** | Set $\frac{dy}{dx} = 0$ | Solve for $x$, substitute into $y$ |
| **Local Minimum** | $\frac{d^2y}{dx^2} > 0$ | Curve bends upwards |
| **Local Maximum** | $\frac{d^2y}{dx^2} < 0$ | Curve bends downwards |
| **At Rest (Kinematics)** | Set $v = \frac{ds}{dt} = 0$ | Velocity equals zero |
