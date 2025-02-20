const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB limit
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 100000 }));

// Creating a database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'library',
  port: 3307
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the library database');
});

// Registration endpoint
app.post('/signup', (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  const checkSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkSql, [username], (err, results) => {
    if (err) {
      return res.status(500).send('Error checking username');
    }
    if (results.length > 0) {
      return res.status(400).send('Username already exists');
    }

    // Set role to 'user' by default
    const role = 'user';
    const query = `INSERT INTO users (first_name, last_name, username, password, role) VALUES (?,?,?,?,?)`;
    db.query(query, [first_name, last_name, username, password, role], (err, results) => {
      if (err) {
        return res.status(500).send('Error signing up');
      }
      res.send('User registered successfully');
    });
  });
});

// Signin Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send('Error signing in');
    }
    if (results.length === 0) {
      return res.status(400).send('Invalid username or password');
    }
    // Send the response once
    return res.json({ userId: results[0].id, username: results[0].username });
  });
});

// Endpoint for fetching user role
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT role FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching user role');
    }
    res.json(results[0]);
  });
});

// Endpoint for fetching all users
app.get('/users', (req, res) => {
  const query = 'SELECT id, first_name, last_name, username, role FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
});

// Endpoint for updating user
app.put('/user-update/:id', (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, username, role } = req.body;
  const query = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, role = ? WHERE id = ?';
  db.query(query, [first_name, last_name, username, role, id], (err, results) => {
    if (err) {
      return res.status(500).send('Error updating user');
    }
    res.send('User updated successfully');
  });
});

// Endpoint for resetting password
app.put('/reset-password/:id', (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  const query = 'UPDATE users SET password = ? WHERE id = ?';
  db.query(query, [password, id], (err, results) => {
    if (err) {
      return res.status(500).send('Error resetting password');
    }
    res.send('Password reset successfully');
  });
});

// Endpoint to add books
app.post('/add-books', (req, res) => {
  const books = req.body;

  // Insert each book into the database
  books.forEach((book) => {
    const { title, author, isbn, published_date, genre, copies_available, cover_image } = book;
    const sql = 'INSERT INTO books (title, author, isbn, published_date, genre, copies_available, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, author, isbn, published_date, genre, copies_available, cover_image], (err, result) => {
      if (err) {
        console.error('Error inserting book:', err);
        return res.status(500).send('Error adding books');
      }
    });
  });
  console.log('Received books:', books);
  res.status(200).send('Books added successfully');
});

// Endpoint to display all the books in the system
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching books');
    }
    const booksWithImages = results.map(book => {
      return {
        ...book,
        cover_image: book.cover_image ? book.cover_image.toString('base64') : null
      };
    });
    res.json(booksWithImages);
  });
});

// Endpoint to get a specific book
app.get('/edit-books/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM books WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching book');
    }
    if (results.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(results[0]); // Send the first result as the book object
  });
});

// Endpoint for editing a book's details
app.put('/edit-book-api/:id', (req, res) => {
  const id = req.params.id;
  const updatedBook = req.body;

  const query = `
    UPDATE books
    SET title = ?, author = ?, cover_image = ?, published_date = ?, genre = ?, isbn = ?, copies_available = ?
    WHERE id = ?
  `;

  const values = [
    updatedBook.title,
    updatedBook.author,
    updatedBook.cover_image,
    updatedBook.published_date,
    updatedBook.genre,
    updatedBook.isbn,
    updatedBook.copies_available,
    id
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating the book:', err);
      res.status(500).json({ message: 'Error updating the book' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(200).json({ message: 'Book updated successfully' });
    }
  });
});

app.use((req, res, next) => {
  console.log(`Request size: ${req.headers['content-length']} bytes`);
  next();
});

//End point for users to update their
app.put('/update-user-api/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, password } = req.body;

  const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
  db.query(query, [username, password, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Error updating user' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
});

//End point to fetch books borrowed by a specific user
app.get('/books-borrowed/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const query = `
    SELECT 
      borrowed_books.user_id, 
      books.title, 
      borrowed_books.date_borrowed, 
      borrowed_books.date_expected_return 
    FROM 
      borrowed_books 
    JOIN 
      books ON borrowed_books.book_id = books.id 
    WHERE 
      borrowed_books.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching books borrowed:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

//user borrowing book end point
app.post('/book-borrow', (req, res) => {
  const { userId, bookId, borrowDate, returnDate } = req.body;
  const query = `INSERT INTO borrowed_books (user_id, book_id, date_borrowed, date_expected_return) VALUES (?,?,?,?)`;
  db.query(query, [userId, bookId, borrowDate, returnDate], (err, results) => {
    if (err) {
      return res.status(500).send('Error borrowing books');
    }
    res.send('Book borrowed successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});