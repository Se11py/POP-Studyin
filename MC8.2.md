# Topic: MC8.2 Relative Frequency & Experimental Probability

Relative frequency estimates theoretical probability based on empirical experimental data via $\text{Relative Frequency} = \frac{f}{N}$, where $f$ is event frequency and $N$ is total trials, with expected frequency over $n$ future trials given by $E = n \times P$.

---

### 1. Relative Frequency & Experimental Summary

| Term | Definition / Formula | Application | Key Characteristic |
| --- | --- | --- | --- |
| **Experimental Probability** | $\text{Relative Frequency} = \frac{\text{Frequency } f}{\text{Total Trials } N}$ | Real-world experiments, biased dice/spinners | Based on observed data |
| **Theoretical Probability** | $P(A) = \frac{\text{Favorable outcomes}}{\text{Total equal outcomes}}$ | Fair coins, ideal dice, cards | Exact mathematical value |
| **Expected Frequency** | $\text{Expected Count} = n \times P(A)$ | Predicting outcomes in $n$ future trials | Round to nearest integer if needed |
| **Reliability Principle** | Larger sample size $N \implies$ closer to true $P(A)$ | Experimental design evaluation | More trials increase accuracy |

---

### 2. Convergence Graph of Relative Frequency

```
  Relative
  Frequency
  1.0 +
      |
  0.5 + - - - - - - - - - - - - - - - - Theoretical P(Head) = 0.5
      |  /\  /\
      | /  \/  \________/\________________
  0.0 +-----------------------------------> Number of Trials N
       0    10   50   100  500  1000
```

* **Fluctuation at Low Trials:** Small sample sizes ($N < 30$) produce volatile experimental probabilities due to random variation.
* **Convergence at High Trials:** As $N \to \infty$, relative frequency stabilizes and approaches the true theoretical probability.
* **Biased vs Fair Testing:** If relative frequency differs significantly from theoretical predictions in large trials, the device is biased.

$$\text{Relative Frequency} = \frac{f}{N} \quad \text{and} \quad E(A) = n \times P(A)$$

---

### 3. Worked Example

> **Question:**
> A biased 6-sided die is rolled $200$ times. The number of times it lands on $6$ is recorded as $58$.
> 1. Calculate the relative frequency of rolling a $6$.
> 2. Predict how many times the die will land on $6$ if rolled $1500$ times.

**Step 1: Compute relative frequency from experimental data**

1. Identify observed frequency $f = 58$ and total trials $N = 200$:

$$\text{Relative Frequency} = \frac{f}{N} = \frac{58}{200}$$

2. Simplify fraction or express as decimal:

$$\text{Relative Frequency} = \frac{29}{100} = 0.29$$

**Step 2: Calculate expected frequency for $n = 1500$ trials**

1. Use formula $\text{Expected Frequency} = n \times P(\text{rolling } 6)$:

$$E = 1500 \times 0.29$$

2. Perform multiplication:

$$E = 435$$

3. **Key result 1:** Relative frequency of rolling $6$ is $0.29$ (or $\frac{29}{100}$).
4. **Key result 2:** Expected number of sixes in $1500$ rolls is $435$.

---

### 4. Common Examiner Traps

* **Using Theoretical $1/6$ for Biased Objects:** If an experiment shows bias (e.g. 58 sixes out of 200), DO NOT use $\frac{1}{6}$; use the empirical relative frequency $0.29$.
* **Confusing Total Trials with New Sample:** When calculating expected frequency, multiply relative frequency by the NEW number of trials ($1500$), not the original experiment size ($200$).
* **Failing to State Reliability:** Question asking "How to make the estimate more reliable?" requires answer: "Conduct more trials / increase total number of experiments".

---
