# Parabola & Quadratic Functions Grapher — Detailed Design Specification

## I. Syllabus Alignment & Context
*   **Subject Area**: Math (Cambridge IGCSE 0580)
*   **Syllabus Topic Reference**: *2. Algebra and Graphs*

## II. Educational Objectives
Through interaction with this visualizer, the student will:
1.  **Plot and interpret graphs of quadratic functions**
2.  identify roots, vertices, and axes of symmetry
3.  understand shifts caused by constants.
4.  Develop an intuitive understanding of the underlying principles through systematic experimentation and observation.

## III. Detailed Simulation Description
This graphing tool explores quadratic equations. Students manipulate coefficients to see how they affect the shape, height, and roots of a parabola. They can locate the vertex, find the axis of symmetry, and check discriminant values ($b^2 - 4ac$) to see how many real roots exist (0, 1, or 2).

## IV. Simulation Interface & Interactive Controls
Students interact with the workspace using the following controls:
*   **$a$, $b$, and $c$ parameter sliders for $y = ax^2 + bx + c$, coordinate grid zoom, and intercept marker indicators.**

## V. Dynamic Visual & Mathematical Feedback
The canvas renders the following behaviors in response to user inputs:
*   **A Cartesian coordinate grid showing a parabola. Adjusting $a$ changes width and opens it up/down. Adjusting $c$ shifts it vertically. Roots ($x$-intercepts) and vertex coordinates are plotted in real time.**

## VI. Suggested Classroom Inquiry & Laboratory Activity
1.  **Guided Inquiry (Data Collection)**: Have students run the simulation with all settings at baseline values. Instruct them to record starting measurements in a table.
2.  **Hypothesis and Testing**: Direct students to predict the impact of modifying a specific variable (e.g., doubling the mass, or halving the temperature). Let them adjust the slider and record the new output values to test their hypothesis.
3.  **Graph Analysis**: Have students note changes in the slopes or patterns of the live graphs as they vary sliders, linking geometric changes to algebraic formulas.
4.  **Synthesis**: Ask students to write down the scientific rule or mathematical formula that summarizes their findings, checking it against their textbook.
