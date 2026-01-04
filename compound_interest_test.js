// TODO: Use a proper testing framework like Jest. This is super hacky.

const assert = require('assert');
const { calculateCompoundInterest } = require('./calculator.js');

// Any difference smaller than $1 is a rounding error
function approxEqual(a, b, eps = 1) {
	return Math.abs(a - b) <= eps;
}

// Test 1: zero years -> should return initial investment unchanged
let v = calculateCompoundInterest(1000, 0, 0.05, 0);
assert.ok(approxEqual(v, 1000), `Expected 1000, got ${v}`);

// Test 2: only initial investment, annual compounding
v = calculateCompoundInterest(1000, 0, 0.08, 1); // one year at 8%
const expected2 = 1083
assert.ok(approxEqual(v, expected2), `Expected ${expected2}, got ${v}`);

// Test 3: monthly contributions only (no initial), monthly-rate formula
const expected3 = 1244.99
v = calculateCompoundInterest(0, 100, 0.08, 1);
assert.ok(approxEqual(v, expected3), `Expected ${expected3}, got ${v}`);

// Test 4: negative returns with both initial and monthly contributions
v = calculateCompoundInterest(1000, 50, -0.06, 1);
const expected4 = 1525.39
assert.ok(approxEqual(v, expected4), `Expected ${expected4}, got ${v}`);

// Test 5: Large principal, 30-year growth
const expected5 = 2843270.49
v = calculateCompoundInterest(200000, 1000, 0.07, 30);
assert.ok(approxEqual(v, expected5), `Expected ${expected5}, got ${v}`);


console.log('All calculateCompoundInterest tests passed.');
