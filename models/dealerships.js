const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealershipSchema = new Schema({
	id: { type: String },
	name: { type: String },
	address: { type: String },
	city: { type: String },
	state: { type: String },
	zip: { type: String },
	country: { type: String },
	website: { type: String },
	phone: { type: String },
	distance: { type: String },
	mon: { type: String },
	sat: { type: String },
	sun: { type: String },
	coords: { type: String },
	chip: { type: String },
	// Anything goes | No type validation
	visited: { type: mongoose.SchemaTypes.Mixed },
});

const myDB = mongoose.connection.useDb('harley');

module.exports = myDB.model('Dealership', DealershipSchema, 'locations');
