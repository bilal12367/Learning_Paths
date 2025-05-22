
# Datascience for python

## Numpy Tutorial

Numpy basic usage and built-in methods.

```python
import numpy as np

np.array([],dtype='object')
np.median([1,2,3])
np.mean([1,2,3])
np.max([1,2,3])
np.min([1,2,3])
np.argmax([1,2,3])
np.argmin([1,2,3])
horsepower = [130, 165, 150, 150, 140]

horsepower_arr = np.array(horsepower)

# Finding the indices
x = np.where(horsepower_arr >= 150) 
print(x)

# Filtering Array
filter_arr = horsepower_arr >= 150  

newarr = horsepower_arr[filter_arr]
print(newarr)

# Sorting
horsepower.sort()
print(horsepower)
```




## Pandas Tutorial

