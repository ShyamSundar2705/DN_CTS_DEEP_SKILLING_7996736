public class ProxyPatternExample {

    public static void main(String[] args) {

        Image firstImage = new ProxyImage("nature.jpg");
        Image secondImage = new ProxyImage("mountain.jpg");

        System.out.println("First Request:");
        firstImage.display();

        System.out.println();

        System.out.println("Second Request:");
        firstImage.display();

        System.out.println();

        System.out.println("Third Request:");
        secondImage.display();
    }
}

interface Image {
    void display();
}

class RealImage implements Image {

    private String imageName;

    public RealImage(String imageName) {
        this.imageName = imageName;
        loadFromServer();
    }

    private void loadFromServer() {
        System.out.println("Loading image from remote server: " + imageName);
    }

    @Override
    public void display() {
        System.out.println("Displaying image: " + imageName);
    }
}

class ProxyImage implements Image {

    private RealImage realImage;
    private String imageName;

    public ProxyImage(String imageName) {
        this.imageName = imageName;
    }

    @Override
    public void display() {

        if (realImage == null) {
            realImage = new RealImage(imageName);
        }

        realImage.display();
    }
}