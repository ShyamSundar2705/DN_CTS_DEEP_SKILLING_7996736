public class BuilderPatternExample {

    public static void main(String[] args) {

        Computer gamingComputer = new Computer.Builder()
                .setCPU("AMD Ryzen 9")
                .setRAM("32 GB")
                .setStorage("2 TB SSD")
                .setOperatingSystem("Windows 11")
                .build();

        Computer studentComputer = new Computer.Builder()
                .setCPU("Intel i5")
                .setRAM("16 GB")
                .setStorage("512 GB SSD")
                .setOperatingSystem("Ubuntu 24.04")
                .build();

        System.out.println("Gaming Computer:");
        System.out.println(gamingComputer);

        System.out.println();

        System.out.println("Student Computer:");
        System.out.println(studentComputer);
    }
}

class Computer {

    private String CPU;
    private String RAM;
    private String storage;
    private String operatingSystem;

    private Computer(Builder builder) {
        this.CPU = builder.CPU;
        this.RAM = builder.RAM;
        this.storage = builder.storage;
        this.operatingSystem = builder.operatingSystem;
    }

    @Override
    public String toString() {
        return "CPU = " + CPU +
                ", RAM = " + RAM +
                ", Storage = " + storage +
                ", OS = " + operatingSystem;
    }

    public static class Builder {

        private String CPU;
        private String RAM;
        private String storage;
        private String operatingSystem;

        public Builder setCPU(String CPU) {
            this.CPU = CPU;
            return this;
        }

        public Builder setRAM(String RAM) {
            this.RAM = RAM;
            return this;
        }

        public Builder setStorage(String storage) {
            this.storage = storage;
            return this;
        }

        public Builder setOperatingSystem(String operatingSystem) {
            this.operatingSystem = operatingSystem;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }
}