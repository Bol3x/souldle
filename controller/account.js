const User = require('../database/models/User.js');
const bcrypt = require('bcrypt');

const modify = {
	getDeleteAccount : async function(req, res) {
		var myquery = {name : req.session.name};
		
		var pass = req.body.password;
		
		const user = await User.findOne({name : req.session.name});
		
		bcrypt.compare(pass, user.password, function(err,result){
			if (result) {
				User.deleteOne(user, function(err,res) {
					if (err) 
						throw err;
				
						console.log("values updated");
					});
				
				req.session.destroy(() => {
					res.clearCookie('connect.sid');
					res.redirect('/');
				});
			}
			
			else {
				req.flash('error_msg', 'Incorrect password. Please try again.');
				res.redirect('/settings');
			}
		});
	},
	
	getChangePassword : async function(req, res) {
		var myquery = {name : req.session.name};
		
		var pass = req.body.password;
		
		var confirmpass = req.body.confirmPass;
		
		const user = await User.findOne({name : req.session.name});
		
		const newpass = await bcrypt.hash(pass, 10);
		
		if(pass == confirmpass) {
			User.updateOne(user, {$set: {password : newpass}}, function(err, result) {
				if (result){
					console.log("values updated");
					
					res.redirect('/home');
				}		
				
				else 
					res.render('account_settings');
			});	
		}
		
		else {
			req.flash('error_msg', 'Passwords must match. Please try again.');
			res.redirect('/settings');
		}
	}
}

module.exports = modify;

