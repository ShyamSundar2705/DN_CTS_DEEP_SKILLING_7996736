public class SingletonPatternExample {

    public static void main(String[] args) {

        Logger firstLogger = Logger.getInstance();
        firstLogger.log("System Started");

        Logger secondLogger = Logger.getInstance();
        secondLogger.log("User Login Successful");

        if (firstLogger == secondLogger) {
            System.out.println("Singleton Pattern Working Correctly");
        } else {
            System.out.println("Multiple Objects Created");
        }
    }
}

class Logger {

    private static final Logger instance = new Logger();

    private Logger() {
        System.out.println("Logger Object Created");
    }

    public static Logger getInstance() {
        return instance;
    }

    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}