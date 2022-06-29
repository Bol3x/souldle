const User = require('../database/models/User.js');
const Item = require('../database/models/Item.js');

const controller = {
	getIndex: function(req,res){
		res.render('index');
	},

	getPlay: function (req,res){
		res.render('game');
	},
	
	getHome: function (req,res){
		res.render('home');
	},
	
	getLogin : function(req, res){
		res.render('login');
	},
	
	getAccountSettings : function(req, res){
		res.render('account_settings');
	},
			
	getProfile: async function(req,res){
		const name = req.session.name;
		const uid = req.session.user;
	
		const user = await User.findOne({name, uid}, "avatar statistics").populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'});
		//console.log(user);
		const avatar = user.avatar;
		const stats = user.statistics;
		res.render('profile', {name, avatar, stats});
	}
}

module.exports = controller;