# Topic: ME4.2 Complete Circle Theorems

Extended circle theorems govern angular subtension across circular geometry: the angle at the center is double the angle at the circumference ($2\theta$), angles in the same segment are equal, opposite angles in a cyclic quadrilateral sum to $180^\circ$, and the alternate segment theorem equates the angle between a tangent and chord to the angle subtended in the alternate segment.

---

### 1. Circle Theorem Breakdown

| Theorem Name | Visual / Structural Setup | Mathematical Identity |
| --- | --- | --- |
| Angle at Center | Subtended by same arc to center $O$ and circumference | $\theta_{\text{center}} = 2 \times \theta_{\text{circumference}}$ |
| Angles in Same Segment | Subtended by same chord/arc to circumference | $\alpha = \beta$ (Bow-tie / Butterfly shape) |
| Cyclic Quadrilateral | All 4 vertices touch the circle circumference | $A + C = 180^\circ \quad \text{and} \quad B + D = 180^\circ$ |
| Alternate Segment Theorem | Tangent meets chord at point of contact $P$ | Angle between tangent and chord = Angle in alternate segment. |

---

### 2. Geometry & ASCII Diagram

```
         Alternate Segment               Cyclic Quadrilateral
             C (Angle theta)                  A       B
            / \                              *-------*
           /   \                            /         \
          /     \                          /           \
  -------P-------*-------- Tangent        *-------------*
      (Angle theta)                       D             C
```

* **Center Double Angle:** Angle subtended at center $O$ is $2\theta$ for an angle $\theta$ subtended at circumference by the same arc.
* **Cyclic Criterion:** All four vertices of a cyclic quadrilateral MUST lie on the circumference (a vertex at center $O$ invalidates the rule).
* **Alternate Segment Shortcut:** Look for the triangle inside the circle touching the tangent line at one vertex: the angle between tangent and side equals the opposite interior angle.

$$\theta_{\text{center}} = 2 \theta_{\text{circumference}} \quad \text{and} \quad A + C = 180^\circ$$

---

### 3. Worked Example

> **Question:**
> Points $A, B, C, D$ lie on a circle. Tangent $TPT'$ touches the circle at $A$.
> 1. Given angle $\angle AOB = 110^\circ$ where $O$ is the circle center, calculate angle $\angle ACB$ at the circumference.
> 2. Given cyclic quadrilateral $ABCD$ with $\angle ADC = 105^\circ$, calculate opposite angle $\angle ABC$.
> 3. Tangent $BAT'$ makes an angle of $52^\circ$ with chord $AB$. State the size of $\angle ACB$ in the alternate segment.

**Step 1: Calculate $\angle ACB$ at Circumference**

1. Apply Angle at Center theorem ($\theta_{\text{center}} = 2 \theta_{\text{circ}}$):

$$\angle ACB = \frac{\angle AOB}{2} = \frac{110^\circ}{2} = 55^\circ$$

**Step 2: Calculate Opposite Angle in Cyclic Quadrilateral**

1. Apply Cyclic Quadrilateral theorem ($B + D = 180^\circ$):

$$\angle ABC = 180^\circ - \angle ADC = 180^\circ - 105^\circ = 75^\circ$$

**Step 3: Calculate Angle via Alternate Segment Theorem**

1. Apply Alternate Segment theorem:

$$\angle ACB = \angle TAB = 52^\circ$$

2. **Angle at Circumference $\angle ACB$:** $55^\circ$ (Reason: Angle at center is twice angle at circumference)
3. **Opposite Cyclic Angle $\angle ABC$:** $75^\circ$ (Reason: Opposite angles in a cyclic quadrilateral sum to $180^\circ$)
4. **Alternate Segment Angle $\angle ACB$:** $52^\circ$ (Reason: Alternate segment theorem)

---

### 4. Common Examiner Traps

* **False Cyclic Quadrilaterals:** Applying cyclic quadrilateral sum ($180^\circ$) to a 4-sided shape where one vertex is at the center $O$ instead of the circumference.
* **Misapplying Alternate Segment:** Selecting the adjacent interior angle rather than the angle in the alternate (opposite) segment.
* **Center vs Circumference Confusion:** Multiplying by 2 instead of dividing by 2 when moving from center angle to circumference angle.
