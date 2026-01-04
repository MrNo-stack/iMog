// TODO: Use a proper testing framework like Jest. This is super hacky.

const assert = require('assert');
const { calculateMonthlyMortgagePayment } = require('./calculator.js');

// Test cases for calculateMonthlyMortgagePayment
// p: principal, r: annual interest rate in %, y: years

// Test 1: Zero interest rate - should be principal divided by number of months
assert.strictEqual(calculateMonthlyMortgagePayment(120000, 0, 30), 120000 / (30 * 12));

// Test 2: Basic calculation with interest
// For $100,000 at 5% for 30 years
// Expected monthly payment is approximately $536.82
const payment1 = calculateMonthlyMortgagePayment(100000, 5, 30);
assert(Math.abs(payment1 - 536.82) < 0.01, `Expected ~536.82, got ${payment1}`);

// Test 3: Shorter term, higher rate
// For $200,000 at 7% for 15 years
// Expected monthly payment is approximately $1,797.66
const payment2 = calculateMonthlyMortgagePayment(200000, 7, 15);
assert(Math.abs(payment2 - 1797.66) < 0.01, `Expected ~1797.66, got ${payment2}`);

// Test 4: One year loan
// For $50,000 at 10% for 1 year
const payment3 = calculateMonthlyMortgagePayment(50000, 10, 1);
const expected3 = (50000 * (0.10/12) * Math.pow(1 + 0.10/12, 12)) / (Math.pow(1 + 0.10/12, 12) - 1);
assert(Math.abs(payment3 - expected3) < 0.01, `Expected ${expected3}, got ${payment3}`);

// Test 5: Edge case - very small principal
assert.strictEqual(calculateMonthlyMortgagePayment(0, 5, 30), 0);

// Test 6: High interest rate
// For $10,000 at 20% for 5 years
const payment4 = calculateMonthlyMortgagePayment(10000, 20, 5);
const mR4 = 20 / 100 / 12;
const n4 = 5 * 12;
const expected4 = (10000 * mR4 * Math.pow(1 + mR4, n4)) / (Math.pow(1 + mR4, n4) - 1);
assert(Math.abs(payment4 - expected4) < 0.01, `Expected ${expected4}, got ${payment4}`);

console.log('All mortgage payment tests passed!');
