# ME2.9 Graphs in Practical Situations | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")
Kinematic travel graphs represent motion over time. In a speed-time graph, the vertical axis plots speed ($v$) and the horizontal axis plots time ($t$). Two essential mathematical properties unlock all physical kinematic values: the gradient of a speed-time graph measures acceleration, and the area under a speed-time graph calculates total distance traveled.

Think of the area under a speed-time graph as filling a reservoir. Each second of motion adds a strip of area (speed $\times$ time = distance). For linear speed changes, breaking the area down into basic geometric shapes (triangles, rectangles, trapeziums) yields the exact distance traveled.

## 2. Key Definitions, Principles & Formulas
- **Speed-Time Graph Key Principles**:
  - **Gradient** = $\text{Acceleration } a = \frac{\Delta v}{\Delta t} = \frac{v - u}{t}$
  - **Negative Gradient** = Deceleration / Retardation
  - **Area Under Graph** = Total Distance Traveled ($s$)
- **Area Calculation Formulas**:
  - Triangle: $\text{Area} = \frac{1}{2} \times \text{base} \times \text{height}$
  - Rectangle: $\text{Area} = \text{base} \times \text{height}$
  - Trapezium: $\text{Area} = \frac{1}{2}(a + b)h$
- **Average Speed**:
  $$\text{Average Speed} = \frac{\text{Total Distance Traveled}}{\text{Total Time Taken}}$$

> 💡 **Exam Tip**: Use the trapezium area formula $\text{Area} = \frac{1}{2}(a + b)h$ to calculate distance across accelerating, constant speed, and decelerating phases in a single line of working!

> ⚠️ **Common Misconception**: Students often confuse distance-time graphs with speed-time graphs. A horizontal line on a distance-time graph means stationary ($v = 0$). A horizontal line on a speed-time graph means moving at constant speed ($a = 0$).

## 3. Step-by-Step Method & Worked Exam Demonstration

### Worked Example 1: Kinematic Calculations from Speed-Time Graphs
A train accelerates uniformly from rest to a speed of $24\text{ m/s}$ in $20\text{ seconds}$. It travels at this constant speed of $24\text{ m/s}$ for $T\text{ seconds}$, and then decelerates uniformly to rest in $15\text{ seconds}$. The total distance traveled for the entire journey is $1320\text{ metres}$.

(a) Calculate the acceleration of the train during the first $20\text{ seconds}$ in $\text{m/s}^2$.
(b) Calculate the value of constant speed duration $T$.
(c) Calculate the total journey time.

#### Solution:
(a)
- **Step 1: Identify initial speed $u=0$, final speed $v=24$, and time $t=20$.**
- **Step 2: Calculate gradient (acceleration).**
  $$\text{Acceleration } a = \frac{\Delta v}{\Delta t} = \frac{24 - 0}{20} = 1.2\text{ m/s}^2$$

(b)
- **Step 1: Express total distance as the area of a trapezium.**
  $$\text{Parallel sides}: \quad a = T, \quad b = 20 + T + 15 = T + 35$$
  $$\text{Height (peak speed)}: \quad h = 24$$
- **Step 2: Write down the area formula and set equal to total distance $1320\text{ m}$.**
  $$\text{Area} = \frac{1}{2}(a + b)h = \frac{1}{2} (T + [T + 35]) \times 24 = 1320$$
- **Step 3: Simplify the equation.**
  $$12(2T + 35) = 1320$$
- **Step 4: Divide by $12$.**
  $$2T + 35 = \frac{1320}{12} = 110$$
- **Step 5: Solve for $T$.**
  $$2T = 110 - 35 = 75 \implies T = 37.5\text{ seconds}$$

(c)
- **Step 1: Sum all three time intervals.**
  $$\text{Total Time} = 20 + T + 15 = 20 + 37.5 + 15 = 72.5\text{ seconds}$$

## 4. Common Misconceptions & Diagnostic Exam Pitfalls
- **Confusing Acceleration and Speed**: Stating that a horizontal line on a speed-time graph has zero speed (it has zero *acceleration*, but non-zero constant speed).
- **Trapezium Parallel Side Misidentification**: Setting parallel side $a = T + 20$ instead of $a = T$ when identifying the top constant-speed boundary.
- **Unit Mismatches**: Combining speed in $\text{km/h}$ with time in seconds without performing unit conversions.

## 5. Key Terms & Revision Summary
| Graph Feature | Distance-Time Graph ($s$-$t$) | Speed-Time Graph ($v$-$t$) |
| :--- | :--- | :--- |
| **Gradient ($\frac{\Delta y}{\Delta x}$)** | Speed ($v$) | Acceleration ($a$) |
| **Horizontal Line** | Stationary ($v = 0$) | Constant Speed ($a = 0$) |
| **Area Under Curve** | No standard physical meaning | Distance Traveled ($s$) |
| **Negative Gradient** | Returning toward origin | Deceleration / Retardation |
