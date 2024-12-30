// Debt calculator code trial
class FinancialEntry {
	amount; // Represents a specific payment or transaction amount
	interestRate; // Annual interest rate (e.g., 20.99)
	minimumPayment; // Minimum payment required for credit cards
	remainingBalance; // Outstanding balance that reduces over time
	totalPaid; // Tracks the total amount paid toward the balance
	interestAccrued; // Tracks interest accrued over time

	constructor(amount, remainingBalance, interestRate, minimumPayment) {
		this.amount = amount; // Transaction amount (e.g., a payment or charge)
		this.remainingBalance = remainingBalance; // Total debt/loan balance
		this.interestRate = interestRate; // Annual interest rate
		this.minimumPayment = minimumPayment; // Minimum payment requirement
		this.totalPaid = 0; // Start with no payments made
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

module.exports = { FinancialEntry };
