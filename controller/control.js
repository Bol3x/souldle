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
	}
}

module.exports = controller;