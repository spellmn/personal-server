const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DebtSchema = new Schema({
	_id: { type: ObjectId, required: false, auto: true },
	amount: { type: String },
	statementDate: { type: Date },
	category: { type: String },
	subCategory: { type: String },
});

const myDB = mongoose.connection.useDb('debt');

module.exports = myDB.model('Debt', DebtSchema, 'debts');
