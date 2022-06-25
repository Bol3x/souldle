const express = require("express");
const mongoose = require("mongoose");
const dotenv = require(`dotenv`);
const routes = require('./route.js');

mongoose.connect("mongodb://localhost/souldletestdb");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//view engine to be used is Embedded JavaScript (EJS)
app.set('view engine', 'ejs');
app.set('views', 'view');   //set engine to look for ejs files in view

//path for static file (html, css, asset) serving
app.use(express.static(__dirname + '/view/'));
app.use('/public', express.static(__dirname + '/public/'));

//server start
dotenv.config();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
var server = app.listen(port, hostname, () =>{
    console.log("server is running at: " + hostname + ":" + port);
})

app.use('/', routes);