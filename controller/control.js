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
		
	}
}

module.exports = controller;