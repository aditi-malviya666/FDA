# Weather Classification Analysis

Exploratory data analysis and machine-learning experiments on `weatherHistory.csv`.
The notebook cleans weather observations, engineers time features, and assigns
**Normal (0)**, **Moderate (1)**, and **Extreme (2)** labels using weather thresholds
and summary keywords. It compares classifiers and exports evaluation plots and metrics.

> Labels are derived from the input features, not independently observed outcomes.
> High classification scores therefore measure reproduction of those rules, not
> demonstrated forecasting performance.

## Structure

```text
Notebook/
├── notebooks/
│   └── eda.ipynb
├── data/
│   ├── README.md
│   ├── raw/
│   │   └── weatherHistory.csv
│   └── processed/
│       ├── processed_weather.csv
│       └── processed_weather_with_metadata.csv
├── reports/
│   ├── figures/                 # Existing and numbered plot exports
│   └── metrics/                 # Model comparison CSVs
├── presentations/
│   └── plant_disease/           # Separate, unrelated presentation
├── .gitattributes
├── .gitignore
├── README.md
└── requirements.txt
```

## Setup and run

Use Python 3.11 or 3.12 for the notebook's existing estimator APIs. Run these
commands from the project root (the directory containing this README):

```sh
python -m venv .venv
```

Activate the environment:

```powershell
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
```

```sh
# macOS / Linux
source .venv/bin/activate
```

Then install dependencies and open the notebook:

```sh
python -m pip install -r requirements.txt
python -m jupyter notebook notebooks/eda.ipynb
```

Run cells in order. Data and output paths are resolved from the project layout,
so the kernel may start in the project root or `notebooks/`. The original nested
`Notebook` workspace layout is also supported.
Figures go to `reports/figures/`, metric tables to `reports/metrics/`, and the
processed dataset to `data/processed/processed_weather.csv`.

The notebook retains its saved outputs and multiple experiment sections. Full
execution can take substantial time, particularly SVM training and cross-validation.
The scikit-learn range retains compatibility with its existing AdaBoost `algorithm`
argument and `OneHotEncoder(sparse_output=False)` usage. Dependencies are not a
fully locked environment, and end-to-end execution has not been verified here.

## Datasets and results

See [data/README.md](data/README.md) for the distinction between the two processed
files. Both existing plot sets and metric CSVs are retained; they may represent
different experiment runs. Re-run the relevant cells for fresh results rather than
assuming all saved exports describe the same model run.

Dataset provenance and redistribution rights have not been verified. Confirm the
source, attribution, and license before publishing the CSVs. No project license
has been selected automatically.

## Separate presentation

`presentations/plant_disease/` preserves the existing plant-leaf-disease slide deck
and its JavaScript generator; it is not part of the weather analysis. To regenerate:

```sh
cd presentations/plant_disease
npm install
npm run build
```

This requires Node.js and downloads `pptxgenjs` from npm. The generated deck is
written beside `ppt.js`. Commit the generated `package-lock.json` if you install
the presentation dependency and want reproducible npm installs.

## GitHub repository

This project is published at <https://github.com/vishalsnghkush/FDA>.
Clone it to work directly with the standalone repository:

```sh
git clone https://github.com/vishalsnghkush/FDA.git
cd FDA
```

The notebook, raw and processed datasets, all 19 report figures, both metric
CSVs, and the separate presentation are included. Only local environments,
caches, temporary files, and secrets are excluded by `.gitignore`.

Before committing future changes from a standalone clone:

```sh
git status --short --branch
git diff --stat
git add -- .
git diff --cached --stat
```

The original working copy resides under `Notebook/` inside a different Git
repository. Its parent application and unrelated staged changes are not part
of the FDA export. For future FDA development, use a standalone clone rather
than changing the original parent repository's remote.
