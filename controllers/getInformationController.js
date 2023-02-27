const Dealership = require('../models/dealerships');
const Tourcard = require('../models/tourcard');
const Hardrock = require('../models/hardrock');
const Slush = require('../models/slush');
const xml2js = require('xml2js');
const https = require('https');

const getDealerships = async (req, res, next) => {
	try {
		if (typeof req.query.id != 'undefined') {
			let dealership = await Dealership.find({ _id: req.query.id }).sort({
				name: 1,
			});
			res.status(200).send(dealership);
		} else {
			let dealership = await Dealership.find({}).sort({ name: 1 });
			res.status(200).send(dealership);
		}
	} catch (err) {
		res.status(500).send({ success: false, error: err });
	}
};

const getTourcard = async (req, res, next) => {
	try {
		let tourcard = await Tourcard.find({
			year: req.query.year,
			association: req.query.association,
		}).sort({ name: 1 });
		res.status(200).send(tourcard);
	} catch (err) {
		res.status(500).send({ success: false, error: err });
	}
};

const importDealerships = async (requ, resp, next) => {
	let options = {
		host: 'www.harley-davidson.com',
		path: '/dealerservices/services/rest/dealers/search',
		method: 'GET',
	};
	let req = https.get(options, function (res) {
		var bodyChunks = [];
		res
			.on('data', function (chunk) {
				bodyChunks.push(chunk);
			})
			.on('end', function () {
				var body = Buffer.concat(bodyChunks);
				xml2js.parseString(body, async (err, result) => {
					let dealers;
					// Not a valid XML
					if (err) dealers = JSON.parse(body)?.dealerResponse?.dealers;
					// XML
					else dealers = result?.dealerResponse?.dealers;
					console.log('Mapping imported dealerships');
					let mappedDealerships = [];
					dealers?.forEach((d) => {
						mappedDealerships.push({
							id: Array.isArray(d.id) ? d.id[0] : d.id || '',
							name: Array.isArray(d.name) ? d.name[0] : d.name || '',
							address: Array.isArray(d.contact)
								? d.contact[0]?.address1?.toString()
								: d.contact.address1 || '',
							city: Array.isArray(d.contact)
								? d.contact[0]?.city?.toString()
								: d.contact.city || '',
							state: Array.isArray(d.contact)
								? d.contact[0].state?.toString()
								: d.contact.state || '',
							zip: Array.isArray(d.contact)
								? d.contact[0]?.postalCode?.toString()
								: d.contact.postalCode || '',
							country: Array.isArray(d.contact)
								? d.contact[0]?.country?.toString()
								: d.contact.country || '',
							phone: Array.isArray(d.contact)
								? d.contact[0]?.phoneNumber?.toString()
								: d.contact.phoneNumber || '',
							website: Array.isArray(d.website)
								? d.website[0]
								: d.website || '',
							coords: Array.isArray(d.contact)
								? `${d.contact[0]?.latitude?.toString()},${d.contact[0]?.longitude?.toString()}`
								: `${d.contact.latitude},${d.contact.longitude}` || '',
							mon: Array.isArray(d.hours)
								? d.hours[0]?.dealerHours
										?.toString()
										.split('<br/>')[1]
										.split(': ')[1]
								: d.hours?.dealerHours?.split('<br/>')[1].split(': ')[1] || '',
							sat: Array.isArray(d.hours)
								? d.hours[0]?.dealerHours
										?.toString()
										.split('<br/>')[6]
										.split(': ')[1]
								: d.hours?.dealerHours?.split('<br/>')[6].split(': ')[1] || '',
							sun: Array.isArray(d.hours)
								? d.hours[0]?.dealerHours
										?.toString()
										.split('<br/>')[0]
										.split(': ')[1]
								: d.hours?.dealerHours?.split('<br/>')[0].split(': ')[1] || '',
							chip: '0',
							visited: '0',
						});
					});
					try {
						if (mappedDealerships.length > 0) {
							// Clear collection
							await Dealership.deleteMany({});
							// Insert mapped dealerships
							await Dealership.insertMany(mappedDealerships);
							console.log('Finished importing dealerships');
							resp.send(mappedDealerships);
						} else throw new Error('No dealers found');
					} catch (err) {
						console.log('Error: ' + err.message);
						resp.status(500).send({ status: 'error', error: err.message });
					}
				});
			});
	});
	req.on('error', function (err) {
		console.log('Error: ' + err.message);
		resp.status(500).send({ status: 'error', error: err.message });
	});
};

const getHardrock = async (req, res, next) => {
	try {
		let hardrock = await Hardrock.find({}).sort({ name: 1 });
		res.status(200).send(hardrock);
	} catch (err) {
		res.status(500).send({ success: false, error: err });
	}
};

const getSlush = async (req, res, next) => {
	try {
		let slush = await Slush.find({}).sort({ name: 1 });
		res.status(200).send(slush);
	} catch (err) {
		res.status(500).send({ success: false, error: err });
	}
};

module.exports = {
	getDealerships,
	getTourcard,
	getHardrock,
	getSlush,
	importDealerships,
};
