const express = require("express");
const mongoose = require("mongoose");
const dotenv = require(`dotenv`);
const cron = require('node-cron');

const routes = require('./route.js');

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

mongoose.connect("mongodb://localhost/souldletestdb");
const Answer = require('./database/models/Answer');

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

// automated answer processes for game
resetAnswers();
cron.schedule("0 * * * *", function(){
	//script will run every hour
	resetAnswers();
});

function generateAnswerKey(){
	var key = '';
	var moves = 'ABCDE';
	for ( var i = 0; i < 5; i++) 
		key += moves.charAt(Math.floor(Math.random() * 5));
   	return key;
}

function resetAnswers(){
	console.log("refreshing answers...");
	hour = new Date().getHours();
	Answer.db.dropCollection("answers", function(err, result){
		if (err){
			console.log(err);
		}
		else console.log("Successfully reset answers.");
	})

	var key = generateAnswerKey();
	console.log("key: " + key);
	AnswerKey = Answer.create({answer: key, hour: hour, from: "Kami"});
}

// server routes
app.use('/', routes);

// Sessions
app.use(session({
	secret: 'somegibberishsecret',
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
});