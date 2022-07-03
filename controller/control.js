const User = require('../database/models/User.js');
const Item = require('../database/models/Item.js');
const auth = require('../controller/check-authentication.js');

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

	getRegister : function(req,res){
		res.render('Register');
	},
	
	getAccountSettings : function(req, res){
		res.render('account_settings');
	},

	get404: function(req,res){
		res.render('404');
	}
}

module.exports = controller;