-- Run against the "ormlearn" MySQL schema:
--   mysql -u root -p
--   mysql> create schema ormlearn;
--   mysql> use ormlearn;
--   mysql> source country_table.sql;

create table country(co_code varchar(2) primary key, co_name varchar(50));

insert into country values ('IN', 'India');
insert into country values ('US', 'United States of America');
