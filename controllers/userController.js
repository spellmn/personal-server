const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
	try {
		let users = await User.find();
		users.forEach((u) => (u.password = ''));
		res.send({ status: 'OK', data: users });
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

const postUser = async (req, res) => {
	try {
		let userData = req.body;
		// Create salt & hash for password
		bcrypt.genSalt(10, (err0, salt) => {
			if (err0) throw err0;
			bcrypt.hash(userData.password, salt, async (err1, hash) => {
				if (err1) throw err1;
				userData.password = hash;
				if (!userData.role) userData.role = 'restricted';
				// Save new user to mongodb
				let user = await User.create(userData);
				user.password = '';
				res.send({ status: 'OK', data: user });
			});
		});
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

const putUser = async (req, res) => {
	try {
		let userData = req.body;
		// Create salt & hash for password
		bcrypt.genSalt(10, (err0, salt) => {
			if (err0) throw err0;
			bcrypt.hash(userData.password, salt, async (err1, hash) => {
				if (err1) throw err1;
				userData.password = hash;
				// Save new user to mongodb
				await User.findOneAndUpdate({ _id: ObjectId(req.params.id) }, userData);
				res.send({
					status: 'OK',
					data: {
						...userData,
						password: '',
						_id: ObjectId(req.params.id),
					},
				});
			});
		});
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

const deleteUser = async (req, res) => {
	try {
		let user = await User.deleteOne({ _id: ObjectId(req.params.id) });
		res.send({ status: 'OK', data: user });
	} catch (err) {
		res.status(500).send({ status: 'error', error: err });
	}
};

module.exports = {
	getUsers,
	postUser,
	putUser,
	deleteUser,
};
