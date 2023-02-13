const Dealership = require('../models/dealerships');
const Tourcard = require('../models/tourcard');
const Hardrock = require('../models/hardrock');
const { ObjectId } = require('mongodb');

const setDealerships = async (req, res, next) => {
	console.log('Set Dealership');
	const dealership = new Dealership(req.body);
	const data = await dealership.save();
	res.send({ status: 200, success: true, body: data });
};

const editDealership = async (req, res) => {
	try {
		let foundDealership = await Dealership.findOneAndUpdate(
			{ _id: ObjectId(req.params.id) },
			req.body,
			{ returnDocument: 'after', returnOriginal: false }
		);
		foundDealership
			? res.send({
					status: 'OK',
					data: foundDealership,
			  })
			: res.send({ status: 'NOT FOUND' });
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

const deleteDealership = async (req, res) => {
	try {
		await Dealership.deleteOne({ _id: ObjectId(req.params.id) });
		res.send({ status: 200, success: true });
	} catch (err) {
		res.send({ status: 400, success: false });
	}
};

const putHardrock = async (req, res) => {
	try {
		let foundHardrock = await Hardrock.findOneAndUpdate(
			{ _id: ObjectId(req.params.id) },
			req.body,
			{ returnDocument: 'after', returnOriginal: false }
		);
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

const postTourcard = async (req, res) => {
	try {
		// Check for null values before fetching from Mongo
		if (!req.body.name || !req.body.id || !req.body.year) {
			res.status(400).send({ msg: 'Error: Something went wrong' });
			return;
		}
		let foundTourcard = await Tourcard.findOne({
			id: req.body.id,
			year: req.body.year,
		});
		// Check for duplicate tourcard
		if (foundTourcard)
			res
				.status(409)
				.send({ msg: 'Error: Tourcard already exists for the given year' });
		else {
			let newTourcard = await Tourcard.create(req.body);
			res.status(200).send({ tourcard: newTourcard });
		}
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

const putTourcard = async (req, res) => {
	try {
		let foundTourcard = await Tourcard.findOneAndUpdate(
			{ _id: ObjectId(req.params.id) },
			req.body,
			{ returnDocument: 'after', returnOriginal: false }
		);
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

const deleteTourcard = async (req, res) => {
	try {
		await Tourcard.deleteOne({ _id: ObjectId(req.params.id) });
		res.send({ status: 200, success: true });
	} catch (err) {
		res.send({ status: 400, success: false });
	}
};

module.exports = {
	setDealerships,
	editDealership,
	deleteDealership,
	postTourcard,
	putTourcard,
	deleteTourcard,
	putHardrock,
};
