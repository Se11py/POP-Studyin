# Cumulative Frequency & Box Plotter — Detailed Design Specification

## I. Syllabus Alignment & Context
*   **Subject Area**: Math (Cambridge IGCSE 0580)
*   **Syllabus Topic Reference**: *9. Statistics*

## II. Educational Objectives
Through interaction with this visualizer, the student will:
1.  **Construct and use cumulative frequency curves**
2.  estimate the median, lower quartile ($LQ$), and upper quartile ($UQ$) values
3.  draw box-and-whisker plots.
4.  Develop an intuitive understanding of the underlying principles through systematic experimentation and observation.

## III. Detailed Simulation Description
A statistical analysis workspace. Students enter frequency tables of grouped data (e.g. heights of plants) and plot the cumulative frequency curve. They draw lines to estimate the median (50%), lower quartile (25%), and upper quartile (75%) values to calculate the interquartile range ($IQR$), visualizing how these values map to a box plot.

## IV. Simulation Interface & Interactive Controls
Students interact with the workspace using the following controls:
*   **Data frequency table input columns, quartile reference indicator toggles, and box-plot alignment grids.**

## V. Dynamic Visual & Mathematical Feedback
The canvas renders the following behaviors in response to user inputs:
*   **A graph plotting cumulative frequency against intervals. Dragging quartile lines down from the curve project values onto the horizontal axis, automatically building a matching box-and-whisker plot.**

## VI. Suggested Classroom Inquiry & Laboratory Activity
1.  **Guided Inquiry (Data Collection)**: Have students run the simulation with all settings at baseline values. Instruct them to record starting measurements in a table.
2.  **Hypothesis and Testing**: Direct students to predict the impact of modifying a specific variable (e.g., doubling the mass, or halving the temperature). Let them adjust the slider and record the new output values to test their hypothesis.
3.  **Graph Analysis**: Have students note changes in the slopes or patterns of the live graphs as they vary sliders, linking geometric changes to algebraic formulas.
4.  **Synthesis**: Ask students to write down the scientific rule or mathematical formula that summarizes their findings, checking it against their textbook.
