// initialInvest: int, initial amount invested (e.g., $1000)
// monthlyInvest: int, amount added at the end of each month (e.g. $100)
// annualReturn: float, expected annual return percentage (e.g., 0.05 for 5%)
// years: int, number of years to simulate
// Compounding happens monthly before monthly investment.
function calculateCompoundInterest(initialInvest, monthlyInvest, annualReturn, years) {
    let currentValue = initialInvest;
    const monthlyRate = annualReturn / 12;

    for (let i = 0; i < years * 12; i++) {
        currentValue *= (1 + monthlyRate);
        currentValue += monthlyInvest;
    }

    return currentValue;
}


const calculateMonthlyMortgagePayment = (p, r, y) => {
    const mR = r / 100 / 12;
    const n = y * 12;
    if (mR === 0) return p / n;
    return (p * mR * Math.pow(1 + mR, n)) / (Math.pow(1 + mR, n) - 1);
};

/**
 * Calculates the net worth of a property owner at a specific year.
 * @param {number} purchasePrice - The original price of the home.
 * @param {number} downPayment - The initial cash paid upfront.
 * @param {number} annualAppreciation - Expected yearly increase in home value (e.g., 3 for 3%).
 * @param {number} mortgageRate - The annual interest rate on the loan (e.g., 6 for 6%).
 * @param {number} termYears - The total length of the mortgage (usually 30).
 * @param {number} currentYear - The year at which we are calculating net worth.
 */
function calculatePropertyNetWorth(purchasePrice, downPayment, annualAppreciation, mortgageRate, termYears, currentYear) {
    console.log("Calculating property net worth");
    console.log({purchasePrice, downPayment, annualAppreciation, mortgageRate, termYears, currentYear});

    // 1. Calculate Future Home Value (Appreciation)
    // Formula: Price * (1 + r)^t
    const currentHomeValue = purchasePrice * Math.pow(1 + (annualAppreciation / 100), currentYear);

    // 2. Calculate Remaining Mortgage Balance
    const principal = purchasePrice - downPayment;
    const monthlyRate = (mortgageRate / 100) / 12;
    const totalMonths = termYears * 12;
    const monthsPassed = currentYear * 12;

    let remainingBalance = 0;
    if (currentYear >= termYears) {
        remainingBalance = 0; // Mortgage is paid off
    } else {
        // Standard Amortization Formula for Remaining Balance:
        // B = P * [(1 + r)^n - (1 + r)^p] / [(1 + r)^n - 1]
        const compoundTotal = Math.pow(1 + monthlyRate, totalMonths);
        const compoundPassed = Math.pow(1 + monthlyRate, monthsPassed);
        
        remainingBalance = principal * (compoundTotal - compoundPassed) / (compoundTotal - 1);
    }

    // 3. Net Worth = Asset Value - Liabilities
    const equity = currentHomeValue - remainingBalance;

    return equity;
}

// Export for Node (so tests can require this file)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateCompoundInterest, calculateMonthlyMortgagePayment, calculatePropertyNetWorth};
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.calculateCompoundInterest = calculateCompoundInterest;
    window.calculatePropertyNetWorth = calculatePropertyNetWorth;
}