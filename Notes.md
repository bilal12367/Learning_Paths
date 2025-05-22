# Machine Learning Preprocessing Notes

## Importing Libraries

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder
```

## Loading Data

```python
data = pd.read_csv('data.csv')
```

## Handling Missing Values

```python
data.fillna(data.mean(), inplace=True)
```

## Encoding Categorical Variables

```python
label_encoder = LabelEncoder()
data['category'] = label_encoder.fit_transform(data['category'])
```

## Splitting Data

```python
X = data.drop('target', axis=1)
y = data['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

## Feature Scaling

### Standard Scaling

```python
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

### Min-Max Scaling

```python
scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

## Summary

1. Import necessary libraries.
2. Load your dataset.
3. Handle missing values.
4. Encode categorical variables.
5. Split the data into training and testing sets.
6. Apply feature scaling.
