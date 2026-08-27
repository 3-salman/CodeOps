import random


def total(nums: list[float]) -> float:
    if not nums:
        return 0.0
    return nums[0] + total(nums[1:])


def count_down(n: int) -> None:
    if n <= 0:
        return
    print(n, end=" " if n > 1 else "\n")
    count_down(n - 1)


def binary_search(items: list, target) -> int:
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


def merge(left: list, right: list) -> list:
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged


def merge_sort(items: list) -> list:
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left_sorted = merge_sort(items[:mid])
    right_sorted = merge_sort(items[mid:])
    return merge(left_sorted, right_sorted)


def has_pair(nums: list[float], target: float) -> bool:
    left = 0
    right = len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False


if __name__ == "__main__":
    sample_nums = [10.5, 20.0, 30.5, 40.0]
    print(total(sample_nums))
    count_down(5)

    sorted_balances = [150.0, 300.0, 450.5, 1200.0, 2500.0, 5000.0]
    print(binary_search(sorted_balances, 1200.0))

    random_list = [random.randint(10, 99) for _ in range(10)]
    my_sorted = merge_sort(random_list)
    print(my_sorted == sorted(random_list))

    account_records = [
        ("Abebe", 1500.00),
        ("Tigist", 8200.50),
        ("Bekele", 450.00),
        ("Genet", 3100.25),
    ]
    sorted_by_balance = sorted(account_records, key=lambda x: x[1], reverse=True)
    print(sorted_by_balance)

    balances = [200, 500, 800, 1200, 1500, 3000]
    print(has_pair(balances, 2000))
    print(has_pair(balances, 9000))