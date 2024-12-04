const Joi = require('joi');

const categories = ['Food', 'Travel', 'Shopping', 'Utilities'];

function validateExpense(req, res, next) {
  const schema = Joi.object({
    category: Joi.string().valid(...categories).required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ status: 'error', error: error.details[0].message });
  }

  next();
}

module.exports = { validateExpense };
