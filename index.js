const express = require("express");
const mongoose = require("mongoose");
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

//server start
const port = 3000;
var server = app.listen(3000, () =>{
    console.log("server is running at port " + port);
})

//path for static file (html, css, asset) serving
app.use(express.static(__dirname + '/view/'));

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

app.get('/profile', async (req,res) =>{
    const user = await User.find({name: "Buranku"}).populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'}).limit(1);
    console.log(user[0]);
    const name = user[0].name;
    const avatar = user[0].avatar;
    const stats = user[0].statistics;
    res.render('profile', {name, avatar, stats});
});

app.get('/customize', async (req, res)=>{
    const user = await User.find({name: "Buranku"}, 'avatar').populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'}).limit(1);
    //console.log(user[0]);
    avatar = user[0].avatar;

    //query user's weapon collection (item_collection.weapons)
    const weapons = await Item.find({equip_slot: "weapon"});
    //console.log(weapons);

    //query user's headgear collection (item_collection.hats)
    const heads = await Item.find({equip_slot: "head"});
    //console.log(heads);

    res.render('customize', {avatar , weapons, heads});
})

app.post('/customize/save', async(req,res)=>{
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

    const user = await User.findOne({name: 'Buranku'});
    souls = user.souls;
    console.log(souls);

    //get list of items not in player's collection
    const weapons = await Item.find({equip_slot: 'weapon'});
    console.log(weapons);
    const heads = await Item.find({equip_slot: "head"});
    console.log(heads);

    res.render('store', {souls, weapons, heads});
});

app.get('/search', (req,res) =>{
    res.render('search_user');
});

app.get('/setting', async(req,res)=>{
    res.render('account_settings');
});