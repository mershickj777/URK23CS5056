const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // replace with your MySQL password
  database: 'contact_app'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Routes

// Get all contacts
app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a contact
app.post('/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  db.query('INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)', [name, phone, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Contact added');
  });
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM contacts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Contact deleted');
  });
});

// Update a contact
app.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const { name, phone, email } = req.body;
  db.query('UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?', [name, phone, email, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Contact updated');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
