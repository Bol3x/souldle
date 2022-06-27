const bcrypt = require('bcrypt');
const User = require('../database/models/User.js');
const { validationResult } = require('express-validator');
const Item = require('../database/models/Item.js')

const register = {
	registerUser : async (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
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
		console.log(await Item.findOne({item_name: "Sword"}));
			 
		if (user1 != null) {
				console.log(result);
				// found a match, return to login with error
				req.flash('error_msg', 'User already exists. Please login.');
				res.redirect('/login');
		} 
		
		else {
				// no match, create user (next step)
				// for now we redirect to the login with no error.
				const saltRounds = 10;

				// Hash password
				bcrypt.hash(password, saltRounds, (err, hashed) => {
				  const newUser = {
					name,
					password: hashed
				  };
					
				var user = User.create(newUser, (err, user) => {
					if (err) {
					  req.flash('error_msg', 'Could not create user. Please try again.');
					  res.redirect('/register');
					  // res.status(500).send({ message: "Could not create user"});
					} 
					
					else {
						console.log(user);
						req.flash('success_msg', 'You are now registered! Login below.');
						res.redirect('/login');
					}
				  });
				
				console.log(user);
				user.avatar.weapon = Item.findOne({item_name: "Sword"});
				user.item_collection.weapons.push(weapon._id);
				console.log(user);
				 user.save();
			
				
					
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

  // 2. If VALID, find if email exists in users
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
		req.flash('error_msg', 'Something happened! Please try again.');
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

				res.redirect('/');
			  } else {
				// passwords don't match
				req.flash('error_msg', 'Incorrect password. Please try again.');
				res.redirect('/login');
			  }
			});
		} else {
		  // No user found
		  req.flash('error_msg', 'No registered user with that email. Please register.');
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




