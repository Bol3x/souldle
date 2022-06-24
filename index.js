const express = require("express");
const mongoose = require("mongoose");
const dotenv = require(`dotenv`);
const app = new express();
mongoose.connect("mongodb://localhost/souldletestdb");

//database schemas
const User = require('./database/models/User');
const Item = require('./Database/models/Item');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//view engine to be used is Embedded JavaScript (EJS)
app.set('view engine', 'ejs');
app.set('views', 'view');   //set engine to look for ejs files in view

//path for static file (html, css, asset) serving
app.use(express.static(__dirname + '/view/'));
app.use('/controller', express.static(__dirname + '/controller/'));

//server start
dotenv.config();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
var server = app.listen(port, hostname, () =>{
    console.log("server is running at: " + hostname + ":" + port);
})

/**
 * API CALLS
 */

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/play', async (req,res) => {
    res.render('game');
});

app.get('/home', (req, res) =>{
    res.render('home');
});

app.get('/store', async (req, res) => {
    res.render('store');
});

//pass a name into this GET
app.get('/profile', async (req,res) =>{
    const name = req.query.name;
    const uid = req.query.uid;

    const user = await User.findOne({name, uid}, "avatar statistics").populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'});
    //console.log(user);
    const avatar = user.avatar;
    const stats = user.statistics;
    res.render('profile', {name, avatar, stats});
});

app.get('/customize', async (req, res)=>{
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
})

app.post('/customize/save', async(req,res)=>{
    console.log(req.body.weapon + "  " + req.body.head);
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
    
});

app.get('/shop', async (req,res) => {
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
});

app.post('/shop/purchase', async (req, res) =>{
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
})

app.get('/search', async (req,res) =>{
    res.render('search_user');
});

app.get('/checkuser', async (req,res) =>{
    const user = await User.findOne(req.query);
    if (user == null)
        res.sendStatus(404);
    else
        res.sendStatus(200);
})

app.get('/setting', async(req,res)=>{
    res.render('account_settings');
});