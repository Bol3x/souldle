const express = require("express");
const mongoose = require("mongoose");

const app = new express();
mongoose.connect("mongodb://localhost/souldletestdb");

const User = require('./database/models/User');
const Item = require('./Database/models/Item');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'view');   //set engine to look for ejs files in view

//server start
const port = 3000;
var server = app.listen(3000, () =>{
    console.log("server is running at port " + port);
})

app.use(express.static(__dirname + '/view/'));

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

app.get('/profile', async(req,res) =>{
    const user = await User.find({name: "Buranku"}).populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'}).limit(1);
    console.log(user[0]);
    const name = user[0].name;
    const avatar = user[0].avatar;
    const stats = user[0].statistics;
    res.render('profile', {name, avatar, stats});
});

app.get('/search', (req,res) =>{
    res.render('search_user');
});

app.get('/setting', async(req,res)=>{
    res.render('account_settings');
});