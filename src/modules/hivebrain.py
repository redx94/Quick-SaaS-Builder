
class HiveBrain:
    def __init__(self):
        self.active_tasks = {}

    def allocate_resources(self, task):
        # Simulate allocation strategy
        if task not in self.active_tasks:
            self.active_tasks[task] = "Allocated to module X"
        print(f"Task '{task}' is being processed. Allocation: {self.active_tasks[task]}")

    def manage_concurrent_requests(self, tasks):
        for task in tasks:
            self.allocate_resources(task)

if __name__ == "__main__":
    hb = HiveBrain()
    hb.manage_concurrent_requests(["frontend task", "backend task", "deployment task"])
