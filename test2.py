MOD = 10**9 + 7

def frequency(arr, left, right, value):
    # Count occurrences of value in arr[left:right+1]
    return arr[right] - (arr[left-1] if left > 0 else 0)

def distinct(arr, left, right):
    # Count the number of distinct values in arr[left:right+1]
    return len(set(arr[left:right+1]))

def solve(N, A):
    # We need to compute frequency and distinct information for all ranges
    freq_prefix = [0] * (N+1)  # frequency_prefix[i] will store the frequency of A[i] up to index i
    distinct_prefix = [0] * (N+1)  # distinct_prefix[i] will store number of distinct elements from A[0] to A[i]
    
    freq_map = {}
    distinct_map = set()
    
    # Calculate prefix frequency and prefix distinct count
    for i in range(N):
        freq_map[A[i]] = freq_map.get(A[i], 0) + 1
        distinct_map.add(A[i])
        freq_prefix[i+1] = freq_map[A[i]]
        distinct_prefix[i+1] = len(distinct_map)
    
    total_pairs = 0
    
    # Now, iterate over all pairs (i, j)
    for i in range(N):
        for j in range(i+1, N):
            freq_left = frequency(freq_prefix, 1, i, A[i])
            freq_right = frequency(freq_prefix, j, N, A[j])
            
            distinct_left = distinct(distinct_prefix, 1, i)
            distinct_right = distinct(distinct_prefix, j, N)
            
            # Condition to check
            if freq_left + freq_right <= (distinct_left // 2) + (distinct_right // 2):
                total_pairs += 1
                total_pairs %= MOD
    
    return total_pairs

# Test cases
print(solve(5, [2, 2, 3, 1, 5]))  # Expected output: 2
print(solve(5, [2, 2, 3, 1, 5]))  # Expected output: 0
print(solve(5, [1, 2, 3, 4, 5]))  # Expected output: 5
