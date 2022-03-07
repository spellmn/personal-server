const Dealership = require('../models/dealerships');
const Tourcard = require('../models/tourcard');
const Hardrock = require('../models/hardrock');
const { ObjectId } = require('mongodb');

const setDealerships = async (req, res, next) => {
	const dealership = new Dealership(req.body);
	const data = await dealership.save();
	res.send({ status: 200, success: true, body: data });
};

const editDealership = async (req, res, next) => {
	const updatedData = JSON.parse(JSON.stringify(req.body));
	delete updatedData._id;
	const updated = await Dealership.update({ _id: req.body._id }, updatedData);
	if (updated) {
		res.send({ status: 200, success: true, body: req.body });
	} else {
		res.send({ status: 400, success: false });
	}
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
	setDealerships,
	editDealership,
	deleteDealership,
	postTourcard,
	putTourcard,
	putHardrock,
};
