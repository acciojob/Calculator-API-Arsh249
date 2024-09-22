// Add the Calculator APIs

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/main.html'));
});

//your code here
const validateNumbers = (num1, num2) => {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return { status: 'error', message: 'Invalid data types' };
  }
  if (num1 < -1000000 || num2 < -1000000) {
      return { status: 'error', message: 'Underflow' };
  }
  if (num1 > 1000000 || num2 > 1000000) {
      return { status: 'error', message: 'Overflow' };
  }
  return null;
};

// POST: Addition
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.json(validationError);

  const sum = num1 + num2;
  if (sum < -1000000) return res.json({ status: 'error', message: 'Underflow' });
  if (sum > 1000000) return res.json({ status: 'error', message: 'Overflow' });

  res.json({
      status: 'success',
      message: 'the sum of given two numbers',
      sum: sum,
  });
});

// POST: Subtraction
app.post('/sub', (req, res) => {
  const { num1, num2 } = req.body;
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.json(validationError);

  const difference = num1 - num2;
  if (difference < -1000000) return res.json({ status: 'error', message: 'Underflow' });
  if (difference > 1000000) return res.json({ status: 'error', message: 'Overflow' });

  res.json({
      status: 'success',
      message: 'the difference of given two numbers',
      difference: difference,
  });
});

// POST: Multiplication
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.json(validationError);

  const product = num1 * num2;
  if (product < -1000000) return res.json({ status: 'error', message: 'Underflow' });
  if (product > 1000000) return res.json({ status: 'error', message: 'Overflow' });

  res.json({
      status: 'success',
      message: 'The product of given numbers',
      result: product,
  });
});

// POST: Division
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.json(validationError);

  if (num2 === 0) {
      return res.json({
          status: 'error',
          message: 'Cannot divide by zero',
      });
  }

  const result = num1 / num2;
  if (result < -1000000) return res.json({ status: 'error', message: 'Underflow' });
  if (result > 1000000) return res.json({ status: 'error', message: 'Overflow' });

  res.json({
      status: 'success',
      message: 'The division of given numbers',
      result: result,
  });
});



module.exports = app;
