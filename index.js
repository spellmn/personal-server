const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/authMiddleware');

var getInformationController = require('./controllers/getInformationController');
var setInformationController = require('./controllers/setInformationController');
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');
var informationController = require('./controllers/information');

const app = express();

app.use(cors());

// Auth middleware - protects all routes
app.get('*', auth);
app.post('*', auth);
app.put('*', auth);
app.delete('*', auth);

app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: false,
	})
);
app.use(bodyParser.json({ limit: '50mb' }));

app.use(function (req, res, next) {
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

//mongoose.connect('mongodb+srv://roUser:roUserPassword@cluster0.iodve.mongodb.net/default').then(() => {
mongoose
	.connect(
		'mongodb+srv://rwUser:rwUserPassword@cluster0.iwvnu.mongodb.net/default'
	)
	.then(() => {
		console.log('database connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/getDealerships', getInformationController.getDealerships);
app.get('/getTourcard', getInformationController.getTourcard);
app.get('/getHardrock', getInformationController.getHardrock);
app.get('/getSlush', getInformationController.getSlush);
app.get('/getDebt', getInformationController.getDebt);
app.get('/importDealerships', getInformationController.importDealerships);
app.post('/setDealerships', setInformationController.setDealerships);
app.put('/editDealership/:id', setInformationController.editDealership);
app.delete('/deleteDealership/:id', setInformationController.deleteDealership);
app.post('/postTourcard', setInformationController.postTourcard);
app.put('/putTourcard/:id', setInformationController.putTourcard);
app.delete('/deleteTourcard/:id', setInformationController.deleteTourcard);
app.put('/putHardrock/:id', setInformationController.putHardrock);

app.get('/users', userController.getUsers);
app.post('/users', userController.postUser);
app.put('/users/:id', userController.putUser);
app.delete('/users/:id', userController.deleteUser);
app.post('/auth', authController.signIn);
app.get('/checkToken', authController.checkToken);

var server = app.listen(process.env.PORT || 8001, function () {
	var port = server.address().port;
	console.log('Express is working on port ' + port);
});
