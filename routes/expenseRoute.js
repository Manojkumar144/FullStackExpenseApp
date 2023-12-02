const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// API to get all expenses
router.get('/api/expense', expenseController.getExpenses);

// API to handle expense submission
router.post('/api/expense', expenseController.createExpense);

// API to handle expense update
router.put('/api/expense/:id', expenseController.updateExpense);

// API to handle expense deletion
router.delete('/api/expense/:id', expenseController.deleteExpense);

module.exports = router;
