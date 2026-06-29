package com.cognizant.ormlearn;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);

    private static CountryService countryService;

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
        LOGGER.info("Inside main");

        countryService = context.getBean(CountryService.class);

        testGetAllCountries();
        testFindCountryByCode();
        testAddCountry();
        testUpdateCountry();
        testFindCountriesByPartialName();
        testDeleteCountry();
    }

    // Hands on 1: Test retrieving all countries.
    private static void testGetAllCountries() {
        LOGGER.info("Start");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.debug("countries={}", countries);
        LOGGER.info("End");
    }

    // Hands on 6: Test finding a country based on country code.
    private static void testFindCountryByCode() {
        LOGGER.info("Start");
        try {
            Country country = countryService.findCountryByCode("IN");
            LOGGER.debug("Country:{}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Country not found", e);
        }
        LOGGER.info("End");
    }

    // Hands on 7: Test adding a new country.
    private static void testAddCountry() {
        LOGGER.info("Start");
        Country newCountry = new Country("ZZ", "Zedland");
        countryService.addCountry(newCountry);

        try {
            Country fetched = countryService.findCountryByCode("ZZ");
            LOGGER.debug("Added country fetched back from DB: {}", fetched);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Country was not added correctly", e);
        }
        LOGGER.info("End");
    }

    // Hands on 8: Test updating a country's name based on code.
    private static void testUpdateCountry() {
        LOGGER.info("Start");
        try {
            countryService.updateCountry("ZZ", "Zedland Updated");
            Country updated = countryService.findCountryByCode("ZZ");
            LOGGER.debug("Country after update: {}", updated);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Country not found for update", e);
        }
        LOGGER.info("End");
    }

    // Hands on 5: Test finding countries matching a partial name.
    private static void testFindCountriesByPartialName() {
        LOGGER.info("Start");
        List<Country> matches = countryService.findCountriesByPartialName("united");
        LOGGER.debug("Countries matching 'united': {}", matches);
        LOGGER.info("End");
    }

    // Hands on 9: Test deleting a country based on code.
    private static void testDeleteCountry() {
        LOGGER.info("Start");
        countryService.deleteCountry("ZZ");

        try {
            countryService.findCountryByCode("ZZ");
            LOGGER.error("Country was NOT deleted - it is still present!");
        } catch (CountryNotFoundException e) {
            LOGGER.debug("Confirmed: country ZZ has been deleted.");
        }
        LOGGER.info("End");
    }
}
