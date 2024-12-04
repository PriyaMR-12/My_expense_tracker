const express = require('express');
const expenseRoutes = require('./routes/expenses');
const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
  console.log('Generating daily summary...');
  // Logic to summarize daily expenses
});

cron.schedule('0 0 * * 0', () => {
  console.log('Generating weekly summary...');
  // Logic to summarize weekly expenses
});


const app = express();
app.use(express.json()); // Parse incoming JSON

// Register routes
app.use('/expenses', expenseRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
