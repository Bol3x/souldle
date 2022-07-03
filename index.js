const express = require("express");
const mongoose = require("mongoose");
const cron = require('node-cron');
require(`dotenv`).config();

const routes = require('./route.js');

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/souldletestdb");
const Answer = require('./database/models/Answer');

const app = new express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//view engine to be used is Embedded JavaScript (EJS)
app.set('view engine', 'ejs');
app.set('views', 'view');   //set engine to look for ejs files in view

//path for static file (css, asset, client-side script) serving
app.use('/public', express.static(__dirname + '/public'));

//server start
PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
	console.log("server is running at port: " + PORT);
});

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

// automated answer processes for game

//run on startup
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

	for(var i=1; i<=3; i++)
		Answer.create({answer: generateAnswerKey(), hour: hour, from: "Kamo"});
}

// server routes
app.use('/', routes);