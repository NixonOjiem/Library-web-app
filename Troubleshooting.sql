DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS borrowed_books;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    published_date DATE,
    genre VARCHAR(100),
    copies_available INT DEFAULT 0,
    cover_image BLOB
);

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
select * from books;
select * from users;


INSERT INTO borrowed_books (user_id, book_id, date_borrowed, date_expected_return) VALUES (2, 2, '2025-02-14T21:00:00.000Z', '2025-03-25');
INSERT INTO borrowed_books (user_id, book_id, date_borrowed, date_expected_return) VALUES (2, 2, '2025-02-14', '2025-03-25');

delete  from borrowed_books where book_id = 2;
select * from borrowed_books;

--Blackkbox
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
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('librarian', 'normal', 'user', 'disabled') NOT NULL DEFAULT 'normal'
);

-- Create Books Table
CREATE TABLE Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    published_date DATE,
    genre VARCHAR(100),
    cover_image BLOB
);

-- Create a table to manage copies of books
CREATE TABLE BookCopies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    copy_number INT NOT NULL,
    status ENUM('available', 'borrowed', 'lost') DEFAULT 'available',
    FOREIGN KEY (book_id) REFERENCES Books(id)
);

-- Create borrowed_books table
CREATE TABLE BorrowedBooks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_copy_id INT NOT NULL,
    date_borrowed DATE NOT NULL,
    date_expected_return DATE NOT NULL,
    date_returned DATE,
    status ENUM('borrowed', 'returned', 'lost') DEFAULT 'borrowed',
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (book_copy_id) REFERENCES BookCopies(id)
);

-- Create a history table to keep track of all transactions
CREATE TABLE BorrowHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_copy_id INT NOT NULL,
    date_borrowed DATE NOT NULL,
    date_returned DATE,
    status ENUM('borrowed', 'returned', 'lost') DEFAULT 'returned',
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (book_copy_id) REFERENCES BookCopies(id)
);

-- Create a view for user borrow limits
CREATE VIEW user_borrow_limits AS
SELECT user_id, COUNT(*) AS borrowed_count
FROM BorrowedBooks
WHERE status = 'borrowed'
GROUP BY user_id;

-- Create a trigger to ensure that a user cannot borrow more than three books
DELIMITER $$

CREATE TRIGGER before_borrow_insert
BEFORE INSERT ON BorrowedBooks
FOR EACH ROW
BEGIN
    DECLARE borrow_count INT;

    -- Count the number of borrowed books for the user with status 'borrowed'
    SELECT COUNT(*) INTO borrow_count
    FROM BorrowedBooks
    WHERE user_id = NEW.user_id AND status = 'borrowed';

    -- Check if the user has reached the maximum borrow limit
    IF borrow_count >= 3 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User  has already borrowed the maximum number of books';
    END IF;
END$$

DELIMITER ;