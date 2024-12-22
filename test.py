def is_prime(num):
    if num <= 1:
        return False
    if num <= 3:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    return True

def max_score(N, A, B):
    # Step 1: Modify array A by setting non-prime numbers to 0
    cnt = 0
    max_score = 0
    for i in B:
        if i == 1:
            cnt += 1
    for i in range(N):
        if is_prime(A[i]) and cnt >= 1:
            max_score += A[i]
            cnt -= 1
    return max_score

N = 5
A = [3,4,3,5,5]
B=[1,0,1,0,0]
print(max_score(N,A,B))
# Example usage:
N = 5
A = [5, 1, 2, 1, 13]
B = [0, 0, 1, 0, 0]

print(max_score(N, A, B))  # Output: 5

N = 7
A = [3, 3, 3, 1000, 3, 3, 3]
B = [0, 1, 1, 1, 1, 1, 1]

print(max_score(N, A, B))  # Output: 18
