from collections import deque
import heapq


class Node:
    def __init__(self, value: float):
        self.value = value
        self.left = None
        self.right = None


def insert(root: Node | None, value: float) -> Node:
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root


def in_order(root: Node | None, result: list[float] | None = None) -> list[float]:
    if result is None:
        result = []
    if root:
        in_order(root.left, result)
        result.append(root.value)
        in_order(root.right, result)
    return result



def height(node: Node | None) -> int:
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))



def bfs(graph: dict[str, list[str]], start: str) -> list[str]:
    visited = set([start])
    queue = deque([start])
    order = []

    while queue:
        vertex = queue.popleft()
        order.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order



def dfs(
    graph: dict[str, list[str]],
    start: str,
    visited: set[str] | None = None,
    order: list[str] | None = None,
) -> list[str]:
    if visited is None:
        visited = set()
    if order is None:
        order = []

    visited.add(start)
    order.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)

    return order


# =
if __name__ == "__main__":
    # --- Ex 1 & 2: BST & Height ---
    balances = [5000.0, 1200.0, 8500.0, 450.0, 3100.0, 12000.0]
    root = None
    for b in balances:
        root = insert(root, b)

    sorted_balances = in_order(root)
    print("BST In-Order (Sorted Balances):", sorted_balances)
    print("BST Height/Depth:", height(root))

    # --- Ex 3 & 4: BFS vs DFS Traversal ---
    graph = {
        "ETB-1001": ["ETB-1002", "ETB-1003"],
        "ETB-1002": ["ETB-1004"],
        "ETB-1003": ["ETB-1005"],
        "ETB-1004": ["ETB-1005"],
        "ETB-1005": [],
    }

    start_node = "ETB-1001"
    print("\nGraph Traversal Comparison:")
    print("BFS Visit Order:", bfs(graph, start_node))
    print("DFS Visit Order:", dfs(graph, start_node))

    # --- Ex 5: Priority Queue ---
    pq = []
    tasks = [
        (3, "Medium Priority Transfer"),
        (1, "Critical Fraud Alert"),
        (5, "Routine Maintenance"),
        (2, "High Priority Withdrawal"),
        (4, "Low Priority Statement Request"),
    ]

    for item in tasks:
        heapq.heappush(pq, item)

    print("\nPriority Queue Pops (In Priority Order):")
    while pq:
        priority, task = heapq.heappop(pq)
        print(f"[{priority}] {task}")