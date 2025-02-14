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

--Create Books Table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    published_date DATE,
    genre VARCHAR(100),
    copies_available INT DEFAULT 1,
    cover_image BLOB
);

--create borrowed_books table
CREATE TABLE borrowed_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    date_borrowed DATE NOT NULL,
    date_expected_return DATE NOT NULL,
    date_returned DATE,
    status ENUM('borrowed', 'returned', 'lost') DEFAULT 'borrowed',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

--This command creates a view named user_borrow_limits. 
--A view is a virtual table based on the result set of a SQL query.
CREATE VIEW user_borrow_limits AS
SELECT user_id, COUNT(*) AS borrowed_count
FROM borrowed_books
WHERE status = 'borrowed'
GROUP BY user_id;


--This trigger ensures that a user cannot borrow more than three books
DELIMITER $$

CREATE TRIGGER before_borrow_insert
BEFORE INSERT ON borrowed_books
FOR EACH ROW
BEGIN
    DECLARE borrow_count INT;
    SELECT COUNT(*) INTO borrow_count
    FROM borrowed_books
    WHERE user_id = NEW.user_id AND status = 'borrowed';

    IF borrow_count >= 3 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User has already borrowed the maximum number of books';
    END IF;
END$$

DELIMITER ;



