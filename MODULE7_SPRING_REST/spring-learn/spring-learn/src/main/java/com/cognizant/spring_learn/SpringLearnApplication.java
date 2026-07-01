package com.cognizant.spring_learn;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.cognizant.spring_learn.model.Country;

@SpringBootApplication
public class SpringLearnApplication {
	
    private static final Logger LOGGER =
            LoggerFactory.getLogger(SpringLearnApplication.class);

    public static void main(String[] args) {

        LOGGER.info("START");

        SpringApplication.run(SpringLearnApplication.class, args);

        displayDate();

        displayCountry();

        LOGGER.info("END");
    }

    public static void displayDate() {

        LOGGER.info("START");

        try (ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("date-format.xml")) {

            SimpleDateFormat format =
                    context.getBean("dateFormat", SimpleDateFormat.class);

            Date date = format.parse("31/12/2018");

            LOGGER.info("Parsed Date : {}", date);

        } catch (Exception e) {

            LOGGER.error("Exception", e);

        }

        LOGGER.info("END");
    }
    public static void displayCountry() {

        LOGGER.info("START");

        try (ClassPathXmlApplicationContext context =
                     new ClassPathXmlApplicationContext("country.xml")) {

            Country country =
                    context.getBean("country", Country.class);

            LOGGER.info("Country : {}", country);

        } catch (Exception e) {

            LOGGER.error("Exception", e);

        }

        LOGGER.info("END");
    }

}