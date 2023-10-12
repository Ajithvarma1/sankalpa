const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;


app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'taskdb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


app.post('/tasks', (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  const task = {
    title,
    description,
    dueDate,
    priority,
  };

  const sql = 'INSERT INTO tasks SET ?';

  db.query(sql, task, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create task' });
    } else {
      console.log('Task created');
      res.status(201).json({ message: 'Task created successfully' });
    }
  });
});

app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
