public class CommandPatternExample {

    public static void main(String[] args) {

        Light roomLight = new Light();

        Command turnOnCommand = new LightOnCommand(roomLight);
        Command turnOffCommand = new LightOffCommand(roomLight);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(turnOnCommand);
        remote.pressButton();

        remote.setCommand(turnOffCommand);
        remote.pressButton();
    }
}

interface Command {
    void execute();
}

class Light {

    public void turnOn() {
        System.out.println("Room Light is ON");
    }

    public void turnOff() {
        System.out.println("Room Light is OFF");
    }
}

class LightOnCommand implements Command {

    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }
}

class LightOffCommand implements Command {

    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOff();
    }
}

class RemoteControl {

    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}