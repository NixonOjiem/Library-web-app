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