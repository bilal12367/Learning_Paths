

## Simple Imputer

Simple use of imputer to handle Not a number values by replacing them with mean of the column.
```python
imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
imputer.fit_transform(matrix)
```

## Column Transformer

Changing the string values in the data to binary data for processing. 

```python
from sklearn.compose import  ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [0])], remainder="passthrough")
```

## Label Encoder

For changing binary string values to binary like yes -> 1 & no -> 0

```py
from sklearn.preprocessing import LabelEncoder;
le = LabelEncoder()
print(Y)
Y = le.fit_transform(Y)
print(Y)
```
Output:
```sh
['No' 'Yes' 'No' 'No' 'Yes' 'Yes' 'No' 'Yes' 'No' 'Yes']
[0 1 0 0 1 1 0 1 0 1]
```