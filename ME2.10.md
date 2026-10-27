# Topic: ME2.10 Advanced Non-Linear Graphs & Kinematics

Gradient of a tangent to a non-linear curve measures instantaneous rate of change, and area under non-linear curves is estimated using counting squares or trapezium rule approximations: \(\text{Area} \approx \frac{1}{2}h [y_0 + 2(y_1 + y_2 + \dots) + y_n]\).

---

### 1. Non-Linear Kinematics & Estimation Breakdown

| Concept / Feature | Graphical Technique | Physical / Mathematical Interpretation |
| --- | --- | --- |
| Instantaneous Gradient | Draw geometric tangent line touching curve at single point. | Instantaneous rate of change / velocity at time \(t\) |
| Area under Non-Linear Curve | Split under-curve area into vertical trapeziums of width \(h\). | Total distance traveled or total accumulated quantity |
| Turning Point Gradient | Horizontal tangent (\(\text{gradient} = 0\)) | Maximum or minimum instantaneous value |

---

### 2. Anatomy of Tangent Gradient & Trapezium Area

```
                     y
                     |             Tangent Line at P
                     |             /
                     |            /  * Point P(x, y)
                     |           /  /
                     |    Curve /  /
                     |         /  /
       --------------+--------+--+----------- x-axis
                     |       |  |
                     |<--h-->|  | Trapeziums for Area Approximation
```

* **Geometric Tangent:** A straight line touching a continuous curve at exactly one point without crossing it locally.
* **Instantaneous Rate of Change:** Gradient of tangent line \(m = \frac{\Delta y}{\Delta x}\) at point \(P\).

$$m_{\text{instantaneous}} = \text{Gradient of Tangent Line at } P(x, y)$$

---

### 3. Worked Example

> **Question:**
> A speed-time graph for a particle is defined by \(v = 12t - t^2\) for \(0 \le t \le 10\).
> 1. Estimate the instantaneous acceleration of the particle at \(t = 4\text{ s}\) by drawing a tangent.
> 2. Estimate the distance traveled between \(t = 0\) and \(t = 4\text{ s}\) using 2 trapeziums of equal width \(h = 2\).

**Step 1: Estimate instantaneous acceleration via tangent gradient**

1. Plot curve points for \(v = 12t - t^2\): \((0,0), (2,20), (4,32), (6,36)\).
2. Draw a tangent line at \(t = 4\) passing through points \((2, 24)\) and \((6, 40)\):

$$m = \frac{40 - 24}{6 - 2} = \frac{16}{4} = 4\text{ m/s}^2$$

**Step 2: Estimate area using 2 vertical trapeziums**

1. Calculate speed values at intervals \(t = 0, 2, 4\):

$$v(0) = 0, \quad v(2) = 20, \quad v(4) = 32$$

2. Calculate sum of trapezium areas with width \(h = 2\):

$$\text{Area}_1 = \frac{1}{2}(0 + 20) \times 2 = 20$$

$$\text{Area}_2 = \frac{1}{2}(20 + 32) \times 2 = 52$$

$$\text{Total Distance} = 20 + 52 = 72\text{ metres}$$

3. **Key result 1:** Estimated instantaneous acceleration at \(t = 4\text{ s}\) is \(4\text{ m/s}^2\).
4. **Key result 2:** Estimated distance traveled is \(72\text{ m}\).

---

### 4. Common Examiner Traps

* **Chord vs Tangent Error:** Drawing a secant chord line passing through two curve points instead of a single-point tangent line.
* **Trapezium Width Miscalculation:** Using total interval width instead of individual strip width \(h\) in trapezium calculations.
