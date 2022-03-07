const jwt = require('jsonwebtoken');
const gConfig = require('../config/globalConfig');
const jwtSecret = gConfig.jwtSecret;

// Auth middleware - can be used for granular route protection

const auth = (req, res, next) => {
	if (req.url == '/auth') next();
	else {
		let token = req.headers['x-access-token'];
		if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
		try {
			jwt.verify(token, jwtSecret);
			next();
		} catch (err) {
			return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
		}
	}
};

module.exports = auth;
