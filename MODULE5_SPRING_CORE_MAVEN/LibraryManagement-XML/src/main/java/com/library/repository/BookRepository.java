package com.library.repository;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Exercise 1: Define Service and Repository Classes.
 * Exercise 6: Annotated with @Repository so it can be picked up by component scanning.
 */
@Repository
public class BookRepository {

    private final List<String> books = new ArrayList<>();

    public BookRepository() {
        // Seed with some sample data so the application has something to show.
        books.add("Effective Java");
        books.add("Clean Code");
        books.add("Spring in Action");
    }

    public List<String> findAllBooks() {
        return books;
    }

    public void addBook(String title) {
        books.add(title);
    }

    @Override
    public String toString() {
        return "BookRepository{books=" + books + "}";
    }
}
