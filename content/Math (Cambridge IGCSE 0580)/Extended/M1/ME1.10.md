# E1.10 Upper & Lower Bounds in Calculations (Extended Tier)

## Upper and Lower Bounds in Complex Formulas

In Extended Tier Mathematics, bounds questions move beyond simple measurement intervals into calculating the **Upper Bound (UB)** and **Lower Bound (LB)** of complex derived formulas involving addition, subtraction, multiplication, division, powers, and geometry.

The fundamental objective is determining which combination of upper and lower bounds produces the absolute **maximum** or **minimum** possible result for a given formula.

---

## Bounds Arithmetic Master Combinations Table

| Formula / Operation | Target Output | Numerator Bound | Denominator Bound | Why? (Mathematical Logic) |
| :--- | :--- | :--- | :--- | :--- |
| **Addition ($A + B$)** | **Maximum (UB)** | $\text{UB}_A + \text{UB}_B$ | — | Summing upper bounds maximizes total |
| **Addition ($A + B$)** | **Minimum (LB)** | $\text{LB}_A + \text{LB}_B$ | — | Summing lower bounds minimizes total |
| **Subtraction ($A - B$)** | **Maximum (UB)** | $\text{UB}_A - \text{LB}_B$ | — | Subtracting smallest $B$ leaves largest remaining |
| **Subtraction ($A - B$)** | **Minimum (LB)** | $\text{LB}_A - \text{UB}_B$ | — | Subtracting largest $B$ leaves smallest remaining |
| **Multiplication ($A \times B$)** | **Maximum (UB)** | $\text{UB}_A \times \text{UB}_B$ | — | Product of maximum positive numbers |
| **Multiplication ($A \times B$)** | **Minimum (LB)** | $\text{LB}_A \times \text{LB}_B$ | — | Product of minimum positive numbers |
| **Division ($\frac{A}{B}$)** | **Maximum (UB)** | $\text{UB}_A$ | $\text{LB}_B$ | Maximize top, **minimize bottom** |
| **Division ($\frac{A}{B}$)** | **Minimum (LB)** | $\text{LB}_A$ | $\text{UB}_B$ | Minimize top, **maximize bottom** |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Speed, Distance, Time Bounds Calculation
A car travels a distance $d = 120\text{ km}$, correct to the nearest $10\text{ km}$.  
The time taken $t = 1.5\text{ hours}$, correct to $1$ decimal place.

(a) Calculate the lower bound for the average speed of the car.  
(b) Calculate the upper bound for the average speed of the car.

#### Solution & Line-by-Line Annotations

**(a) Finding Lower Bound of Speed ($\text{Speed} = \frac{d}{t}$):**

1. **Step 1: Calculate bounds for Distance $d$ (nearest $10\text{ km} \implies H = 5\text{ km}$)**:
   $$\text{LB}_d = 120 - 5 = 115\text{ km}$$
   $$\text{UB}_d = 120 + 5 = 125\text{ km}$$

2. **Step 2: Calculate bounds for Time $t$ (nearest $0.1\text{ h} \implies H = 0.05\text{ h}$)**:
   $$\text{LB}_t = 1.5 - 0.05 = 1.45\text{ hours}$$
   $$\text{UB}_t = 1.5 + 0.05 = 1.55\text{ hours}$$

3. **Step 3: Apply Division Min-Formula ($\text{LB}_{\text{Speed}} = \frac{\text{LB}_d}{\text{UB}_t}$)**:
   $$\text{LB}_{\text{Speed}} = \frac{115\text{ km}}{1.55\text{ hours}} = 74.1935... \approx 74.2\text{ km/h} \quad (3\text{ s.f.})$$

**(b) Finding Upper Bound of Speed:**

1. **Apply Division Max-Formula ($\text{UB}_{\text{Speed}} = \frac{\text{UB}_d}{\text{LB}_t}$)**:
   $$\text{UB}_{\text{Speed}} = \frac{125\text{ km}}{1.45\text{ hours}} = 86.2068... \approx 86.2\text{ km/h} \quad (3\text{ s.f.})$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Inverting Bounds in Division or Subtraction**  
  *Why it happens*: Calculating $\text{LB}_{\text{Speed}} = \frac{\text{LB}_d}{\text{LB}_t} = \frac{115}{1.45} = 79.3$.  
  *The Correction*: Dividing by a smaller denominator makes a fraction LARGER! To minimize $\frac{d}{t}$, you MUST divide $\text{LB}_d$ by the **Maximum Time $\text{UB}_t$**.

* **Mistake: Premature Rounding of Bounds**  
  *Why it happens*: Rounding intermediate bound values before performing division.  
  *The Correction*: Keep exact decimal bounds ($1.45$ and $1.55$) in your division step!
