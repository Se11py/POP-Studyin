# C1.10 Limits of Accuracy & Bounds (Core Tier)

## What Are Bounds and Why Do They Exist?

When a physical quantity (like length, mass, or time) is measured with a tool, the recorded number is always an approximation rounded to a specific degree of accuracy (e.g. nearest $10\text{ g}$, nearest $1\text{ cm}$, or nearest $0.1\text{ s}$).

**Bounds** define the exact upper and lower limits of the true value before rounding occurred.
* **Lower Bound (LB)**: The absolute smallest true value that rounds up to the recorded number.
* **Upper Bound (UB)**: The smallest boundary value that would round up to the *next* recorded step.
* **Error Interval**: The continuous mathematical range containing the true value $x$:
  $$\text{LB} \le x < \text{UB}$$

---

## The Half-Unit Rule

To find the upper and lower bounds for any rounded number:

1. Identify the **unit of accuracy** to which the number was rounded (e.g., nearest $10$, nearest $1$, nearest $0.1$).
2. Divide that unit of accuracy by $2$ to find the **half-unit** ($H$):
   $$H = \frac{\text{Unit of Accuracy}}{2}$$
3. Calculate:
   $$\text{Lower Bound (LB)} = \text{Recorded Value} - H$$
   $$\text{Upper Bound (UB)} = \text{Recorded Value} + H$$

---

## Half-Unit Calculation Reference Table

| Recorded Value | Accuracy Statement | Unit of Accuracy | Half-Unit ($H$) | Lower Bound (LB) | Upper Bound (UB) | Error Interval |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **80 kg** | Nearest $10\text{ kg}$ | $10$ | $5$ | $75\text{ kg}$ | $85\text{ kg}$ | $75 \le x < 85$ |
| **14 cm** | Nearest $1\text{ cm}$ | $1$ | $0.5$ | $13.5\text{ cm}$ | $14.5\text{ cm}$ | $13.5 \le x < 14.5$ |
| **6.8 s** | Nearest $0.1\text{ s}$ | $0.1$ | $0.05$ | $6.75\text{ s}$ | $6.85\text{ s}$ | $6.75 \le x < 6.85$ |
| **4.50 m** | 2 decimal places | $0.01$ | $0.005$ | $4.495\text{ m}$ | $4.505\text{ m}$ | $4.495 \le x < 4.505$ |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Finding Bounds and Error Intervals
A length $L$ is measured as $12.4\text{ cm}$, correct to $1$ decimal place.  
(a) Write down the lower bound and upper bound of $L$.  
(b) Write down the error interval for $L$.

#### Solution & Line-by-Line Annotations

**(a) Finding Lower and Upper Bounds:**
1. Unit of accuracy = $0.1\text{ cm}$ ($1$ decimal place).
2. Calculate half-unit $H$:
   $$H = \frac{0.1}{2} = 0.05\text{ cm}$$
3. Calculate Lower Bound:
   $$\text{LB} = 12.4 - 0.05 = 12.35\text{ cm}$$
4. Calculate Upper Bound:
   $$\text{UB} = 12.4 + 0.05 = 12.45\text{ cm}$$

**(b) Stating the Error Interval:**
$$\text{Error Interval}: 12.35\text{ cm} \le L < 12.45\text{ cm}$$
*Annotation: Notice $\le$ is used for $12.35$ because $12.35$ rounds to $12.4$. $<$ is used for $12.45$ because $12.45$ would round up to $12.5$.*

---

### Question 2: Bounds for Perimeter
A rectangular field has length $L = 50\text{ m}$ and width $W = 30\text{ m}$, both measured to the nearest metre. Calculate the upper bound for the perimeter of the field.

#### Solution & Line-by-Line Annotations

1. Unit of accuracy = $1\text{ m} \implies H = \frac{1}{2} = 0.5\text{ m}$.
2. Calculate Upper Bound for Length:
   $$\text{UB}_L = 50 + 0.5 = 50.5\text{ m}$$
3. Calculate Upper Bound for Width:
   $$\text{UB}_W = 30 + 0.5 = 30.5\text{ m}$$
4. Calculate maximum perimeter using upper bounds:
   $$\text{UB}_{\text{Perimeter}} = 2(\text{UB}_L) + 2(\text{UB}_W) = 2(50.5) + 2(30.5) = 101 + 61 = 162\text{ m}$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Writing $12.4499\dots$ Instead of $12.45$ as Upper Bound**  
  *Why it happens*: Candidates think $12.45$ is wrong because $12.45$ rounds to $12.5$.  
  *The Correction*: In error interval notation ($12.35 \le L < 12.45$), the strict inequality symbol ($<$) handles the boundary. $12.45$ is the exact upper bound. Never write $12.449$!

* **Mistake: Halving the Recorded Value Instead of the Unit of Accuracy**  
  *Why it happens*: Halving $50\text{ m}$ to get $25\text{ m}$.  
  *The Correction*: Always halve the **unit of accuracy** ($1\text{ m} \implies 0.5\text{ m}$), NOT the measurement itself.
