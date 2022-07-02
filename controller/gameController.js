const User = require('../database/models/User.js');
const Answer = require('../database/models/Answer.js');
const auth = require('../controller/check-authentication.js');
const game = {
	getGame: async function (req, res){
		const user = await User.findOne({name: req.session.name}, 'avatar item_collection')
		.populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'})
		.populate({path: 'item_collection.weapons'}).populate({path: 'item_collection.hats'});
		if (user != null){
		avatar = user.avatar;
		res.render('game', {avatar});}
		else
		res.render('game', {avatar : null});
	},
	uploadAnswer: function(req,res){
		var datetoday = new Date();
		var currentHour = datetoday.getHours();
        var tfrom = req.session.name;
        var tanswer = req.body.answer;
        var thour = currentHour;
		
        const ans = {
            answer: tanswer,
            from: tfrom,
            hour: thour
        }
		if (tfrom != "")
		{
		try{
			var answ = new Answer(ans);
			answ.save();
			req.flash('success_msg', 'Answer submitted');
			res.redirect('/home');
		}catch(err){
			console.log(err);
			req.flash('error_msg', 'Could not submit answer, please try again.');
			res.redirect('/play');
		}}
	},
	getPlayed: async function(req,res){
		var datetoday = new Date();
		var currentHour = datetoday.getHours();
		const played = await Answer.findOne({from: req.session.name, hour : currentHour});
		if (played == null)
			//we are good
			res.send("OK");
		else
			//they have already played
			res.send("BAD");
	},
	getAnswer: async function(req,res){
		const answer = await Answer.findOne(req.query); //tentative name of automated admin that will give answers
		if (answer == null)
			res.sendStatus(404);
		else
			res.send({message : answer.answer});
	}, 
	getGuess: async function(req,res){
		const answer = await Answer.findOne(req.query);
		if (answer == null)
			res.sendStatus(404);
		else
			res.send({message : answer.answer});
	},
	gamewin : async function(req, res){
		var myquery = { name: req.session.name};
		const user = await User.findOne({name: req.session.name});
		var incvalues = { $inc: {souls: 5, "statistics.win_streak": 1, "statistics.num_wins": 1, "statistics.num_games": 1 }};
		var posinc = {$inc: {"statistics.max_streak": 1}};
		User.updateOne(myquery, incvalues, function(err, res) {
			if (err) throw err;
			console.log("values updated");
		});
		if (user.statistics.win_streak > user.statistics.max_streak)
		User.updateOne(myquery, posinc, function(err, res) {
			if (err) throw err;
			console.log("values updated");
		});
	},
	gameloss: async function(req,res){
		var myquery = { name: req.session.name };
		console.log(req.session.name);
		var souladd = req.body.sgain;
		console.log(souladd);
		const user = await User.findOne({name: req.session.name});
		var incvalues = { $inc: {souls: souladd, "statistics.num_games": 1 }};
		User.updateOne(myquery, incvalues, function(err, res) {
			if (err) throw err;
			console.log("values updated");
		});}
}

module.exports = game;
