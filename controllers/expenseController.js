const db = require('../util/database'); 

exports.getExpenses = (req, res) => {
  const selectQuery = 'SELECT * FROM expense';

  db.query(selectQuery, (err, expenses) => {
    if (err) {
      console.error('Error retrieving expenses:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(expenses);
  });
};

exports.createExpense = (req, res) => {
  const { amount, description, category } = req.body;

  if (amount !== null && amount !== undefined) {
    const insertQuery = 'INSERT INTO expense (amount, description, category) VALUES (?, ?, ?)';
    const selectExpenseQuery = 'SELECT * FROM expense';

    db.query(insertQuery, [amount, description, category], (err) => {
      if (err) {
        console.error('Error inserting expense:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      db.query(selectExpenseQuery, (err, expenses) => {
        if (err) {
          console.error('Error retrieving expenses:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        res.json(expenses);
      });
    });
  } else {
    res.status(400).json({ error: 'amount cannot be null or undefined' });
  }
};

exports.updateExpense = (req, res) => {
  const expenseId = req.params.id;
  const { amount, description, category } = req.body;
  const updateQuery = 'UPDATE expense SET amount = ?, description = ?, category = ? WHERE id = ?';

  db.query(updateQuery, [amount, description, category, expenseId], (err) => {
    if (err) {
      console.error('Error updating expense:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Expense updated successfully' });
  });
};

exports.deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  const deleteQuery = 'DELETE FROM expense WHERE id = ?';

  db.query(deleteQuery, [expenseId], (err) => {
    if (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Expense deleted successfully' });
  });
};
