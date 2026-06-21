public class MVCPatternExample {

    public static void main(String[] args) {

        Student student = new Student(
                "Shyam Sundar",
                "23IT001",
                "A");

        StudentView view = new StudentView();

        StudentController controller =
                new StudentController(student, view);

        System.out.println("Initial Student Details:");
        controller.updateView();

        controller.setStudentName("Shyam S");
        controller.setStudentGrade("A+");

        System.out.println("\nUpdated Student Details:");
        controller.updateView();
    }
}

class Student {

    private String name;
    private String id;
    private String grade;

    public Student(String name,
                   String id,
                   String grade) {

        this.name = name;
        this.id = id;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public String getGrade() {
        return grade;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}

class StudentView {

    public void displayStudentDetails(
            String name,
            String id,
            String grade) {

        System.out.println("Student Name : " + name);
        System.out.println("Student ID   : " + id);
        System.out.println("Grade        : " + grade);
    }
}

class StudentController {

    private Student model;
    private StudentView view;

    public StudentController(
            Student model,
            StudentView view) {

        this.model = model;
        this.view = view;
    }

    public void setStudentName(String name) {
        model.setName(name);
    }

    public void setStudentGrade(String grade) {
        model.setGrade(grade);
    }

    public void updateView() {

        view.displayStudentDetails(
                model.getName(),
                model.getId(),
                model.getGrade());
    }
}