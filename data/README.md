# Weather datasets

- `raw/weatherHistory.csv`: the original input dataset, moved without modification.
- `processed/processed_weather.csv`: the existing notebook export previously stored
  under the accidentally nested `Notebook/data/` directory. It contains engineered
  features and `Weather_Label`, with `Formatted Date`, `Daily Summary`, and
  `Weather_Label_Name` removed. Future notebook exports write to this path.
- `processed/processed_weather_with_metadata.csv`: the other existing processed
  dataset, previously `data/processed_weather.csv`. It retains `Formatted Date`
  and `Daily Summary`; it is preserved as a separate snapshot, not silently
  overwritten or treated as an identical duplicate.

The notebook derives labels from weather thresholds and summary keywords:
`0 = Normal`, `1 = Moderate`, and `2 = Extreme`.

The dataset source and license were not provided in this workspace. Verify
provenance, required attribution, and redistribution permission before publishing
these files. CSV files are intentionally not ignored, so review them before staging.
