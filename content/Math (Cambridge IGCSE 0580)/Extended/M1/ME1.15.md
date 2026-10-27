# E1.15 Time Zone Calculations & Base-60 Operations (Extended Tier)

## Extended Time Calculations & Multi-Zone Journeys

In Extended Tier Mathematics, time calculations involve international time zones, long-distance flight durations crossing the International Date Line, and converting compound speed-time rates into seconds or decimal hours.

---

## International Time Zone Strategy

1. Convert all times to a **single reference time zone** (e.g. UTC/GMT or departure city local time) before adding flight durations.
2. Remember that traveling **East** adds hours ($+$), while traveling **West** subtracts hours ($-$).
3. Convert minutes to decimal hours using $\frac{\text{minutes}}{60}$.

---

## Step-by-Step Worked Exam Demonstrations

### Question: Transcontinental Flight Calculation
A flight departs from New York (UTC$-5$) at `22:15` on Thursday.  
The flight time is `14 hours and 40 minutes`.  
The destination is Tokyo (UTC$+9$).

Calculate the local day and time when the flight arrives in Tokyo.

#### Solution & Line-by-Line Annotations

1. **Step 1: Calculate time zone difference between New York and Tokyo**:
   $$\text{Difference} = (+9) - (-5) = 14\text{ hours ahead}$$

2. **Step 2: Add flight duration to departure time (in New York time)**:
   $$\text{Departure} = 22:15 \text{ (Thursday)}$$
   $$22:15 + 14\text{ hours } 40\text{ min} = 36:55$$
   Subtract $24$ hours (moves to Friday):
   $$36:55 - 24:00 = 12:55\text{ (Friday, New York time)}$$

3. **Step 3: Convert to Tokyo local time by adding $+14$ hours**:
   $$12:55 + 14\text{ hours} = 26:55$$
   Subtract $24$ hours (moves to Saturday):
   $$26:55 - 24:00 = 02:55\text{ (Saturday)}$$

4. **Tokyo Local Arrival Time**: `02:55` on Saturday.

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Forgetting Day Shifts Across Midnight**  
  *Why it happens*: Failing to advance the day from Thursday to Friday and then to Saturday when total hours exceed $24$.  
  *The Correction*: Track every 24-hour block explicitly!
