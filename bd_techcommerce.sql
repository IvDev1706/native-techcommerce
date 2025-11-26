-- crear la base de datos
create database techcommerce;
use techcommerce;

-- tablas de la base de datos
create table Users(
    id int auto_increment primary key,
    user_name varchar(15) not null,
    user_pass varchar(10) not null,
    user_mail varchar(35) not null
);

create table Admins(
    id int auto_increment primary key references Users(id) on delete cascade
);

create table Sellers(
    id int auto_increment primary key references Users(id) on delete cascade
);

create table Clients(
    id int auto_increment primary key references Users(id) on delete cascade
);

create table Product(
    id int auto_increment primary key,
    product_name varchar(30) not null,
    product_desc text default('sin descripcion'),
    product_units int not null,
    product_price float not null,
    product_seller int references Sellers(id) on delete cascade
);

create table Orders(
    id int auto_increment primary key,
    order_date date not null,
    order_status varchar(10) check (order_status in ('pedido','enviado','recibido')),
    order_amount float not null,
    order_user int references Clients(id) on delete cascade
);

create table ProductList(
	id int auto_increment primary key,
    ord int references Orders(id) on delete cascade,
    product int references Product(id) on delete set null
);

create index idx_plist on ProductList(ord, product);

-- registro de administrador
insert into Users(user_name, user_pass, user_mail) values ('admin','admin12345','admin@mail.com');
insert into Admins values (LAST_INSERT_ID());