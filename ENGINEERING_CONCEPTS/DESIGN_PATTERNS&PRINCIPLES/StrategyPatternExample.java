public class StrategyPatternExample {

    public static void main(String[] args) {

        PaymentContext paymentContext = new PaymentContext();

        paymentContext.setStrategy(
                new CreditCardPayment(
                        "Shyam Sundar",
                        "9876543210123456"));

        paymentContext.pay(2500);

        System.out.println();

        paymentContext.setStrategy(
                new PayPalPayment(
                        "shyam@gmail.com"));

        paymentContext.pay(1750);
    }
}

interface PaymentStrategy {

    void pay(double amount);
}

class CreditCardPayment implements PaymentStrategy {

    private String cardHolderName;
    private String cardNumber;

    public CreditCardPayment(String cardHolderName,
                             String cardNumber) {

        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(double amount) {

        System.out.println("₹" + amount +
                " paid using Credit Card");

        System.out.println("Card Holder: " +
                cardHolderName);
    }
}

class PayPalPayment implements PaymentStrategy {

    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {

        System.out.println("₹" + amount +
                " paid using PayPal");

        System.out.println("Account: " + email);
    }
}

class PaymentContext {

    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void pay(double amount) {

        if (strategy != null) {
            strategy.pay(amount);
        } else {
            System.out.println("No payment method selected.");
        }
    }
}