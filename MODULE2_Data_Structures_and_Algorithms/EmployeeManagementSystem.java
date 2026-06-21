class Employee {
    int employeeId;
    String name;
    String position;
    double salary;

    public Employee(int employeeId, String name, String position, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    @Override
    public String toString() {
        return employeeId + " | " + name + " | " + position + " | ₹" + salary;
    }
}

public class EmployeeManagementSystem {
    private Employee[] employees;
    private int count;

    public EmployeeManagementSystem(int size) {
        employees = new Employee[size];
        count = 0;
    }

    public void addEmployee(Employee employee) {
        if (count < employees.length) {
            employees[count++] = employee;
            System.out.println("Employee Added");
        } else {
            System.out.println("Array Full");
        }
    }

    public Employee searchEmployee(int employeeId) {
        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == employeeId) return employees[i];
        }
        return null;
    }

    public void traverseEmployees() {
        System.out.println("\nEmployee Records:");
        for (int i = 0; i < count; i++) System.out.println(employees[i]);
    }

    public void deleteEmployee(int employeeId) {
        int index = -1;
        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == employeeId) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            System.out.println("Employee Not Found");
            return;
        }
        for (int i = index; i < count - 1; i++) employees[i] = employees[i + 1];
        employees[--count] = null;
        System.out.println("Employee Deleted");
    }

    public static void main(String[] args) {
        EmployeeManagementSystem system = new EmployeeManagementSystem(10);
        system.addEmployee(new Employee(101, "Rahul", "Manager", 60000));
        system.addEmployee(new Employee(102, "Priya", "Developer", 45000));
        system.addEmployee(new Employee(103, "Arun", "Tester", 40000));
        system.traverseEmployees();
        System.out.println("\nSearching Employee 102:");
        Employee foundEmployee = system.searchEmployee(102);
        if (foundEmployee != null) System.out.println(foundEmployee);
        System.out.println();
        system.deleteEmployee(101);
        system.traverseEmployees();
    }
}