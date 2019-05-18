require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Defining methods for the booksController
module.exports = {
	findAll: function(req, res) {
		if (Object.keys(req.body).indexOf("username")>= 0 && req.body.username['$regex']) {
			req.body.username['$regex'] = new RegExp(req.body.username['$regex'], "i");		
		}
		db.User.find(req.body)
			.then(dbModel => {res.json(dbModel)})
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		const { errors, isValid } = validateRegisterInput(req.body);
		

		//Check Validation
		if (!isValid) {
			return res.status(400).send(errors);
		}

		db.User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				errors.email = "Email already exists";
				return res.status(400).json(errors);
			} else {
				db.User.findOne({ username: req.body.username }).then(user => {
					if (user) {
						errors.username = "Username already taken";
						return res.status(400).json(errors);
					}
				})
				//Create object of new user using info received from front end
				const newUser = {
					username: req.body.username,
					displayname: req.body.displayname,
					email: req.body.email,
					password: req.body.password,
					city: req.body.city,
					stateName: req.body.stateName,
					profilePic: req.body.profilePic,
				};

				bcrypt.genSalt(10, (error, salt) => {
					bcrypt.hash(newUser.password, salt, (error, hash) => {
						if (error) throw error;
						newUser.password = hash;
						db.User.create(newUser)
							.then(user => {
								const token = {
									UserId: user._id,
									token: crypto.randomBytes(16).toString("hex")
								}
								db.Token.create(token)
									.then((token) => {
										const transporter = nodemailer.createTransport({
											service: "Sendgrid",
											 auth: {
												user: keys.secrets.sendgridusername,
												pass: keys.secrets.sendgridpass
											}
										});
										var mailOptions = {
											from: "no-reply@foodbook223.com",
											to: user.email,
											subject: "FoodBook Account Verification",
											text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + token.token + '.\n'
										};
										   transporter.sendMail(mailOptions, error => {
											if (error) { 
												return res.json(error); 
											};
											res.status(200).send("A verification email has been sent to: " + user.email);
										});
									})
									.catch(error => console.log(error));
							})
							.catch(error => console.log("error"));
					});
				});
			}
		});
	},
	login: function(req, res) {
		const { errors, isValid } = validateLoginInput(req.body);

		//Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const email = req.body.email;
		const password = req.body.password;

		//Find User by Email
		db.User.findOne({ email: email })
			.then(user => {
				if (!user) {
					errors.email = "User not found";
					return res.status(404).json(errors);
				}

				//Check password
				bcrypt.compare(password, user.password).then(isMatch => {
					if (!isMatch) { 
						errors.password = "Incorrect Password";
						return res.status(400).json(errors);
					};

					if (!user.isVerified) {
						errors.user = "Account has not been verified";
						return res.status(400).json(errors);
					};

						//Create JWT Payload
						const payload = {
							id: user.id,
							username: user.username,
							displayname: user.displayname,
							profilePic: user.profilePic,
						};

						//Sign Token
						jwt.sign(
							payload,
							keys.secrets.secretOrKey,
							{ expiresIn: 3600 },
							(error, token) => {
								res.json({
									success: true,
									token: "Bearer " + token,
								});
							}
						);
					
				});
			})
			.catch(errpr => res.status(422).json(error));
	},
	findById: function(req, res) {
		db.User.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		db.User.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
};
