# 🌦️ Weather Condition & Extremity Classification

[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-F37626?logo=jupyter&logoColor=white)](https://jupyter.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![XGBoost](https://img.shields.io/badge/XGBoost-EB5424?logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io/)
[![Pandas](https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=white)](https://pandas.pydata.org/)

An exploratory data analysis (EDA) and supervised machine learning benchmarking pipeline designed to classify meteorological observations into severity tiers: **Normal**, **Moderate**, and **Extreme**.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Dataset & Label Engineering](#-dataset--label-engineering)
- [Model Performance & Evaluation](#-model-performance--evaluation)
- [Key Figures & Visualizations](#-key-figures--visualizations)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Running the Notebook](#-running-the-notebook)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

This repository provides an end-to-end data science workflow on historical meteorological observations (`weatherHistory.csv`). It performs:

1. **Data Cleaning & Preprocessing**: Handling missing values, formatting temporal fields, and handling outliers across meteorological readings.
2. **Feature Engineering**: Extracting seasonal and diurnal indicators, apparent temperature differentials, and humidity-temperature interaction terms.
3. **Multi-Model Machine Learning Benchmarking**: Comparing diverse classification architectures:
   - Decision Trees
   - Gradient Boosting
   - Random Forest
   - XGBoost
   - Support Vector Machines (SVM with RBF Kernel)
   - K-Nearest Neighbors (KNN, $k=7$)
   - Logistic Regression
4. **Validation & Diagnostics**: Comprehensive model evaluation through 5-fold cross-validation, confusion matrices, classification heatmaps, and learning curve diagnostics.

---

## 📊 Dataset & Label Engineering

The input dataset (`data/raw/weatherHistory.csv`) contains timestamped weather measurements including:
- **Temperature & Apparent Temperature** (°C)
- **Relative Humidity**
- **Wind Speed** (km/h) & **Wind Bearing** (degrees)
- **Visibility** (km)
- **Atmospheric Pressure** (millibars)
- **Precipitation Type** (Rain / Snow)

### Target Classification Labels:
Observations are categorized into three operational weather severity classes:
- **Class 0 — Normal**: Standard, mild weather conditions without significant anomalies.
- **Class 1 — Moderate**: Noticeable seasonal variances or elevated precipitation/wind indices.
- **Class 2 — Extreme**: High-impact thresholds characterized by extreme temperature shifts, severe winds, heavy precipitation, or minimal visibility.

> **Methodological Note:** Labels are derived systematically via engineered weather thresholds and meteorological summaries. High classifier scores reflect the fidelity with which machine learning models recover and generalize these decision boundaries.

---

## 📈 Model Performance & Evaluation

All models were evaluated on an independent test split as well as across 5-fold cross-validation (`reports/metrics/model_performance_cv.csv`):

| Classifier | Test Accuracy (%) | 5-Fold CV Accuracy (%) | Macro Precision | Macro Recall | Macro F1-Score |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Gradient Boosting** | **100.0%** | **100.0%** | **0.9999** | **0.9996** | **0.9997** |
| **Decision Tree** | 100.0% | 100.0% | 0.9995 | 0.9995 | 0.9995 |
| **Random Forest** | 99.8% | 99.9% | 0.9975 | 0.9934 | 0.9955 |
| **XGBoost** | 99.2% | 99.3% | 0.9767 | 0.9777 | 0.9772 |
| **SVM (RBF Kernel)** | 96.9% | 97.1% | 0.9198 | 0.9689 | 0.9426 |
| **KNN ($k=7$)** | 96.2% | 96.3% | 0.9216 | 0.8966 | 0.9087 |
| **Logistic Regression** | 91.9% | 92.2% | 0.8182 | 0.9163 | 0.8596 |

---

## 🖼️ Key Figures & Visualizations

The analysis exports publication-quality diagnostic plots in [`reports/figures/`](reports/figures):

- **Model Comparison**: [`02_model_comparison.png`](reports/figures/02_model_comparison.png) — Side-by-side performance across accuracy, precision, recall, and F1.
- **Confusion Matrices**: [`01_confusion_matrices.png`](reports/figures/01_confusion_matrices.png) — Error distributions across Normal, Moderate, and Extreme classes.
- **Feature Importance**: [`06_feature_importance.png`](reports/figures/06_feature_importance.png) — Relative ranking of predictors driving model decisions.
- **Tree Depth vs. Accuracy**: [`04_tree_depth_vs_accuracy.png`](reports/figures/04_tree_depth_vs_accuracy.png) — Pruning analysis and overfitting mitigation curves.
- **Decision Boundaries**: [`05_decision_boundaries.png`](reports/figures/05_decision_boundaries.png) — 2D projection of class separations.
- **Classification Report Heatmap**: [`07_classification_report_heatmap.png`](reports/figures/07_classification_report_heatmap.png) — Granular per-class metrics.
- **Learning Curves**: [`08_learning_curve.png`](reports/figures/08_learning_curve.png) — Sample complexity and bias-variance tradeoff assessment.

---

## 📁 Project Structure

```text
FDA/
├── notebooks/
│   └── eda.ipynb                    # Primary analysis, model training & visualization notebook
├── data/
│   ├── README.md                    # Data provenance and schema documentation
│   ├── raw/
│   │   └── weatherHistory.csv       # Unprocessed weather observation records
│   └── processed/
│       ├── processed_weather.csv    # Cleaned dataset with engineered features & target label
│       └── processed_weather_with_metadata.csv # Processed data retaining date/summary metadata
├── reports/
│   ├── figures/                     # Exported evaluation figures & diagnostic plots
│   └── metrics/                     # Model benchmarking CSV metrics (test & cross-validation)
├── presentations/
│   └── plant_disease/               # Presentation assets and generation script
├── requirements.txt                 # Python environment package dependencies
└── README.md                        # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.11 or 3.12
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/vishalsnghkush/FDA.git
cd FDA
```

### 2. Create and Activate Virtual Environment

**On Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**On macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 🚀 Running the Notebook

Launch JupyterLab or Jupyter Notebook:

```bash
jupyter notebook notebooks/eda.ipynb
```

Execute cells sequentially to inspect data distributions, reproduce the feature transformations, re-train models, and regenerate figure outputs in `reports/figures/`.

---

## 🤝 Contributing

Contributions, feedback, and issue submissions are welcome:

1. **Fork** this repository.
2. **Create a branch** for your update:
   ```bash
   git checkout -b feature/improvement-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "docs: improve documentation and methodology notes"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/improvement-name
   ```
5. **Open a Pull Request** against `main`.

---

## 📄 License

This repository is maintained for educational and analytical purposes. Please consult individual dataset licenses and original providers prior to external redistribution.
