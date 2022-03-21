const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gConfig = require('../config/globalConfig');
const jwtSecret = gConfig.jwtSecret;
const User = require('./../models/user');

const signIn = async (req, res) => {
	try {
		let userData = req.body;
		// Find based on email or username
		let user = await User.findOne({
			$or: [{ username: userData.username }, { email: userData.username }],
		});
		// Compare password with DB hashed password
		if (user) {
			bcrypt.compare(userData.password, user.password, (err0, isMatch) => {
				if (err0) throw err0;
				if (!isMatch) res.status(401).send({ status: 'error', error: 'Invalid credentials' });
				// Generate token
				else {
					let token = jwt.sign({ username: userData.username }, jwtSecret, {
						// Controls token expiration time
						expiresIn: '7d',
					});
					res.send({ status: 'OK', token, user });
				}
			});
		} else res.status(403).send({ status: 'error', error: 'Username is incorrect' });
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

const checkToken = async (req, res) => {
	// Just uses auth middleware to check token
	res.send({ status: 'OK' });
};

module.exports = {
	signIn,
	checkToken,
};
