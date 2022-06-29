const User = require('../database/models/User.js');
const Item = require('../database/models/Item.js');

const customize = {
    getCustomize: async function (req, res){
		//TODO: Session Handling
		if(req.session.name != null) {
			const user = await User.findOne({name: req.session.name}, 'avatar item_collection')
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
		}

		else
			res.render('index');
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
		const user = await User.findOne({name: req.session.name});

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
	}
}

module.exports = customize;