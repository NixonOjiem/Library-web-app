const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//creating a database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'library',
  port: 3307
});

//connecting to the database
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

//Signin Endpoint
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
     //return res.status(200).send('Login is successful');
  });
});

// End Point for fetching user role
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

// End Point for fetching all users
app.get('/users', (req, res) => {
  const query = 'SELECT id, first_name, last_name, username, role FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
});

// End Point for updating user
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

// End Point for resetting password
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

//end Point to add books
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

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});