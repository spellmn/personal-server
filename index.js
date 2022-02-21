const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { connectionString } = require('./config/db.js');

var getInformationController = require('./controllers/getInformationController');
var setInformationController = require('./controllers/setInformationController');
var informationController = require('./controllers/information');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: '50mb',
	})
);

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization,Origin,X-Requested-With,Content-Type');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

//mongoose.connect('mongodb+srv://roUser:roUserPassword@cluster0.iodve.mongodb.net/default').then(() => {
mongoose
	.set('useFindAndModify', false)
	.connect('mongodb+srv://rwUser:rwUserPassword@cluster0.iwvnu.mongodb.net/default', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('database connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/getDealerships', getInformationController.getDealerships);
app.get('/deleteDealership', getInformationController.deleteDealership);
app.post('/setDealerships', setInformationController.setDealerships);
app.post('/editDealership', setInformationController.editDealership);
app.get('/getTourcard', getInformationController.getTourcard);
app.get('/getHardrock', getInformationController.getHardrock);
app.get('/getSlush', getInformationController.getSlush);

app.post('/postTourcard', getInformationController.postTourcard);
app.put('/putTourcard/:id', getInformationController.putTourcard);
app.put('/putHardrock/:id', getInformationController.putHardrock);

var server = app.listen(process.env.PORT || 8001, function () {
	var port = server.address().port;
	console.log('Express is working on port ' + port);
});
