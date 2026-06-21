class Task {
    int taskId;
    String taskName;
    String status;

    public Task(int taskId, String taskName, String status) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.status = status;
    }
}

class Node {
    Task task;
    Node next;

    public Node(Task task) {
        this.task = task;
        this.next = null;
    }
}

public class TaskManagementSystem {
    private Node head;

    public void addTask(Task task) {
        Node newNode = new Node(task);
        if (head == null) {
            head = newNode;
            return;
        }
        Node current = head;
        while (current.next != null) current = current.next;
        current.next = newNode;
    }

    public Task searchTask(int taskId) {
        Node current = head;
        while (current != null) {
            if (current.task.taskId == taskId) return current.task;
            current = current.next;
        }
        return null;
    }

    public void traverseTasks() {
        Node current = head;
        System.out.println("\nTask List:");
        while (current != null) {
            System.out.println(current.task.taskId + " | " + current.task.taskName + " | " + current.task.status);
            current = current.next;
        }
    }

    public void deleteTask(int taskId) {
        if (head == null) return;
        if (head.task.taskId == taskId) {
            head = head.next;
            System.out.println("Task Deleted");
            return;
        }
        Node current = head;
        while (current.next != null && current.next.task.taskId != taskId) current = current.next;
        if (current.next != null) {
            current.next = current.next.next;
            System.out.println("Task Deleted");
        } else {
            System.out.println("Task Not Found");
        }
    }

    public static void main(String[] args) {
        TaskManagementSystem system = new TaskManagementSystem();
        system.addTask(new Task(1, "Design Database", "Pending"));
        system.addTask(new Task(2, "Develop Backend", "In Progress"));
        system.addTask(new Task(3, "Testing", "Pending"));
        system.traverseTasks();
        System.out.println("\nSearching Task 2");
        Task task = system.searchTask(2);
        if (task != null) System.out.println(task.taskId + " | " + task.taskName + " | " + task.status);
        System.out.println();
        system.deleteTask(1);
        system.traverseTasks();
    }
}