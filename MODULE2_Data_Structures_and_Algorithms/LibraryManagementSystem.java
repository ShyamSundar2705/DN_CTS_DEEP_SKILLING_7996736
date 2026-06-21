class Book {
    int bookId;
    String title;
    String author;

    public Book(int bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }

    @Override
    public String toString() {
        return bookId + " | " + title + " | " + author;
    }
}

public class LibraryManagementSystem {
    public static int linearSearch(Book[] books, String title) {
        for (int i = 0; i < books.length; i++) {
            if (books[i].title.equalsIgnoreCase(title)) return i;
        }
        return -1;
    }

    public static int binarySearch(Book[] books, String title) {
        int left = 0, right = books.length - 1;
        while (left <= right) {
            int middle = (left + right) / 2;
            int comparison = books[middle].title.compareToIgnoreCase(title);
            if (comparison == 0) return middle;
            if (comparison < 0) left = middle + 1;
            else right = middle - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Book[] books = {
            new Book(101, "Algorithms", "Thomas Cormen"),
            new Book(102, "Database Systems", "Korth"),
            new Book(103, "Java Programming", "Herbert Schildt"),
            new Book(104, "Operating Systems", "Galvin")
        };
        int linearResult = linearSearch(books, "Java Programming");
        if (linearResult != -1) {
            System.out.println("Linear Search Result:");
            System.out.println(books[linearResult]);
        }
        int binaryResult = binarySearch(books, "Java Programming");
        if (binaryResult != -1) {
            System.out.println("\nBinary Search Result:");
            System.out.println(books[binaryResult]);
        }
    }
}