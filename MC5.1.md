# MC5.1 Units of Measurement & Conversion in Mensuration | Save My Exams Revision Notes

## 1. Core Intuition & Mental Model ("What is it?")

Mensuration relies entirely on accurate units of measurement. In physical geometry, dimensions dictate how scale factors operate:
* **$1\text{D}$ (Length):** A one-dimensional distance along a line (measured in $\text{mm}$, $\text{cm}$, $\text{m}$, $\text{km}$).
* **$2\text{D}$ (Area):** A two-dimensional surface space bounded by lines (measured in $\text{mm}^2$, $\text{cm}^2$, $\text{m}^2$, $\text{km}^2$).
* **$3\text{D}$ (Volume & Capacity):** A three-dimensional space enclosed by surfaces (measured in $\text{mm}^3$, $\text{cm}^3$, $\text{m}^3$) or liquid volume (measured in $\text{ml}$, $\text{cl}$, $\text{l}$).

When converting linear measurements, you scale by a single conversion factor $k$. When converting areas, you must scale by $k^2$ because area spans two dimensions (length $\times$ width). When converting volumes, you must scale by $k^3$ because volume spans three dimensions (length $\times$ width $\times$ height).

---

## 2. Key Definitions, Principles & Formulas

### Linear Conversion Factors ($1\text{D}$)
* $1\text{ cm} = 10\text{ mm}$
* $1\text{ m} = 100\text{ cm} = 1000\text{ mm}$
* $1\text{ km} = 1000\text{ m}$

### Area Conversion Factors ($2\text{D}$)
To derive area conversions, square the linear factor $k$:
* $1\text{ cm}^2 = (10)^2\text{ mm}^2 = 100\text{ mm}^2$
* $1\text{ m}^2 = (100)^2\text{ cm}^2 = 10\,000\text{ cm}^2$
* $1\text{ km}^2 = (1000)^2\text{ m}^2 = 1\,000\,000\text{ m}^2$

### Volume Conversion Factors ($3\text{D}$)
To derive volume conversions, cube the linear factor $k$:
* $1\text{ cm}^3 = (10)^3\text{ mm}^3 = 1000\text{ mm}^3$
* $1\text{ m}^3 = (100)^3\text{ cm}^3 = 1\,000\,000\text{ cm}^3$

### Capacity & Liquid Volume Equivalences
* $1\text{ ml} = 1\text{ cm}^3$
* $1\text{ litre} = 1000\text{ cm}^3 = 1\text{ dm}^3$
* $1\text{ m}^3 = 1000\text{ litres} = 1\text{ kilolitre}$

> 💡 **Exam Tip**: Write out the unit conversion explicitly before carrying out calculations. If converting from smaller units to larger units, **divide** by the conversion factor. If converting from larger units to smaller units, **multiply** by the conversion factor.

---

## 3. Step-by-Step Method & Worked Exam Demonstration

### Step-by-Step Conversion Method
1. **Identify the dimension ($1\text{D}$, $2\text{D}$, or $3\text{D}$):** Determine whether you are dealing with length, area, or volume.
2. **Find the linear base factor $k$:** State the standard relationship (e.g., $1\text{ m} = 100\text{ cm}$).
3. **Raise the factor to the required power:** Use $k^1$ for length, $k^2$ for area, and $k^3$ for volume.
4. **Apply multiplication or division:** 
   * Large unit $\rightarrow$ Small unit: Multiply by $k^n$.
   * Small unit $\rightarrow$ Large unit: Divide by $k^n$.

---

### Worked Exam Question 1

A rectangular field has an area of $8.4\text{ m}^2$.

**(a)** Convert $8.4\text{ m}^2$ into $\text{cm}^2$.

**(b)** A water container holds $4750\text{ cm}^3$ of liquid. Calculate its capacity in litres.

#### Solution:

**(a) Converting Area ($8.4\text{ m}^2 \rightarrow \text{cm}^2$):**
1. Identify the linear relationship:
   $$1\text{ m} = 100\text{ cm}$$
2. Square the conversion factor for area ($2\text{D}$):
   $$1\text{ m}^2 = (100)^2\text{ cm}^2 = 10\,000\text{ cm}^2$$
3. Convert $\text{m}^2$ to $\text{cm}^2$ by multiplying by $10\,000$:
   $$\text{Area} = 8.4 \times 10\,000 = 84\,000\text{ cm}^2$$

**(b) Converting Volume to Capacity ($4750\text{ cm}^3 \rightarrow \text{litres}$):**
1. Identify the capacity equivalence factor:
   $$1\text{ litre} = 1000\text{ cm}^3$$
2. Convert $\text{cm}^3$ to litres by dividing by $1000$:
   $$\text{Capacity} = \frac{4750}{1000} = 4.75\text{ litres}$$

---

## 4. Common Misconceptions & Diagnostic Exam Pitfalls

> ⚠️ **Common Misconception**: Multiplying or dividing by the linear factor instead of the squared or cubed factor.
* **Incorrect:** $5\text{ m}^2 = 5 \times 100 = 500\text{ cm}^2$ ❌
* **Correct:** $5\text{ m}^2 = 5 \times 100^2 = 50\,000\text{ cm}^2$ ✅

### Diagnostic Checklist
* Did you check whether the question asks for answer units in $\text{cm}$, $\text{cm}^2$, or $\text{cm}^3$?
* Are all input measurements converted to matching units **before** substituting into area or volume formulas?

---

## 5. Key Terms & Revision Summary

| Term | Definition | Formula / Equivalence |
| :--- | :--- | :--- |
| **Dimension ($n$)** | The geometric order of measure ($1\text{D}$, $2\text{D}$, $3\text{D}$). | Length ($n=1$), Area ($n=2$), Volume ($n=3$) |
| **Linear Scale Factor ($k$)** | Base conversion multiplier between two length units. | e.g., $k = 100$ for $\text{m} \rightarrow \text{cm}$ |
| **Area Factor ($k^2$)** | Conversion multiplier for surface areas. | $1\text{ m}^2 = 10\,000\text{ cm}^2$ |
| **Volume Factor ($k^3$)** | Conversion multiplier for enclosed 3D space. | $1\text{ m}^3 = 1\,000\,000\text{ cm}^3$ |
| **Litre ($\text{l}$)** | Standard metric measure of capacity. | $1\text{ litre} = 1000\text{ cm}^3 = 1\text{ dm}^3$ |
