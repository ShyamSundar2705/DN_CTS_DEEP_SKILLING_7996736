package com.cognizant.spring_learn.controller;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class AuthenticationController {

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(
            @RequestHeader("Authorization") String authHeader) {

        String user = getUser(authHeader);

        String token = generateJwt(user);

        Map<String, String> map = new HashMap<>();

        map.put("token", token);

        return map;
    }

    private String getUser(String authHeader) {

        String encodedCredentials = authHeader.substring(6);

        byte[] decodedBytes =
                Base64.getDecoder().decode(encodedCredentials);

        String credentials = new String(decodedBytes);

        return credentials.split(":")[0];
    }

    private String generateJwt(String user) {

        JwtBuilder builder = Jwts.builder();

        builder.setSubject(user);

        builder.setIssuedAt(new Date());

        builder.setExpiration(
                new Date(System.currentTimeMillis() + 1200000));

        builder.signWith(SignatureAlgorithm.HS256, "secretkey");

        return builder.compact();
    }
}