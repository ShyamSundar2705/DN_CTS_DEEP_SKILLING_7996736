package com.cognizant.spring_learn.service;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.cognizant.spring_learn.model.Country;

@Service
public class CountryService {

    public Country getCountry(String code) {

        try (ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml")) {

            String beanId = code.toLowerCase();

            return context.getBean(beanId, Country.class);

        }
    }
}