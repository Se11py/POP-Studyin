# Topic: MC4.5 Basic Circle Theorems

Basic circle theorems establish geometric properties of circles: a tangent is perpendicular to the radius at the point of contact ($90^\circ$), and the angle subtended by a diameter at the circumference is a right angle ($90^\circ$).

---

### 1. Basic Circle Theorem Breakdown

| Theorem Name | Geometric Setup | Angle / Geometric Rule |
| --- | --- | --- |
| Tangent-Radius Theorem | Line touches circle at point $P$ | Tangent is perpendicular to radius: $\text{Tangent} \perp \text{Radius} \implies 90^\circ$. |
| Angle in a Semicircle | Triangle drawn inside semicircle with diameter as base | Angle subtended at circumference is $90^\circ$. |
| Tangents from External Point | Two tangents drawn to circle from point $T$ | Tangent lengths are equal ($TA = TB$); forms congruent right triangles. |
| Radius-Chord Bisector | Perpendicular line from center $O$ to chord $AB$ | Perpendicular radius bisects chord into two equal halves. |

---

### 2. Geometry & ASCII Diagram

```
            P (90°)
           / \
          /   \
         /  O  \  Semicircle
  ------A-------B------ (Diameter AB)
        
        \       
         * Tangent Line
         | 90°
         O (Center) --- Radius --- Touchpoint P
```

* **Semicircle Right Angle:** If $AB$ passes through center $O$, then for any point $P$ on the circumference, $\angle APB = 90^\circ$.
* **Tangent Orthogonality:** The angle between a tangent line and the radius drawn to the point of contact is strictly $90^\circ$.
* **Isosceles Radii:** Radii drawn from center $O$ to any points on the circumference form isosceles triangles ($OA = OB = r$).

$$\angle APB = 90^\circ \quad \text{and} \quad \text{Radius} \perp \text{Tangent } (90^\circ)$$

---

### 3. Worked Example

> **Question:**
> 1. In a circle with center $O$, $AB$ is a diameter and $C$ is a point on the circumference. If $\angle ABC = 35^\circ$, calculate $\angle BAC$.
> 2. A tangent $TP$ touches a circle at $P$. Center $O$ is connected to $T$ such that $OT = 13\text{ cm}$ and radius $OP = 5\text{ cm}$. Calculate tangent length $TP$.

**Step 1: Calculate $\angle BAC$ in Semicircle**

1. Apply Angle in a Semicircle theorem:

$$\angle ACB = 90^\circ \quad \text{(Angle in a semicircle)}$$

2. Calculate $\angle BAC$ using triangle angle sum ($180^\circ$):

$$\angle BAC = 180^\circ - (90^\circ + 35^\circ) = 180^\circ - 125^\circ = 55^\circ$$

**Step 2: Calculate Tangent Length $TP$**

1. Apply Tangent-Radius theorem ($\angle OPT = 90^\circ$):

$$\triangle OPT \text{ is a right-angled triangle at } P$$

2. Apply Pythagoras' Theorem ($OP^2 + TP^2 = OT^2$):

$$5^2 + TP^2 = 13^2 \implies 25 + TP^2 = 169$$

$$TP^2 = 169 - 25 = 144 \implies TP = \sqrt{144} = 12\text{ cm}$$

3. **Angle $\angle BAC$:** $55^\circ$
4. **Tangent Length $TP$:** $12\text{ cm}$

---

### 4. Common Examiner Traps

* **Assuming Diameter Without Proof:** Treating a chord as a diameter when it does not explicitly pass through center $O$.
* **Forgetting Isosceles Radii:** Failing to recognize that triangles formed by two radii (e.g. $\triangle OAC$) are isosceles with equal base angles.
* **Hypotenuse Errors in Tangent Triangles:** Treating tangent length $TP$ as the hypotenuse instead of line $OT$ joining center to external point.
