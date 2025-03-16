import numpy as np

# Given data
x = np.array([1.1, 1.3, 1.5, 2.0, 2.2, 2.9, 3.0, 3.2, 3.2, 3.7, 3.9, 4.0, 4.0, 4.1, 4.5, 4.9, 5.1, 5.3, 5.9, 6.0, 6.8, 7.1, 7.9, 8.2, 8.7, 9.0, 9.5, 9.6, 10.3, 10.5])
y = np.array([39343.00, 46205.00, 37731.00, 43525.00, 39891.00, 56642.00, 60150.00, 54445.00, 64445.00, 57189.00, 63218.00, 55794.00, 56957.00, 57081.00, 61111.00, 67938.00, 66029.00, 83088.00, 81363.00, 93940.00, 91738.00, 98273.00, 101302.00, 113812.00, 109431.00, 105582.00, 116969.00, 112635.00, 122391.00, 121872.00])

# Number of data points
n = len(x)

# Calculate sums
sum_x = np.sum(x)
sum_y = np.sum(y)
sum_xx = np.sum(x**2)
sum_xy = np.sum(x * y)

# Calculate the slope (beta_1) and intercept (beta_0)
beta_1 = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x**2)
beta_0 = (sum_y - beta_1 * sum_x) / n

# Output the intercept (beta_0)
print(f'Intercept (beta_0): {beta_0}')
print(f'Intercept (beta_1): {beta_1}')
