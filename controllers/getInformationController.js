const Dealership = require('../models/dealerships');
const Tourcard = require('../models/tourcard');
const Hardrock = require('../models/hardrock');
const Slush = require('../models/slush');
const xml2js = require('xml2js');
const https = require('https');

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

const getTourcard = async (req, res, next) => {
	let tourcard = await Tourcard.find({
		year: req.query.year,
		association: req.query.association,
	}).sort({ name: 1 });
	res.send(tourcard);
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
					if (err) {
						// Not a valid XML
						dealers = JSON.parse(body).dealerResponse.dealers;
					} else {
						// JSON
						const json = JSON.stringify(result, null, 4);
						dealers = JSON.parse(json).dealerResponse.dealers;
					}
					console.log('Mapping imported dealerships');
					let mappedDealerships = [];
					dealers.forEach((d) => {
						mappedDealerships.push({
							id: d.id || '',
							name: d.name || '',
							address: d.contact.address1 || '',
							city: d.contact.city || '',
							state: d.contact.state || '',
							zip: d.contact.postalCode || '',
							country: d.contact.country || '',
							phone: d.contact.phoneNumber || '',
							website: d.website || '',
							coords: `${d.contact.latitude},${d.contact.longitude}` || '',
							mon: d.hours?.dealerHours?.split('<br/>')[1].split(': ')[1] || '',
							sat: d.hours?.dealerHours?.split('<br/>')[6].split(': ')[1] || '',
							sun: d.hours?.dealerHours?.split('<br/>')[0].split(': ')[1] || '',
							chip: '0',
							visited: '0',
						});
					});
					try {
						// Clear collection
						await Dealership.deleteMany({});
						// Insert mapped dealerships
						await Dealership.insertMany(mappedDealerships);
						console.log('Finished importing dealerships');
						resp.send(mappedDealerships);
					} catch (err) {
						console.log('Mongo Insert Error: ' + err.message);
					}
				});
			});
	});
	req.on('error', function (e) {
		console.log('Import Error: ' + e.message);
	});
};

const getHardrock = async (req, res, next) => {
	let hardrock = await Hardrock.find({}).sort({ name: 1 });
	res.send(hardrock);
};

const getSlush = async (req, res, next) => {
	let slush = await Slush.find({}).sort({ name: 1 });
	res.send(slush);
};

module.exports = {
	getDealerships,
	getTourcard,
	getHardrock,
	getSlush,
	importDealerships,
};
