const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/souldletestdb")

const Item = require('./models/Item')
const User = require('./models/User')

async function run(){
    try{
    //create item (hat or weapon)
        // const item = await Item.create({
        //     item_name: "Crown", 
        //     equip_slot: "head", 
        //     item_type: "hat", 
        //     img_link: "Assets/Hats/crown.svg"})
        // await item.save()
        // console.log(item)
        

    //create user
    let username = "Buranku"
        const usergen = await User.create({
            name: username,
            password: "123",
        })
        console.log(usergen)
    // query command to obtain 1 user
        let weapon = await Item.findOne({item_name: "Katana"})
        console.log(weapon)
    // generate avatar of user with ObjectId of crown and sword
        usergen.avatar.weapon = weapon;
        // save user
        console.log(usergen)
        await usergen.save()

        // let user = await User.where("name").equals("Bolex")
        // .populate({path: "avatar.hat"}).populate({path: "avatar.weapon"})
        // .limit(1)

        console.log(user)


    } catch (e) {
        console.log(e.message)
    }
}
run()