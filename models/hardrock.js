const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HardrockSchema = new Schema({
	id: { type: Number },
	name: { type: String },
	address: { type: String },
	city: { type: String },
	state: { type: String },
	zip: { type: String },
	website: { type: String },
	phone: { type: String },
	time: { type: String },
	distance: { type: String },
	sat: { type: String },
	sun: { type: String },
	coords: { type: String },

	visited: { type: Number },
	whenVisited: { type: String },
	opened: { type: String },
	closed: { type: String },
});

const myDB = mongoose.connection.useDb('hardrock');

module.exports = myDB.model('Locations', HardrockSchema, 'locations');
