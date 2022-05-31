const express = require("express");
const mongoose = require("mongoose");

const app = new express();
mongoose.connect("mongodb://localhost/souldle");

const port = 3000;
var server = app.listen(3000, () =>{
    console.log("server is running at port " + port);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/view/'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '\\' + 'index.html');
});