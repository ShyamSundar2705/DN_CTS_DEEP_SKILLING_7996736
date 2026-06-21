
import java.util.HashMap;

class Product {
    int productId;
    String productName;
    int quantity;
    double price;

    public Product(int productId, String productName, int quantity, double price) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    @Override
    public String toString() {
        return productId + " | " + productName + " | Qty: " + quantity + " | Price: ₹" + price;
    }
}

public class InventoryManagementSystem {
    private HashMap<Integer, Product> inventory = new HashMap<>();

    public void addProduct(Product product) {
        inventory.put(product.productId, product);
    }

    public void updateProduct(int id, int quantity, double price) {
        Product product = inventory.get(id);
        if (product != null) {
            product.quantity = quantity;
            product.price = price;
        }
    }

    public void deleteProduct(int id) {
        inventory.remove(id);
    }

    public void displayProducts() {
        for (Product product : inventory.values()) System.out.println(product);
    }

    public static void main(String[] args) {
        InventoryManagementSystem system = new InventoryManagementSystem();
        system.addProduct(new Product(1, "Monitor", 30, 7999));
        system.addProduct(new Product(2, "Webcam", 40, 2999));
        system.updateProduct(1, 25, 7499);
        system.displayProducts();
        System.out.println("\nDeleting Product 002\n");
        system.deleteProduct(2);
        system.displayProducts();
    }
}
