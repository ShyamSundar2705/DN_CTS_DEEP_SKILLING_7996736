package com.cognizant.ormlearn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.ormlearn.model.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, String> {

    // Hands on 5: Find list of countries matching a partial country name.
    // Spring Data JPA derives the query from the method name:
    // "...ContainingIgnoreCase" -> WHERE co_name LIKE %name% (case-insensitive)
    List<Country> findByNameContainingIgnoreCase(String namePart);
}
