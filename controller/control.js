const User = require('../database/models/User.js');
const Item = require('../database/models/Item.js');
const auth = require('../controller/check-authentication.js');
const Answer = require('../database/models/Answer.js');
const controller = {
	getIndex: function(req,res){
		res.render('index');
	},

	getPlay: function (req,res){
		res.render('game');
	},
	
	getHome: async function (req,res){
		const played = await Answer.findOne({from: req.session.name});
		var answer;
		if (played == null)answer = "AVAILABLE";else answer = "UNAVAILABLE";
		const user = await User.findOne({name: req.session.name});
		res.render('home', {answer: answer,souls:user.souls});
	},
	
	getLogin : function(req, res){
		res.render('login');
	},
	
	getAccountSettings : function(req, res){
		res.render('account_settings');
	},

	get404: function(req,res){
		res.render('404');
	}
}

module.exports = controller;
