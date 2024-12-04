const express = require('express');
const { 
  addExpense, 
  getExpenses, 
  analyzeSpending 
} = require('../controllers/expenseController');
const { validateExpense } = require('../middlewares/validation');

const router = express.Router();

// Add a new expense
router.post('/', validateExpense, addExpense);

// Get expenses
router.get('/', getExpenses);

// Analyze spending
router.get('/analysis', analyzeSpending);

module.exports = router;
