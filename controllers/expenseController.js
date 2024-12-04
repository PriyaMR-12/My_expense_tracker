let expenses = []; // In-memory storage

// Add a new expense
function addExpense(req, res) {
  const { category, amount, date } = req.body;
  const newExpense = { id: expenses.length + 1, category, amount, date };
  expenses.push(newExpense);
  res.status(201).json({ status: 'success', data: newExpense, error: null });
}

// Get expenses with optional filters
function getExpenses(req, res) {
  const { category, startDate, endDate } = req.query;
  let filteredExpenses = expenses;

  if (category) {
    filteredExpenses = filteredExpenses.filter(exp => exp.category === category);
  }

  if (startDate && endDate) {
    filteredExpenses = filteredExpenses.filter(exp => 
      new Date(exp.date) >= new Date(startDate) &&
      new Date(exp.date) <= new Date(endDate)
    );
  }

  res.status(200).json({ status: 'success', data: filteredExpenses, error: null });
}

// Analyze spending
function analyzeSpending(req, res) {
  const spendingByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const highestSpendingCategory = Object.entries(spendingByCategory).reduce(
    (max, curr) => curr[1] > max[1] ? curr : max,
    ['', 0]
  )[0];

  res.status(200).json({
    status: 'success',
    data: { spendingByCategory, highestSpendingCategory },
    error: null
  });
}

module.exports = { addExpense, getExpenses, analyzeSpending };  