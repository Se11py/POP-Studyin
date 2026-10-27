# C1.12 Rates & Speed, Distance, Time (Core Tier)

## What Is a Rate?

A **rate** is a comparison between two physical quantities measured in **different units**. Unlike a ratio (which compares quantities of the same unit and has no units itself), a rate always includes compound units such as:
* **Speed**: $\text{metres per second (m/s)}$ or $\text{kilometres per hour (km/h)}$
* **Fuel Consumption**: $\text{litres per } 100\text{ km (L/100km)}$
* **Exchange Rate**: $\text{currency A per currency B}$

The word **"per"** in mathematics always means **"divided by"**.

---

## Speed, Distance, Time (SDT) Triangle & Formulas

```
       /  D  \        D = Speed × Time
      /------- \      Speed = Distance ÷ Time
     /  S  |  T \     Time = Distance ÷ Speed
    +------------+
```

* **Distance ($D$)**: Measured in $\text{metres (m)}$ or $\text{kilometres (km)}$.
* **Speed ($S$)**: Measured in $\text{m/s}$ or $\text{km/h}$.
* **Time ($T$)**: Measured in $\text{seconds (s)}$ or $\text{hours (h)}$.

$$\text{Speed} = \frac{\text{Distance}}{\text{Time}}, \quad \text{Distance} = \text{Speed} \times \text{Time}, \quad \text{Time} = \frac{\text{Distance}}{\text{Speed}}$$

---

## Unit Conversions: Speed & Time

### 1. Converting Speed Units ($\text{km/h} \leftrightarrow \text{m/s}$)
* To convert from $\text{km/h}$ to $\text{m/s}$: divide by $3.6$  
  $$\text{Speed in m/s} = \frac{\text{Speed in km/h}}{3.6}$$
* To convert from $\text{m/s}$ to $\text{km/h}$: multiply by $3.6$  
  $$\text{Speed in km/h} = \text{Speed in m/s} \times 3.6$$

### 2. Converting Minutes to Decimal Hours
* Hours and minutes use base-60, NOT base-10!
* To convert minutes to decimal hours, **divide by 60**:
  $$30\text{ minutes} = \frac{30}{60} = 0.5\text{ hours}$$
  $$45\text{ minutes} = \frac{45}{60} = 0.75\text{ hours}$$
  $$15\text{ minutes} = \frac{15}{60} = 0.25\text{ hours}$$
  $$24\text{ minutes} = \frac{24}{60} = 0.4\text{ hours}$$

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Average Speed & Time Conversion
A car travels a distance of $180\text{ km}$ in $2\text{ hours and } 15\text{ minutes}$. Calculate the average speed of the car in $\text{km/h}$.

#### Solution & Line-by-Line Annotations

1. **Step 1: Convert time into decimal hours**:
   $$15\text{ minutes} = \frac{15}{60} = 0.25\text{ hours}$$
   $$\text{Total Time } T = 2 + 0.25 = 2.25\text{ hours}$$

2. **Step 2: Apply Speed formula**:
   $$\text{Speed} = \frac{\text{Distance}}{\text{Time}} = \frac{180\text{ km}}{2.25\text{ hours}} = 80\text{ km/h}$$

---

### Question 2: Average Speed over Multi-Stage Journeys
A runner completes a $10\text{ km}$ race. She runs the first $6\text{ km}$ at a speed of $12\text{ km/h}$ and the remaining $4\text{ km}$ at a speed of $10\text{ km/h}$. Calculate her average speed for the entire $10\text{ km}$ journey.

#### Solution & Line-by-Line Annotations

1. **Step 1: Calculate time for Stage 1 ($T_1$)**:
   $$T_1 = \frac{\text{Distance}_1}{\text{Speed}_1} = \frac{6}{12} = 0.5\text{ hours}$$

2. **Step 2: Calculate time for Stage 2 ($T_2$)**:
   $$T_2 = \frac{\text{Distance}_2}{\text{Speed}_2} = \frac{4}{10} = 0.4\text{ hours}$$

3. **Step 3: Calculate total distance and total time**:
   $$\text{Total Distance} = 6 + 4 = 10\text{ km}$$
   $$\text{Total Time} = 0.5 + 0.4 = 0.9\text{ hours}$$

4. **Step 4: Calculate overall average speed**:
   $$\text{Average Speed} = \frac{\text{Total Distance}}{\text{Total Time}} = \frac{10}{0.9} = 11.111...\text{ km/h} \approx 11.1\text{ km/h} \quad (3\text{ s.f.})$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Treating 2 hours 15 minutes as 2.15 hours**  
  *Why it happens*: Assuming time works in decimals of 100.  
  *The Correction*: $15\text{ minutes} = \frac{15}{60} = 0.25\text{ hours}$. Using $2.15$ produces an incorrect speed calculation ($\frac{180}{2.15} = 83.7\text{ km/h}$).

* **Mistake: Averaging Speeds Directly**  
  *Why it happens*: In Question 2, adding $12 + 10 = 22$ and dividing by $2$ to get $11\text{ km/h}$.  
  *The Correction*: You **cannot** average speeds directly! You MUST calculate $\frac{\text{Total Distance}}{\text{Total Time}}$.
