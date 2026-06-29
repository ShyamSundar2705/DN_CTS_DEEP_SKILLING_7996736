import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ParameterizedLogging {

    private static final Logger logger = LoggerFactory.getLogger(ParameterizedLogging.class);

    public static void main(String[] args) {

        String name = "Shyam";
        int age = 20;
        double marks = 91.5;

        logger.info("Student Name: {}", name);
        logger.info("Age: {}", age);
        logger.info("Marks: {}", marks);

        logger.info("Student {} is {} years old and scored {} marks.", name, age, marks);
    }
}