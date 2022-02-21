const Dealership = require('../models/dealerships');
const Tourcard = require('../models/tourcard');
const Hardrock = require('../models/hardrock');
const Slush = require('../models/slush');
const { ObjectId } = require('mongodb');

const getDealerships = async (req, res, next) => {
	if (typeof req.query.id != 'undefined') {
		let dealership = await Dealership.find({ _id: req.query.id }).sort({
			name: 1,
		});
		res.send(dealership);
	} else {
		let dealership = await Dealership.find({}).sort({ name: 1 });
		res.send(dealership);
	}
	//    let dealership = await Dealership.find().sort( { "name": 1 } );
	//    res.send(dealership);
};

const deleteDealership = async (req, res, next) => {
	if (typeof req.query.id != 'undefined') {
		let dealership = await Dealership.find({ _id: req.query.id }).sort({ name: 1 }).deleteOne();
		if (dealership.ok) {
			res.send({ status: 200, success: true });
		}
		res.send({ status: 400, success: false });
	}
};

const getTourcard = async (req, res, next) => {
	let tourcard = await Tourcard.find({
		year: req.query.year,
		association: req.query.association,
	}).sort({ name: 1 });
	res.send(tourcard);
};

const getHardrock = async (req, res, next) => {
	let hardrock = await Hardrock.find({}).sort({ name: 1 });
	res.send(hardrock);
};

const putHardrock = async (req, res) => {
	try {
		let foundHardrock = await Hardrock.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body, { returnDocument: 'after', returnOriginal: false });
		foundHardrock
			? res.send({
					status: 'OK',
					data: foundHardrock,
			  })
			: res.send({ status: 'NOT FOUND' });
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

const getSlush = async (req, res, next) => {
	let slush = await Slush.find({}).sort({ name: 1 });
	res.send(slush);
};

const postTourcard = async (req, res) => {
	if (req.body.name) {
		let newTourcard = await Tourcard.create(req.body);
		res.send({ status: 200, success: true, tourcard: newTourcard });
	} else res.send({ status: 400, success: false });
};

const putTourcard = async (req, res) => {
	try {
		let foundTourcard = await Tourcard.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body, { returnDocument: 'after', returnOriginal: false });
		foundTourcard
			? res.send({
					status: 'OK',
					data: foundTourcard,
			  })
			: res.send({ status: 'NOT FOUND' });
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

module.exports = {
	deleteDealership,
	getDealerships,
	getTourcard,
	getHardrock,
	getSlush,
	postTourcard,
	putTourcard,
	putHardrock,
};
