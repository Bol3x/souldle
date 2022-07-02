const bcrypt = require('bcrypt');
const Item = require('../database/models/Item.js')
const User = require('../database/models/User.js');
const { validationResult } = require('express-validator');

const register = {
	registerUser : async (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if name exists in users
  //      NEW USER (no results retrieved)
  //        a. Hash password
  //        b. Create user
  //        c. Redirect to login page
  //      EXISTING USER (match retrieved)
  //        a. Redirect user to login page with error message.

  // 3. If INVALID, redirect to register page with errors
  const errors = validationResult(req);

	if (errors.isEmpty()) {
		const { name, password } = req.body;

		// Next items go here...
		// This line can be deleted in the next step.
		// Adding it so that the error validation can be tested.
		var user1 = await User.findOne({ name: name })
		
		if(req.body.name.toLowerCase() == "kami" || 
		   req.body.name.toLowerCase() == "kamo") {
		
			req.flash('error_msg', 'Sorry, there can only be 1 God in this world ;)');
			res.redirect('/Register');	
		}
		
		else if (user1 != null) {
				// found a match, return to login with error
				req.flash('error_msg', 'User already exists. Please login.');
				res.redirect('/login');
		} 
		
		else {
			// no match, create user (next step)
			// for now we redirect to the login with no error.
			const saltRounds = 10;

			// Hash password
			bcrypt.hash(password, saltRounds, async (err, hashed) => {
				const newUser = {
				name: name,
				password: hashed
				};
					try{
						var user = new User(newUser);
						var sword = await Item.findOne({item_name: "Sword"});
						user.avatar.weapon = sword;
						user.item_collection.weapons.push(sword._id);
						user.save();

						req.flash('success_msg', 'You are now registered! Login below.');
						res.redirect('/login');
					}catch(err){
						console.log(err);
						req.flash('error_msg', 'Could not create user. Please try again.');
						res.redirect('/register');
						// res.status(500).send({ message: "Could not create user"});
					}
				});
			}
	}	
	
	else {
	  const messages = errors.array().map((item) => item.msg);

	  req.flash('error_msg', messages.join(' '));
	  res.redirect('/register');
	}
}, 

loginUser : (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if name exists in users
  //      EXISTING USER (match retrieved)
  //        a. Check if password matches hashed password in database
  //        b. If MATCH, save info to session and redirect to home
  //        c. If NOT equal, redirect to login page with error
  //      UNREGISTERED USER (no results retrieved)
  //        a. Redirect to login page with error message

  // 3. If INVALID, redirect to login page with errors
  const errors = validationResult(req);

	if (errors.isEmpty()) {
	  const {
		name,
		password
	  } = req.body;

	  // Next items go here... Same as before, this will be replaced.
	  User.findOne({ name: name }, (err, user) => {
	  if (err) {
		// Database error occurred...
		req.flash('error_msg', 'An error occurred! Please try again.');
		res.redirect('/login');
	  } else {
		// Successful query
		if (user) {
		  // User found!

		  // next block of code goes here
		  // Check password with hashed value in the database
			bcrypt.compare(password, user.password, (err, result) => {
			  // passwords match (result == true)
			  if (result) {
				// Update session object once matched!
				req.session.user = user._id;
				req.session.name = user.name;

				console.log(req.session);

				res.redirect('/home');
			  } else {
				// passwords don't match
				req.flash('error_msg', 'Incorrect password. Please try again.');
				res.redirect('/login');
			  }
			});
		} else {
		  // No user found
		  req.flash('error_msg', 'No registered user with that name. Please register.');
		  res.redirect('/register');
		}
	  }
	});
	} else {
	  const messages = errors.array().map((item) => item.msg);

	  req.flash('error_msg', messages.join(' '));
	  res.redirect('/login');
	}
},

logoutUser : (req, res) => {
  if (req.session) {
	req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
} };

module.exports = register;




