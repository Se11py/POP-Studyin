# E1.17 Exponential Growth & Decay Models (Extended Tier)

## Modeling Real-World Exponential Growth & Decay

In Extended Tier Mathematics, **exponential growth and decay** models describe physical, biological, and financial processes where quantities change at a rate proportional to their current size (such as population growth, bacterial division, radioactive decay, and asset depreciation).

---

## The General Exponential Growth & Decay Formula

$$N = N_0 \left(1 \pm \frac{r}{100}\right)^t$$

* **$N$**: Final quantity after time $t$
* **$N_0$**: Initial quantity at time $t = 0$
* **$r$**: Percentage rate of growth ($+$) or decay ($-$) per time unit ($\%$)
* **$t$**: Number of time periods (years, hours, days)

---

## Growth vs Decay Comparison Table

| Feature | Exponential Growth | Exponential Decay |
| :--- | :--- | :--- |
| **Formula** | $N = N_0 \left(1 + \frac{r}{100}\right)^t$ | $N = N_0 \left(1 - \frac{r}{100}\right)^t$ |
| **Multiplier ($k$)** | $k > 1$ (e.g. $5\% \text{ growth} \implies 1.05$) | $0 < k < 1$ (e.g. $5\% \text{ decay} \implies 0.95$) |
| **Physical Application** | Population growth, compound interest | Radioactive decay, vehicle depreciation |
| **Asymptotic Line** | Curves upwards towards $+\infty$ | Curves downwards towards horizontal axis ($N = 0$) |

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Population Growth Model
The population of a city in 2020 was $450\,000$. The population increases exponentially at a rate of $2.4\%$ per year.

(a) Estimate the population in 2028, correct to the nearest $1000$ people.  
(b) Calculate the percentage increase over the 8-year period.

#### Solution & Line-by-Line Annotations

**(a) Finding population in 2028 ($t = 8$ years):**

1. Identify multiplier: $1 + \frac{2.4}{100} = 1.024$.
2. Apply formula:
   $$N = 450\,000 \times (1.024)^8 = 450\,000 \times 1.209825... = 544\,421.6...$$
3. Round to nearest $1000$:
   $$544\,000 \text{ people}$$

**(b) Calculating percentage increase:**
$$\text{Percentage Increase} = \frac{544\,421.6 - 450\,000}{450\,000} \times 100\% = 20.98...\% \approx 21.0\% \quad (3\text{ s.f.})$$

---

### Question 2: Vehicle Depreciation (Exponential Decay)
A car is purchased for $\$28\,000$. It depreciates exponentially at a rate of $15\%$ per year. Calculate its value after $4$ years.

#### Solution & Line-by-Line Annotations

1. Determine decay multiplier: $1 - \frac{15}{100} = 0.85$.
2. Apply decay formula:
   $$N = 28\,000 \times (0.85)^4 = 28\,000 \times 0.522006... = \$14\,616.175...$$
3. Round to 2 decimal places for currency:
   $$\text{Value after 4 years} = \$14\,616.18$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Linear Multiplier Error**  
  *Why it happens*: Calculating 4 years of $15\%$ decay as a total $60\%$ drop ($28000 \times 0.40 = 11200$).  
  *The Correction*: Depreciation is applied to the **reduced value** each year ($0.85^4 = 0.522$), NOT simple linear reduction.
