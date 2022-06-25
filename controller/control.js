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
	},

	getCustomize: async function (req, res){
		//TODO: Session Handling
		const user = await User.findOne({name: "Buranku"}, 'avatar item_collection')
		.populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'})
		.populate({path: 'item_collection.weapons'}).populate({path: 'item_collection.hats'});
		//console.log(user);
		avatar = user.avatar;

		//query user's weapon collection (item_collection.weapons)
		const weapons = user.item_collection.weapons;
		//console.log(weapons);

		//query user's headgear collection (item_collection.hats)
		const heads = await user.item_collection.hats;
		//console.log(heads);

		res.render('customize', {avatar , weapons, heads});
	},

	postCustomizeSave: async function(req,res){
		//console.log(req.body.weapon + "  " + req.body.head);
		//item queries
		//weapon
		const newWeapon = await Item.findOne({item_name: req.body.weapon});
		//console.log(newWeapon);

		//head
		const newHead = await Item.findOne({item_name : req.body.head});
		//console.log(newHead);

		//user update
		const user = await User.findOne({name: 'Buranku'});

		user.avatar = {weapon: newWeapon, hat: newHead};
		//console.log(user);
		await user.save((err, result) =>{
			if (err)
					console.log(err);
			else{
				console.log(result);
				res.sendStatus(200).end();
			}
		});
	},

	getStore: async function(req,res){
		//TODO: Session Handling
		const user = await User.findOne({name: 'Buranku'}, 'souls item_collection')
		.populate({path: 'item_collection.weapons'}).populate({path: 'item_collection.hats'});
		souls = user.souls;
		
		//user weapons
		userWeapons = user.item_collection.weapons;
		//user hats
		userHats = user.item_collection.hats;


		//get list of items not in user's collection
		const serverWeapons = await Item.find({equip_slot: 'weapon'});
		weapons = serverWeapons.filter(({item_name: name1}) => !userWeapons.some(({item_name: name2}) => name2 === name1));
		const serverHeads = await Item.find({equip_slot: "head"});
		heads = serverHeads.filter(({item_name: name1}) => !userHats.some(({item_name: name2}) => name2 === name1));

		//console.log(weapons);
		//console.log(heads);

		res.render('store', {souls, weapons, heads});
	},

	postStorePurchase: async function(req, res){
		//TODO: Session Handling
		const user = await User.findOne({name: 'Buranku'}, "souls item_collection");
		//console.log(user);
		const item = await Item.findOne({item_name: req.body.item_name});
		//console.log(item);

		if (user.souls >= item.cost){
			console.log('success');
			user.souls -= item.cost;

			switch(item.equip_slot){
				case 'head': user.item_collection.hats.push(item); break;
				case 'weapon': user.item_collection.weapons.push(item); break;
			}

			await user.save();
			res.status(200).send({message: "Successfully purchased", souls: user.souls});
		}
		else{
			console.log('fail');
			res.sendStatus(403);
		}
	},

	getUserSearch: function(req,res){
		res.render('search_user');
	},

	getCheckUser: async function(req,res){
		const user = await User.findOne(req.query);
		if (user == null)
			res.sendStatus(404);
		else
			res.sendStatus(200);
	},
	

}

module.exports = controller;