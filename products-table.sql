DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES
	("pencil", "school supplies", 1.00, 100),
	("paper", "school supplies", 2.25, 500),
	("sneakers", "shoes", 100.00, 10),
	("dress", "clothing and accessories", 20.99, 150),
	("laptop", "electronics", 800.00, 5),
	("backpack", "accessories", 20.00, 50),
	("iPhone", "electronics", 1000, 10),
	("flip flops", "shoes", 25.00, 75),
	("jeans", "clothing and accessories", 34.99, 100);

SELECT * FROM products;
