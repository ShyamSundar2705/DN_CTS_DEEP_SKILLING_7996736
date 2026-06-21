public class AdapterPatternExample {

    public static void main(String[] args) {

        PaymentProcessor gpayProcessor =
                new GPayAdapter(new GPayGateway());

        PaymentProcessor paytmProcessor =
                new PaytmAdapter(new PaytmGateway());

        gpayProcessor.processPayment(1000);
        paytmProcessor.processPayment(1500);
    }
}

interface PaymentProcessor {
    void processPayment(int amount);
}

class GPayGateway {

    public void payUsingGPay(int amount) {
        System.out.println("Payment of Rs." + amount +
                " completed through Google Pay.");
    }
}

class PaytmGateway {

    public void doPaytmPayment(int amount) {
        System.out.println("Payment of Rs." + amount +
                " completed through Paytm.");
    }
}

class GPayAdapter implements PaymentProcessor {

    private GPayGateway gpayGateway;

    public GPayAdapter(GPayGateway gpayGateway) {
        this.gpayGateway = gpayGateway;
    }

    @Override
    public void processPayment(int amount) {
        gpayGateway.payUsingGPay(amount);
    }
}

class PaytmAdapter implements PaymentProcessor {

    private PaytmGateway paytmGateway;

    public PaytmAdapter(PaytmGateway paytmGateway) {
        this.paytmGateway = paytmGateway;
    }

    @Override
    public void processPayment(int amount) {
        paytmGateway.doPaytmPayment(amount);
    }
}