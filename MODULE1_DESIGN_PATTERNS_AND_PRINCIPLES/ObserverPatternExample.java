import java.util.ArrayList;
import java.util.List;

public class ObserverPatternExample {

    public static void main(String[] args) {

        StockMarket stockMarket = new StockMarket();

        Observer mobileClient = new MobileApp("Android App");
        Observer webClient = new WebApp("Web Dashboard");

        stockMarket.register(mobileClient);
        stockMarket.register(webClient);

        stockMarket.setPrice("TCS", 3850.50);
        stockMarket.setPrice("INFOSYS", 1725.25);

        System.out.println("\nRemoving Web Dashboard...\n");

        stockMarket.deregister(webClient);

        stockMarket.setPrice("WIPRO", 540.75);
    }
}

interface Stock {

    void register(Observer observer);

    void deregister(Observer observer);

    void notifyObservers(String stockName, double stockPrice);
}

class StockMarket implements Stock {

    private List<Observer> observers = new ArrayList<>();

    @Override
    public void register(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void deregister(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String stockName, double stockPrice) {

        for (Observer observer : observers) {
            observer.update(stockName, stockPrice);
        }
    }

    public void setPrice(String stockName, double stockPrice) {

        System.out.println("Updated: " + stockName +
                " -> ₹" + stockPrice);

        notifyObservers(stockName, stockPrice);
    }
}

interface Observer {

    void update(String stockName, double stockPrice);
}

class MobileApp implements Observer {

    private String appName;

    public MobileApp(String appName) {
        this.appName = appName;
    }

    @Override
    public void update(String stockName, double stockPrice) {

        System.out.println(appName +
                " received update: " +
                stockName + " = ₹" + stockPrice);
    }
}

class WebApp implements Observer {

    private String platformName;

    public WebApp(String platformName) {
        this.platformName = platformName;
    }

    @Override
    public void update(String stockName, double stockPrice) {

        System.out.println(platformName +
                " received update: " +
                stockName + " = ₹" + stockPrice);
    }
}