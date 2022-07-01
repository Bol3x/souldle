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
				res.render('account_settings');
			}
		});
	},
	
	getChangePassword : async function(req, res) {
		var myquery = {name : req.session.name};
		
		var pass = req.body.password;
		
		const user = await User.findOne({name : req.session.name});
		
		const newpass = await bcrypt.hash(pass, 10);
		
		User.updateOne(user, {$set: {password : newpass}}, function(err, result) {
			if (result){
				console.log("values updated");
			
				req.session.destroy(() => {
					res.clearCookie('connect.sid');
					res.redirect('/');
				});
			}		
			
			else 
				res.render('account_settings');
		});		
	}
}

module.exports = modify;

