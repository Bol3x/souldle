const User = require('../database/models/User.js');
const Item = require('../database/models/Item.js');

const store = {
    getStore: async function(req,res){
		//TODO: Session Handling
		const user = await User.findOne({name: req.session.name}, 'souls item_collection')
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
		const user = await User.findOne({name: req.session.name}, "souls item_collection");
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
	}
}

module.exports = store;