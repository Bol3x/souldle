const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/souldletestdb")

const Item = require('./models/Item')

async function run(){
	try{
	//create item (hat or weapon)
		const crown = await Item.create({
			item_name: "Crown", 
			equip_slot: "head", 
			item_type: "hat", 
			file_name: "crown.svg",
			cost: 5
		});
		await crown.save()
		console.log('created ' + crown);

		const sword = await Item.create({
			item_name: "Sword", 
			equip_slot: "weapon", 
			item_type: "shorthandle", 
			file_name: "sword.svg",
			cost: 1
		});
		await sword.save()
		console.log('created ' + sword);

		const katana = await Item.create({
			item_name: "Katana", 
			equip_slot: "weapon", 
			item_type: "shorthandle", 
			file_name: "katana.svg",
			cost: 5
		});
		await katana.save()
		console.log('created ' + katana);

		const axe = await Item.create({
			item_name: "Axe", 
			equip_slot: "weapon", 
			item_type: "longhandle", 
			file_name: "axe.svg",
			cost: 2
		});
		await axe.save()
		console.log('created ' + axe);

		const scythe = await Item.create({
			item_name: "Scythe", 
			equip_slot: "weapon", 
			item_type: "longhandle", 
			file_name: "scythe.svg",
			cost: 5
		});
		await scythe.save()
		console.log('created ' + scythe);

		const hammer = await Item.create({
			item_name: "Hammer", 
			equip_slot: "weapon", 
			item_type: "longhandle", 
			file_name: "hammer.svg",
			cost: 3
		});
		await hammer.save()
		console.log('created ' + hammer);

		const darkhelm = await Item.create({
			item_name: "Dark Helmet", 
			equip_slot: "head", 
			item_type: "helmet", 
			file_name: "DarkHelm.svg",
			cost: 5
		});
		await darkhelm.save()
		console.log('created ' + darkhelm);

		const lighthelm = await Item.create({
			item_name: "Light Helmet", 
			equip_slot: "head", 
			item_type: "helmet", 
			file_name: "LightHelm.svg",
			cost: 5
		});
		await lighthelm.save()
		console.log('created ' + lighthelm);

		const viking = await Item.create({
			item_name: "Viking Hat", 
			equip_slot: "head", 
			item_type: "hat", 
			file_name: "Viking.svg",
			cost: 3
		});
		await viking.save()
		console.log('created ' + viking);

	} catch (e) {
		console.log(e.message)
	}
}
run()