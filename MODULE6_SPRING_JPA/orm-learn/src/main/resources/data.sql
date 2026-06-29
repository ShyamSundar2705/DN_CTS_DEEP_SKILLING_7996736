-- Used only when running with the "h2" profile (spring.sql.init.mode=always).
-- Loads a small sample so the test methods in OrmLearnApplication have data to work with.
-- The full list of ~250 countries is provided separately in sql/country_full.sql
-- for use against a real MySQL "ormlearn" schema.

insert into country (co_code, co_name) values ('IN', 'India');
insert into country (co_code, co_name) values ('US', 'United States of America');
insert into country (co_code, co_name) values ('GB', 'United Kingdom');
insert into country (co_code, co_name) values ('FR', 'France');
insert into country (co_code, co_name) values ('DE', 'Germany');
