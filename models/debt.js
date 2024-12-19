const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const DebtSchema = new Schema({
	_id: { type: ObjectId },
	amount: { type: String },
	date: { type: Date },
	holder: { type: String },
	type: { type: String },
});

const myDB = mongoose.connection.useDb('debt');

module.exports = myDB.model('Debt', DebtSchema, 'debts');
