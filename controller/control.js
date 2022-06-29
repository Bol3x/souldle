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
	}
}

module.exports = controller;