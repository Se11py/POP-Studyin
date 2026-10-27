# E1.9 Estimation & Order of Magnitude (Extended Tier)

## Advanced Estimation Techniques

In Extended Tier Mathematics, estimation problems require candidate verification of complex geometric, physical, and financial models by rounding quantities to **1 significant figure (1 s.f.)** before calculation.

Estimation tests whether an answer is within the correct **order of magnitude** ($10^k$), providing a powerful diagnostic tool for catching calculator entry errors.

---

## 1 Significant Figure Rules Summary

1. Identify the **first non-zero digit** from the left (the most significant digit).
2. Look at the next digit directly to the right:
   * If $\ge 5$, round UP.
   * If $< 5$, round DOWN.
3. Replace all remaining places before the decimal point with placeholder zeroes.

---

## Step-by-Step Worked Exam Demonstrations

### Question 1: Complex Multi-Operation Estimation
By rounding each number to 1 significant figure, estimate the value of:
$$\frac{\sqrt{89.4} + 19.83}{0.194 \times 48.7}$$

Show all intermediate rounding steps.

#### Solution & Line-by-Line Annotations

1. **Step 1: Round every number to 1 s.f.**:
   * $89.4 \rightarrow 90 \quad (\text{or } 100 \text{ for exact square root } \sqrt{100}=10 \text{ or } \sqrt{81}=9)$
     *Note: In Cambridge mark schemes, } 89.4 \text{ rounds to } 90 \text{ or } 81 \text{ for easy square rooting } (\sqrt{81} = 9)*
   * $19.83 \rightarrow 20$
   * $0.194 \rightarrow 0.2$
   * $48.7 \rightarrow 50$

2. **Step 2: Substitute rounded values**:
   $$\text{Estimated Value} = \frac{\sqrt{81} + 20}{0.2 \times 50} \quad \text{or} \quad \frac{9 + 20}{10}$$

3. **Step 3: Evaluate numerator and denominator**:
   * Numerator: $9 + 20 = 29 \approx 30$
   * Denominator: $0.2 \times 50 = 10$

4. **Step 4: Compute quotient**:
   $$\text{Estimate} = \frac{30}{10} = 3$$

---

## Examiner Traps & Common Candidate Pitfalls

* **Mistake: Exact Calculator Evaluation First**  
  *Why it happens*: Evaluating the exact answer ($3.116...$) on a calculator and then rounding to $3$.  
  *The Correction*: Mark schemes award **zero marks** for exact calculation followed by rounding. You MUST round each individual number to 1 s.f. FIRST!
