const express = require('express');
const bodyParser = require('body-parser');
const expenseRoute = require('./routes/expenseRoute');
const db = require('./util/database');

const app = express();
const PORT = 3000;

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.static('public'));
app.use(bodyParser.json());

// Use the expense route
app.use('/', expenseRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
