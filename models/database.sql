create database tienda;
use tienda;
create table productos (
codigo bigint(3) primary key auto_increment,
descripcion text,
precio float,
imagen varchar(100)
);