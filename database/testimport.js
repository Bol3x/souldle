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
        // const usergen = await User.create({
        //     name: "Bolex",
        //     password: "123",
        // })
        // console.log(usergen)
        // await usergen.save()
    
    // let user = await User.where("name").equals("Bolex").limit(1)

    // generate avatar of user with ObjectId of crown and sword
        // user[0].avatar = {
        //     hat: "629ae5202f71b045330e53be",
        //     weapon: "629b15127114b8b6fe682e6e"
        // }
        // save user
            // console.log(user[0])
            // user[0].save()

        let user = await User.where("name").equals("Bolex")
        .populate({path: "avatar.hat"}).populate({path: "avatar.weapon"})
        .limit(1)
            console.log(user[0])


    } catch (e) {
        console.log(e.message)
    }
}
run()