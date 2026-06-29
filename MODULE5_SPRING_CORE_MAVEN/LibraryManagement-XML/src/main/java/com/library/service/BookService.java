package com.library.service;

import com.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Exercise 2: Implementing Dependency Injection (setter injection).
 * Exercise 6: Annotated with @Service for component scanning.
 * Exercise 7: Also exposes a constructor so it can be wired via constructor injection.
 */
@Service
public class BookService {

    private BookRepository bookRepository;

    // Default constructor - required when only setter injection is used.
    public BookService() {
    }

    // Exercise 7: Constructor injection.
    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Exercise 2 / 7: Setter injection.
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookRepository getBookRepository() {
        return bookRepository;
    }

    public List<String> listBooks() {
        if (bookRepository == null) {
            throw new IllegalStateException("BookRepository has not been injected into BookService");
        }
        return bookRepository.findAllBooks();
    }

    public void addBook(String title) {
        bookRepository.addBook(title);
    }
}
