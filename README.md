# Proteinuria Calculator

A web-based clinical tool for healthcare professionals to assess and interpret proteinuria using spot urine samples. This calculator provides an advanced interpretation of kidney health by calculating the Albumin-to-Creatinine Ratio (ACR), Protein-to-Creatinine Ratio (PCR), Albumin-to-Protein Ratio (APR), and Non-Albumin Proteinuria (NAP).

## Description

Proteinuria is a critical marker for kidney damage. While traditional 24-hour urine collections are cumbersome, spot urine tests like ACR and PCR offer a practical alternative. This tool goes beyond simple calculations by providing a nuanced clinical interpretation based on the interplay between different proteinuria markers. It helps differentiate between glomerular, tubular, and overflow proteinuria, aligning with the latest clinical guidelines (including KDIGO 2024) to support evidence-based decision-making.

This application is designed for educational and informational purposes and is intended for use by medical professionals, residents, and students.

## Features

-   **Comprehensive Calculations**: Calculates ACR, PCR, APR, and NAP from user inputs of urine albumin, protein, and creatinine.
-   **Automated Categorization**: Automatically categorizes ACR and PCR values into standard clinical stages (e.g., normal, moderately increased, nephrotic-range).
-   **Advanced Clinical Interpretation**: Generates detailed clinical conclusions and recommendations based on a logic that considers the relationship between all calculated markers.
-   **Differentiates Proteinuria Types**: Helps distinguish between glomerular and non-glomerular (tubular/overflow) proteinuria by analyzing the APR and NAP values.
-   **Input Validation**: Includes robust input validation to prevent common errors, such as albumin values exceeding protein values, and provides warnings for atypical inputs.
-   **Clean & Responsive UI**: Features a modern, dark-themed, and mobile-friendly user interface for easy use on any device.

## How to Use

The app can be run using the repository's GitHub Pages at [https://motilinbal.github.io/proteinuria-calculator/](https://motilinbal.github.io/proteinuria-calculator/).

Alternatively,
1.  Open the `index.html` file in any modern web browser.
2.  Enter the following values from a spot urine sample:
    -   **Urine Albumin (mg/L)**
    -   **Urine Protein (mg/L)**
    -   **Urine Creatinine (mg/L)**
3.  Click the **"Calculate"** button.
4.  The results will be displayed below the form, including the calculated ratios, their categories, and a detailed set of clinical conclusions and recommendations.

## Clinical Logic

The calculator's logic is based on established nephrology principles:

-   **Albumin-to-Creatinine Ratio (ACR)**: The primary marker for glomerular damage and a key factor in CKD staging.
-   **Protein-to-Creatinine Ratio (PCR)**: Measures total protein and is useful for detecting non-albumin proteinuria.
-   **Albumin-to-Protein Ratio (APR)**: Calculated as `(ACR / PCR)`.
    -   An **APR > 0.5** suggests selective albumin loss, pointing towards **glomerular disease**.
    -   An **APR < 0.4** suggests non-selective protein loss, pointing towards **tubular or overflow proteinuria**.
-   **Non-Albumin Proteinuria (NAP)**: Calculated as `(PCR - ACR)`. An elevated NAP is a strong, independent predictor of tubulointerstitial injury and increased mortality risk.

The tool synthesizes these values to provide a holistic assessment that can guide further diagnostic steps and therapeutic decisions.

## Technical Stack

-   **HTML5**: For the structure of the application.
-   **CSS3**: For styling, including a responsive, dark-theme design.
-   **JavaScript (ES6+)**: For all calculations, clinical logic, and DOM manipulation.

The project is self-contained and has no external dependencies.

## Disclaimer

This tool is intended for educational and informational purposes only. It is **not** a substitute for professional medical advice, diagnosis, or treatment. All calculations and interpretations should be verified by a qualified healthcare professional. The creators of this tool are not responsible for any clinical decisions made based on its output.