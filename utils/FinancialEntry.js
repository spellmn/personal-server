// Debt calculator code trial
class FinancialEntry {
	amount; // Represents a specific payment or transaction amount
	interestRate; // Annual interest rate (e.g., 20.99)
	minimumPayment; // Minimum payment required for credit cards
	remainingBalance; // Outstanding balance that reduces over time
	totalPaid; // Tracks the total amount paid toward the balance
	interestAccrued; // Tracks interest accrued over time

	constructor(
		amount,
		remainingBalance,
		interestRate,
		minimumPayment,
		totalPaid = 0
	) {
		this.amount = amount; // Transaction amount (e.g., a payment or charge)
		this.remainingBalance = remainingBalance; // Total debt/loan balance
		this.interestRate = interestRate; // Annual interest rate
		this.minimumPayment = minimumPayment; // Minimum payment requirement
		this.totalPaid = totalPaid; // Start with no payments made
		this.interestAccrued = 0; // Start with no interest accrued
	}

	// Calculate Interest Accrued for Credit Cards and Loans
	calculateInterest() {
		// Monthly interest rate (annual interest rate divided by 12)
		const monthlyInterestRate = this.interestRate / 100 / 12;

		// Calculate interest based on remaining balance
		this.interestAccrued = parseFloat(
			(this.remainingBalance * monthlyInterestRate).toFixed(2)
		);
		return this.interestAccrued;
	}

	// Update Remaining Balance after a Payment
	makePayment(paymentAmount) {
		this.totalPaid += paymentAmount;
		// First, calculate the interest on the current remaining balance
		this.calculateInterest();
		// Subtract the payment from the remaining balance
		this.remainingBalance -= paymentAmount;
		// Add the interest to the remaining balance
		this.remainingBalance += this.interestAccrued;
		// Round the remaining balance to two decimal places
		this.remainingBalance = parseFloat(this.remainingBalance.toFixed(2));
	}

	// Calculate Monthly Minimum Payment (for Credit Cards)
	calculateMinimumPayment() {
		const minimumPercentage = 0.02; // Example: 2% of remaining balance
		const minimumFixedAmount = 50; // Example: $50
		this.minimumPayment = Math.max(
			minimumPercentage * this.remainingBalance,
			minimumFixedAmount
		);
		return this.minimumPayment;
	}
}

// Function to create a new financial entry
const createFinancialEntry = (
	amount,
	remainingBalance,
	interestRate,
	minimumPayment,
	totalPaid
) => {
	return new FinancialEntry(
		amount,
		remainingBalance,
		interestRate,
		minimumPayment,
		totalPaid
	);
};

// Function to create a monthly debt and calculate the next month's date based on the provided date
const createMonthlyDebt = (
	entry,
	type,
	category,
	subCategory,
	holder,
	description,
	currentDate
) => {
	return {
		type,
		category,
		subCategory,
		date: currentDate,
		holder,
		description,
		amount: entry.amount,
		remainingBalance: entry.remainingBalance,
		interestRate: entry.interestRate,
		minimumPayment: entry.minimumPayment,
		totalPaid: entry.totalPaid,
	};
};

// Function to create a series of monthly debts
const createMonthlyDebtsForMonths = (numMonths, request) => {
	let currentEntry = createFinancialEntry(
		request.body.amount,
		request.body.remainingBalance,
		request.body.interestRate,
		request.body.minimumPayment,
		request.body.totalPaid
	);

	let currentDate = request.body.date; // Start with the original date from req.body
	let allDebts = [];

	for (let month = 1; month <= numMonths; month++) {
		currentEntry.makePayment(request.body.amount); // Make payment for the current month

		// Calculate the next month's date
		const currentDateObj = new Date(currentDate);
		currentDateObj.setMonth(currentDateObj.getMonth() + 1);
		currentDateObj.setDate(1);
		currentDate = currentDateObj.toISOString().split('T')[0];

		// Create the monthly debt for the current month
		const monthlyDebt = createMonthlyDebt(
			currentEntry,
			request.body.type,
			request.body.category,
			request.body.subCategory,
			request.body.holder,
			request.body.description,
			currentDate
		);

		// Add the debt to the list of all debts
		allDebts.push(monthlyDebt);
	}

	return allDebts;
};

module.exports = {
	FinancialEntry,
	createFinancialEntry,
	createMonthlyDebt,
	createMonthlyDebtsForMonths,
};
