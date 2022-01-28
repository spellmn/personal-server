const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TourcardSchema = new Schema({
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

	dealershipIdx: { type: Number },
	dealerName: { type: String },
	time: { type: String },
	distance: { type: String },
	year: { type: String },
	stamped: { type: String },
	whenVisited: { type: String },
	association: { type: String },
})

const myDB = mongoose.connection.useDb('harley')

module.exports = myDB.model('Tourcard', TourcardSchema, 'tourcard')
