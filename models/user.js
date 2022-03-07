const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	role: { type: String, enum: ['admin', 'restricted'], required: true },
});

const myDB = mongoose.connection.useDb('harley');

module.exports = myDB.model('User', UserSchema, 'users');
