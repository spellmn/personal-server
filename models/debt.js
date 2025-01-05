const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const DebtSchema = new Schema({
	_id: { type: ObjectId, required: false, auto: true },
	amount: { type: Number },
	date: { type: String },
	holder: { type: String },
	type: { type: String },
	category: { type: String },
	subCategory: { type: String },
	description: { type: String },
	interestRate: { type: Number },
	minimumPayment: { type: Number },
	remainingBalance: { type: Number },
	totalPaid: {
		type: Number,
		get: (v) => parseFloat(v?.toFixed(2)), // Ensure precision when retrieving
		set: (v) => parseFloat(v.toFixed(2)), // Ensure precision when setting
	},
});

const myDB = mongoose.connection.useDb('debt');

module.exports = myDB.model('Debt', DebtSchema, 'debts');
