package com.library;

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Loads the Spring application context and exercises the beans defined in
 * applicationContext.xml, demonstrating:
 *  - Exercise 1: Basic Spring configuration
 *  - Exercise 2: Dependency Injection (setter)
 *  - Exercise 3: AOP logging of execution time
 *  - Exercise 5: IoC container configuration
 *  - Exercise 6: Annotation based configuration (component-scan)
 *  - Exercise 7: Constructor and setter injection
 *  - Exercise 8: Basic AOP (before / after advice)
 */
public class LibraryManagementApplication {

    public static void main(String[] args) {
        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("\n--- Bean wired via SETTER injection (bookServiceSetter) ---");
        BookService setterInjectedService = context.getBean("bookServiceSetter", BookService.class);
        System.out.println("Books: " + setterInjectedService.listBooks());

        System.out.println("\n--- Bean wired via CONSTRUCTOR injection (bookServiceConstructor) ---");
        BookService constructorInjectedService = context.getBean("bookServiceConstructor", BookService.class);
        System.out.println("Books: " + constructorInjectedService.listBooks());

        System.out.println("\n--- Bean discovered via @Service / @Repository component-scan ---");
        BookService annotatedService = context.getBean("bookService", BookService.class);
        annotatedService.addBook("Domain-Driven Design");
        System.out.println("Books: " + annotatedService.listBooks());

        ((ClassPathXmlApplicationContext) context).close();
    }
}
