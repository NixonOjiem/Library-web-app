const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});