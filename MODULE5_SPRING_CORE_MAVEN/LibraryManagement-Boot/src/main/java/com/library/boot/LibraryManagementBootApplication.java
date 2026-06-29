package com.library.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Exercise 9: Creating a Spring Boot Application.
 * Entry point for the Spring Boot version of the Library Management system.
 */
@SpringBootApplication
public class LibraryManagementBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementBootApplication.class, args);
    }
}
