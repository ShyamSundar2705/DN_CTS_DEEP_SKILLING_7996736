package com.library.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;

/**
 * Exercise 3: Logging method execution times.
 * Exercise 8: Basic AOP advice methods (before / after).
 */
@Aspect
public class LoggingAspect {

    // Exercise 8: Before advice - runs before any method in the service package.
    @Before("execution(* com.library.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("[AOP][BEFORE] Entering method: " + joinPoint.getSignature().toShortString());
    }

    // Exercise 8: After advice - runs after any method in the service package.
    @After("execution(* com.library.service.*.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("[AOP][AFTER]  Exiting method:  " + joinPoint.getSignature().toShortString());
    }

    // Exercise 3: Around advice - measures and logs method execution time.
    @Around("execution(* com.library.service.*.*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long elapsed = System.currentTimeMillis() - start;
        System.out.println("[AOP][TIMER]  " + joinPoint.getSignature().toShortString()
                + " executed in " + elapsed + " ms");
        return result;
    }
}
