# orm-learn

Demo project for Spring Data JPA and Hibernate — covers all Hands-on exercises
(1, 5, 6, 7, 8, 9) from the ORM / Spring Data JPA module.

## Project layout

```
orm-learn/
├── pom.xml
├── sql/
│   ├── country_table.sql      Hands on 1: minimal table + 2 sample rows
│   └── country_full.sql       Hands on 5: full ~250 row country list
├── src/main/resources/
│   ├── application.properties      MySQL config (ddl-auto=validate)
│   ├── application-h2.properties   Optional H2 profile for quick local runs
│   └── data.sql                    Small seed data, used only with the "h2" profile
└── src/main/java/com/cognizant/ormlearn/
    ├── OrmLearnApplication.java        main() + all hands-on test methods
    ├── model/Country.java              @Entity mapped to the "country" table
    ├── repository/CountryRepository.java   JpaRepository + partial-name query method
    ├── service/CountryService.java         @Transactional CRUD + search methods
    └── service/exception/CountryNotFoundException.java
```

## Running with MySQL (as described in Hands-on 1)

1. Start MySQL Server and create the schema:
   ```
   mysql -u root -p
   mysql> create schema ormlearn;
   mysql> use ormlearn;
   mysql> source sql/country_table.sql;
   ```
   For Hands-on 5 (full country list), instead run:
   ```
   mysql> delete from country;
   mysql> source sql/country_full.sql;
   ```
2. Confirm `src/main/resources/application.properties` matches your MySQL
   username/password (defaults to `root` / `root`).
3. Build and run:
   ```
   mvn clean package
   mvn spring-boot:run
   ```
   (If you need a corporate proxy, add the usual
   `-Dhttp.proxyHost=... -Dhttp.proxyPort=... -Dhttps.proxyHost=... -Dhttps.proxyPort=...`
   flags to the `mvn` command as described in the exercise.)
4. Watch the console log — `OrmLearnApplication` logs "Inside main" and then
   runs each hands-on test method (`testGetAllCountries`, `testFindCountryByCode`,
   `testAddCountry`, `testUpdateCountry`, `testFindCountriesByPartialName`,
   `testDeleteCountry`), with Hibernate SQL trace logging showing every
   generated statement.

## Running without MySQL (quick local check)

An H2 in-memory profile is included so you can sanity-check the code without
setting up MySQL:
```
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```
This uses `application-h2.properties` (`ddl-auto=update`, so Hibernate creates
the table itself) and seeds it from `data.sql`.

## What each class demonstrates

- **Country** (`model`) — `@Entity`, `@Table`, `@Id`, `@Column` mapping to the
  `country` table's `co_code` / `co_name` columns.
- **CountryRepository** — extends `JpaRepository<Country, String>` for free
  CRUD methods (`findAll`, `findById`, `save`, `deleteById`), plus a derived
  query method `findByNameContainingIgnoreCase` for Hands-on 5's "find
  countries matching a partial name" requirement.
- **CountryService** — `@Service` + `@Transactional` methods:
  - `getAllCountries()` — Hands-on 1
  - `findCountryByCode()` — Hands-on 6 (throws `CountryNotFoundException`)
  - `addCountry()` — Hands-on 7
  - `updateCountry()` — Hands-on 8
  - `deleteCountry()` — Hands-on 9
  - `findCountriesByPartialName()` — Hands-on 5
- **OrmLearnApplication** — wires everything together, fetches `CountryService`
  from the `ApplicationContext`, and runs a test method for every hands-on
  exercise in sequence, logging start/end and results via SLF4J.

## Notes

- This project was authored in a sandbox without internet access to Maven
  Central, so it has **not** been compiled/run here. Run `mvn clean package`
  yourself with an internet connection and JDK 8+ to verify the build.
- `spring.jpa.hibernate.ddl-auto=validate` (used against MySQL) expects the
  `country` table to already exist — create it first with the SQL scripts in
  `sql/`, as the original exercise describes.
