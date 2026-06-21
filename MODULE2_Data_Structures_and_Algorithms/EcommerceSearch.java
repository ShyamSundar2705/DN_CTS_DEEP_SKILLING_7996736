class Product {
    int productId;
    String productName;
    String category;

    public Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }
}

public class EcommerceSearch {

    public static int linearSearch(Product[] products, String name) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].productName.equalsIgnoreCase(name)) {
                return i;
            }
        }
        return -1;
    }

    public static int binarySearch(Product[] products, String name) {
        int left = 0, right = products.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            int compare = products[mid].productName.compareToIgnoreCase(name);
            if (compare == 0) return mid;
            if (compare < 0) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Product[] products = {
            new Product(1, "Smartphone", "Electronics"),
            new Product(2, "Headphones", "Audio"),
            new Product(3, "Tablet", "Computers"),
            new Product(4, "Speaker", "Audio")
        };
        int linearResult = linearSearch(products, "Tablet");
        System.out.println("Linear Search Index: " + linearResult);
        int binaryResult = binarySearch(products, "Laptop");
        System.out.println("Binary Search Index: " + binaryResult);
    }
}