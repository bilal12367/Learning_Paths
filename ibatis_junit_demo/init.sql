create database dev;
use dev;

create table USERS(
	id INTEGER primary key,
    userName varchar(30),
    email varchar(40),
    role varchar(20),
    active bool
);