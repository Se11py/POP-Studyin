# Topic: MC2.10 Distance-Time & Speed-Time Graphs

Travel graphs represent movement over time, where gradient measures rate of change (speed on distance-time graphs, acceleration on speed-time graphs) and area under a speed-time graph equals total distance traveled.

---

### 1. Travel Graph Types Breakdown

| Graph Type | Gradient Meaning | Area Under Graph Meaning | Flat Horizontal Line Meaning |
| --- | --- | --- | --- |
| Distance-Time Graph | \(\text{Gradient} = \text{Speed} = \frac{\Delta d}{\Delta t}\) | No physical meaning | Object is stationary (speed = 0) |
| Speed-Time Graph | \(\text{Gradient} = \text{Acceleration} = \frac{\Delta v}{\Delta t}\) | Total distance traveled (\(d = v \times t\)) | Constant speed (zero acceleration) |

---

### 2. Anatomy of Speed-Time Graph & Motion Features

```
       Speed (m/s)
           v  |         Constant Speed
             |         /-------------\
             |        /               \  Deceleration
             |       /                 \
             |  Acceleration            \
             +------------------------------ Time (s)
               Area = Distance (Trapezium / Triangles + Rect)
```

* **Gradient Calculation:** Acceleration is positive slope; deceleration/retardation is negative slope.
* **Area Calculation:** Distance is calculated by partitioning graph area into triangles (\(\frac{1}{2}bh\)), rectangles (\(bh\)), or trapeziums (\(\frac{1}{2}(a+b)h\)).

$$\text{Distance} = \text{Area under speed-time curve}$$

---

### 3. Worked Example

> **Question:**
> A car accelerates uniformly from rest to \(20\text{ m/s}\) in \(10\text{ seconds}\), travels at constant speed for \(30\text{ seconds}\), and decelerates to rest in \(10\text{ seconds}\).
> 1. Calculate the initial acceleration of the car.
> 2. Calculate the total distance traveled during the 50-second journey.

**Step 1: Calculate acceleration from speed-time gradient**

1. Apply acceleration formula \(a = \frac{\Delta v}{\Delta t}\) for initial 10 seconds:

$$a = \frac{20 - 0}{10 - 0}$$

2. Evaluate rate:

$$a = 2\text{ m/s}^2$$

**Step 2: Calculate total distance using area of trapezium**

1. Identify parallel sides \(a = 30\) (constant speed duration) and \(b = 50\) (total time), height \(h = 20\):

$$\text{Area} = \frac{1}{2}(a + b)h = \frac{1}{2}(30 + 50) \times 20$$

2. Evaluate area calculation:

$$\text{Distance} = \frac{1}{2} \times 80 \times 20 = 800\text{ metres}$$

3. **Key result 1:** Initial acceleration is \(2\text{ m/s}^2\).
4. **Key result 2:** Total distance traveled is \(800\text{ m}\).

---

### 4. Common Examiner Traps

* **Graph Type Confusion:** Misinterpreting a flat line on a distance-time graph (stationary) as moving at constant speed.
* **Incorrect Trapezium Parallel Sides:** Taking total baseline as upper parallel side instead of only the constant-speed duration segment.
