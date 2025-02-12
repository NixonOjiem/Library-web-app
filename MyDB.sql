-- Delete the existing library database
DROP DATABASE IF EXISTS library;

-- Create a new library database
CREATE DATABASE library;

-- Use the library database
USE library;

-- Create the books users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('librarian', 'user') NOT NULL
);
