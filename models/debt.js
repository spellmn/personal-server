const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const DebtSchema = new Schema({
	_id: { type: ObjectId },
	amount: { type: Number },
	date: { type: Date },
	holder: { type: String },
	type: { type: String },
	category: { type: String },
	subCategory: { type: String },
	interestRate: { type: Number },
	minimumPayment: { type: Number },
	remainingBalance: { type: Number },
	totalPaid: { type: Number },
});

const myDB = mongoose.connection.useDb('debt');

module.exports = myDB.model('Debt', DebtSchema, 'debts');
