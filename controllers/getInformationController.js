const Dealership = require('../models/dealerships');
const Tourcard = require('../models/tourcard');
const Hardrock = require('../models/hardrock');
const Slush = require('../models/slush');
const xml2js = require('xml2js');
const https = require('https');
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

const getTourcard = async (req, res, next) => {
	let tourcard = await Tourcard.find({
		year: req.query.year,
		association: req.query.association,
	}).sort({ name: 1 });
	// TODO - remove and create sepparate request
	importDealerships();
	res.send(tourcard);
};

importDealerships = () => {
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
				xml2js.parseString(body, (err, result) => {
					if (err) throw err;
					const json = JSON.stringify(result, null, 4);
					// Object structure
					console.log(JSON.parse(json).dealerResponse.dealers[0]);
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
};
