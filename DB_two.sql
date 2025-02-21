--copi
-- Delete the existing library database
DROP DATABASE IF EXISTS library;

-- Create a new library database
CREATE DATABASE library;

-- Use the library database
USE library;

-- Create the Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('librarian', 'normal', 'disabled') NOT NULL DEFAULT 'normal'
);

-- Create the Books table
CREATE TABLE Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    published_date DATE,
    genre VARCHAR(100),
    total_copies INT DEFAULT 0,
    available_copies INT DEFAULT 0,
    cover_image BLOB
);

-- Create the Borrowed_Books table
CREATE TABLE Borrowed_Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    date_borrowed DATE NOT NULL,
    date_expected_return DATE NOT NULL,
    date_returned DATE,
    status ENUM('borrowed', 'returned', 'lost') DEFAULT 'borrowed',
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (book_id) REFERENCES Books(id)
);

-- Create a view to track user borrow limits
CREATE VIEW User_Borrow_Limits AS
SELECT user_id, COUNT(*) AS borrowed_count
FROM Borrowed_Books
WHERE status = 'borrowed'
GROUP BY user_id;

-- Trigger to ensure a user cannot borrow more than three books
DELIMITER $$

CREATE TRIGGER Before_Borrow_Insert
BEFORE INSERT ON Borrowed_Books
FOR EACH ROW
BEGIN
    DECLARE borrow_count INT;

    -- Count the number of borrowed books for the user with status 'borrowed'
    SELECT COUNT(*) INTO borrow_count
    FROM Borrowed_Books
    WHERE user_id = NEW.user_id AND status = 'borrowed';

    -- Check if the user has reached the maximum borrow limit
    IF borrow_count >= 3 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User has already borrowed the maximum number of books';
    END IF;
END$$

DELIMITER ;