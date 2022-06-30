const User = require('../database/models/User.js');

const modify = {
	getDeleteAccount : async function(req, res) {	
		const account = req.session.name;
		
		const user = await User.findOne({name : account});
		
		User.deleteOne({_id : user._id});
		User.deleteOne({name : user.name});
		User.deleteOne({user});

		console.log(user._id);
		console.log(user.name);
		console.log(user);
		
		res.render('index');
	},
	
	getChangePassword : async function(req, res) {
		const account = req.session.name;
		
		const user = await User.findOne({name : account});
		
		User.updateOne({name : user.name}, { $set: { "password" : req.body.password} } );
		
		res.render('index');
	}
}

module.exports = modify;

