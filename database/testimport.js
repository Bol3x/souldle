const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/souldletestdb")

const Item = require('./models/Item')
const User = require('./models/User')

async function run(){
    try{
    //create item (hat or weapon)
        // const item = await Item.create({
        //     item_name: "Crown", 
        //     equip_slot: "head", 
        //     item_type: "hat", 
        //     img_link: "/public/asset/Hats/crown.svg"})
        // await item.save()
        // console.log(item)
        

    //create user
    let username = "Bolex";
    
        const usergen = User.create({
            name: username,
            password: "123",
        })
        console.log(usergen)
    // query command to obtain sword
        let weapon = await Item.findOne({item_name: "Sword"})
        console.log(weapon)
    // generate avatar of user with ObjectId of sword
        usergen.avatar.weapon = weapon;
        // default to add sword to user's inventory
        usergen.item_collection.weapons.push(weapon._id);
        // save user
        console.log(usergen);
        await usergen.save()

        // let user = await User.where("name").equals("Bolex")
        // .populate({path: "avatar.hat"}).populate({path: "avatar.weapon"})
        // .limit(1)

    } catch (e) {
        console.log(e.message)
    }
}
run()