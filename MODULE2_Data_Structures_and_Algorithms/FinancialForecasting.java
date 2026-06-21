public class FinancialForecasting {

    public static double calculateFutureValue(double currentValue, double growthRate, int years) {
        if (years == 0) return currentValue;
        return calculateFutureValue(currentValue * (1 + growthRate), growthRate, years - 1);
    }

    public static void main(String[] args) {
        double presentValue = 10000;
        double annualGrowthRate = 0.10;
        int forecastYears = 5;
        double predictedValue = calculateFutureValue(presentValue, annualGrowthRate, forecastYears);
        System.out.printf("Future Value after %d years = %.2f", forecastYears, predictedValue);
    }
}