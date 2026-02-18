# Football Stats Visualization Tool

This repository contains a simple web-based tool designed to simulate and demonstrate various visualization types for football (soccer) team statistics. It allows users to input raw successful/total attempt numbers for different statistical categories and instantly see them represented visually using different scaling and bar chart methodologies.

## Purpose

The primary goal of this tool is to provide a clear and interactive environment for understanding how different mathematical models and visualization techniques can impact the perception and comparison of team performance based on statistical data. It aims to highlight concepts such as linear proportion, power law scaling ("Hype"), nested efficiencies, and logarithmic scaling in an intuitive manner.

## Components

The tool consists of three main HTML files:

1.  **`index.html`**:
    *   **Purpose**: Serves as the main navigation page, providing links to the "Testovací prostředí" (Testing Environment) and "Demonstrační prostředí" (Demonstration Environment).

2.  **`testovaci_prostredi.html` (Testing Environment)**:
    *   **Purpose**: This page is designed for experimenting with four distinct statistical visualization types using dynamic inputs.
    *   **Features**:
        *   **Linear Proportion**: Shows a simple linear representation of "successful vs. total" or "home vs. away" contributions.
        *   **Nonlinear "Hype" Scaling (Power Law)**: Visualizes statistics using a power law (e.g., `value^2`), which amplifies differences, often used to exaggerate impact or "hype."
        *   **Nested Bars (Vnořená efektivita)**: Displays successful attempts nested within total attempts, showing efficiency within the context of overall volume.
        *   **Logarithmic Scaling**: Uses a logarithmic scale to compress large differences and expand small ones, useful for datasets with a wide range of values.
        *   **Dynamic Coloring**: Bars change color (red for higher value, white for equal/lower) based on comparison.
        *   **Tooltips**: Provides explanations for each visualization type upon hovering over info icons.

3.  **`demonstracni_prostredi.html` (Demonstration Environment)**:
    *   **Purpose**: This page focuses on showcasing two specific visualization types side-by-side for a predefined set of football statistics, with an emphasis on comparing team performance.
    *   **Features**:
        *   **Statistical Categories**: Includes inputs for common football stats like Passes, Long Passes, Passes in Final Third, Crosses, and Tackles.
        *   **Side-by-Side Comparison**: For each statistic, it displays "Flashscore současně" (Linear Proportion) and "Demonstrace nested bars" (Nested Efficiency) visualizations next to each other.
        *   **Input Layout**: Input fields are arranged in a flexible, wrapping layout to optimize screen space.
        *   **Dynamic Updates**: Visualizations update instantly as input values are changed.
        *   **Data Display**: Statistical values are displayed above their respective bars in the format `XX% (Successful/Total)`, with horizontal alignment (home values left, away values right) and clear vertical spacing from the bars.
        *   **Prefill Button**: A "Načíst ukázková data" (Load Example Data) button is available to quickly populate all input fields with a predefined set of example statistics, facilitating quick testing and demonstration.
        *   **Dynamic Coloring**: Similar to the Testing Environment, bars use dynamic coloring based on team comparison.

## Usage

11.  Open `index.html` in your web browser.
12.  Navigate to either the "Testovací prostředí" to experiment with different visualization types or "Demonstrační prostředí" to see a comparative display of predefined football statistics.
13.  In both environments, adjust the numerical inputs for "Successful" and "Total" attempts for "Home" and "Away" teams.
14.  Observe how the visualizations dynamically react to your input.
15.  In the "Demonstrační prostředí", utilize the "Načíst ukázková data" button for quick loading of example scenarios.