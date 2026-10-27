# C1.15 Time & Time Conversions (Core Tier)

## Base-60 Time Calculations

Unlike decimal measurement systems (like metres or grams) that operate in base-10, time operates in **base-60**:
* $1\text{ hour} = 60\text{ minutes}$
* $1\text{ minute} = 60\text{ seconds}$
* $1\text{ day} = 24\text{ hours}$

Failing to account for base-60 leads to major calculation errors—such as assuming that $2\text{ hours } 45\text{ minutes}$ is $2.45\text{ hours}$.

---

## 12-Hour vs 24-Hour Clock Systems

| 12-Hour Clock | 24-Hour Clock Format | Conversion Rule |
| :--- | :--- | :--- |
| **8:15 am** | `08 15` or `08:15` | Morning times (am): Add leading zero if single digit. |
| **12:00 pm (Noon)** | `12 00` or `12:00` | Midday (noon): Remains 12:00. |
| **3:45 pm** | `15 45` or `15:45` | Afternoon/evening (pm): **Add 12 hours** ($3 + 12 = 15$). |
| **11:30 pm** | `23 30` or `23:30` | Night (pm): **Add 12 hours** ($11 + 12 = 23$). |
| **12:15 am (Midnight)** | `00 15` or `00:15` | Midnight hour: **Subtract 12 hours** ($12 - 12 = 00$). |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Journey Time & Departure Calculation
A flight leaves London at `21 40` on Tuesday and arrives in Dubai `7 hours and 35 minutes` later. Dubai time is `4 hours ahead` of London time.

(a) Calculate the arrival time in London local time.  
(b) Calculate the arrival time in Dubai local time (including the day).

#### Solution & Line-by-Line Annotations

**(a) Finding London arrival time:**

1. **Add hours to departure time**:
   $$\text{Departure} = 21:40 + 7\text{ hours} = 28:40$$
   Since $28:40 \ge 24:00$, subtract $24$ hours (crossing midnight into Wednesday):
   $$28:40 - 24:00 = 04:40$$

2. **Add remaining 35 minutes**:
   $$04:40 + 35\text{ minutes} = 04:75$$
   Since $75\text{ minutes} \ge 60\text{ minutes}$, convert $60\text{ min} = 1\text{ hour}$:
   $$04:75 \rightarrow 05:15\text{ (Wednesday morning)}$$

3. **London Arrival Time**: `05:15` on Wednesday.

**(b) Finding Dubai local arrival time:**
1. Dubai is $+4\text{ hours}$ ahead:
   $$05:15 + 4\text{ hours} = 09:15$$
2. **Dubai Arrival Time**: `09:15` on Wednesday.

---

### Question 2: Converting Minutes to Decimal Hours
Convert $1\text{ hour } 48\text{ minutes}$ into decimal hours.

#### Solution & Line-by-Line Annotations

1. Divide minutes by $60$:
   $$48\text{ minutes} = \frac{48}{60} = 0.8\text{ hours}$$

2. Add to whole hours:
   $$1 + 0.8 = 1.8\text{ hours}$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Treating 1 hour 48 minutes as 1.48 hours**  
  *Why it happens*: Candidates write minutes directly after the decimal point.  
  *The Correction*: Always divide minutes by $60$! $48 \div 60 = 0.8$, so $1\text{ hour } 48\text{ min} = 1.8\text{ hours}$.

* **Mistake: 24-Hour Clock Notation Errors**  
  *Why it happens*: Writing `3:45 pm` as `15:45 pm`.  
  *The Correction*: 24-hour clock notation **never** includes "am" or "pm". Write `15:45` or `15 45`.
