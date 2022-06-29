const User = require('../database/models/User.js');
const Item = require('../database/models/Item.js');

const controller = {
	getIndex: function(req,res){
		if(req.session.name != null)
			res.render('home');
		else
			res.render('index');
	},

	getPlay: function (req,res){
		res.render('game');
	},
	
	getHome: function (req,res){
		if(req.session.name != null)
			res.render('home');
		else
			res.render('index');
	},
	
	getLogin : function(req, res){
		res.render('login');
	},
	
	getAccountSettings : function(req, res){
		if(req.session.name != null)
			res.render('account_settings');
		else
			res.render('index');
		
	},
			
	getProfile: async function(req,res){
		if(req.session.name != null) {
			const name = req.session.name;
			const uid = req.session.user;
		
			const user = await User.findOne({name, uid}, "avatar statistics").populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'});
			//console.log(user);
			const avatar = user.avatar;
			const stats = user.statistics;
			res.render('profile', {name, avatar, stats});
		}
		else
			res.render('index');
	}
}

module.exports = controller;