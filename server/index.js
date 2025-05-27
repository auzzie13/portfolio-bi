const express = require('express');
const cors = require('cors');
// const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// app.get('/api/projects', (req, res) => {
//   db.query('SELECT * FROM projects', (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // db.query('INSERT INTO contact (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
  //   if (err) return res.status(500).json({ message: 'Error saving message' });
  //   res.json({ message: 'Message received!' });
  // });
  console.log("name: " + name + " Email: " + email + " Message: " + message);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
