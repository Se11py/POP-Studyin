# Topic: ME9.1 Advanced Data Classification & Sampling

Stratified sampling extracts a representative sample size $n$ from population $N$ containing subgroups $N_i$, ensuring proportional representation using quota formula $n_i = \frac{N_i}{N} \times n$.

---

### 1. Sampling Method Comparison

| Sampling Strategy | Definition / Quota Formula | Advantage | Potential Bias Source |
| --- | --- | --- | --- |
| **Simple Random** | Every population member has equal probability $\frac{1}{N}$ | Eliminates selection bias | May miss small subgroups |
| **Stratified Sampling** | Subgroup sample $n_i = \frac{N_i}{N} \times n$ | Reflects population structure | Complex to organize |
| **Systematic Sampling** | Select every $k^{\text{th}}$ item ($k = \frac{N}{n}$) | Simple implementation | Periodic pattern bias |
| **Convenience / Quota** | Select easily accessible subjects | Quick and cheap | High risk of selection bias |

---

### 2. Stratified Population Split

```
   TOTAL POPULATION (N = 1000)                STRATIFIED SAMPLE (n = 100)
  +-------------------------------+          +---------------------------+
  | Strata A (Grade 10): 500 (50%)|  =====>  | Strata A Sample: 50 (50%) |
  | Strata B (Grade 11): 300 (30%)|  =====>  | Strata B Sample: 30 (30%) |
  | Strata C (Grade 12): 200 (20%)|  =====>  | Strata C Sample: 20 (20%) |
  +-------------------------------+          +---------------------------+
```

* **Proportional Integrity:** Ratio of subgroup sample $n_i$ to sample size $n$ MUST equal ratio of subgroup size $N_i$ to total population $N$.
* **Rounding Constraint:** Sum of calculated subgroup samples $\sum n_i$ MUST equal total requested sample size $n$.
* **Random Sub-Selection:** Within each stratum, individuals MUST be chosen randomly.

$$n_i = \frac{N_i}{N} \times n$$

---

### 3. Worked Example

> **Question:**
> A school has $600$ students across three year groups:
> Year 9: $240$ students, Year 10: $210$ students, Year 11: $150$ students.
> 1. Calculate the number of students to sample from each year group for a stratified sample of $80$ students.
> 2. Explain why taking the first $80$ students arriving at school in the morning would produce a biased sample.

**Step 1: Calculate stratified sample count per year group**

1. Identify total population $N = 600$ and sample size $n = 80$.

2. Calculate Year 9 sample ($N_1 = 240$):

$$n_9 = \frac{240}{600} \times 80 = \frac{2}{5} \times 80 = 32$$

3. Calculate Year 10 sample ($N_2 = 210$):

$$n_{10} = \frac{210}{600} \times 80 = \frac{7}{20} \times 80 = 28$$

4. Calculate Year 11 sample ($N_3 = 150$):

$$n_{11} = \frac{150}{600} \times 80 = \frac{1}{4} \times 80 = 20$$

5. Check total sum: $32 + 28 + 20 = 80$.

**Step 2: Evaluate sampling bias**

1. Analyze convenience sampling method: Arriving early is correlated with travel method (e.g. school bus) or age (older students driving), so it does not give every student an equal chance of selection.

2. **Key result 1:** Year 9 sample $= 32$, Year 10 sample $= 28$, Year 11 sample $= 20$.
3. **Key result 2:** Early arrival sample is **biased** because it excludes students arriving later via different transport modes and fails to represent all year groups randomly.

---

### 4. Common Examiner Traps

* **Failing to Round Subgroup Counts Appropriately:** Leaving fractional sample sizes (e.g. $31.6$ students) instead of rounding to whole numbers.
* **Sum of Samples Not Matching $n$:** Rounding values independently such that $\sum n_i \neq n$. Adjust the group closest to a half boundary.
* **Vague Bias Explanations:** Writing "it is unfair" instead of explicitly explaining why the sample is non-representative (e.g. specific subgroup excluded).

---
