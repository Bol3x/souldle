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

	getProfile: async function(req,res){
		const name = req.query.name;
		const uid = req.query.uid;
	
		const user = await User.findOne({name, uid}, "avatar statistics").populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'});
		//console.log(user);
		const avatar = user.avatar;
		const stats = user.statistics;
		res.render('profile', {name, avatar, stats});
	}
}

module.exports = controller;