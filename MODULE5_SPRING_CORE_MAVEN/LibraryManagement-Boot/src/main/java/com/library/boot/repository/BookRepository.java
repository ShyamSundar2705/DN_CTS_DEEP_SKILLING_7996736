package com.library.boot.repository;

import com.library.boot.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Exercise 9: BookRepository interface using Spring Data JPA.
 * Extending JpaRepository gives CRUD operations for free
 * (findAll, findById, save, deleteById, etc.).
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
