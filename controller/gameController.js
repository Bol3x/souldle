const User = require('../database/models/User.js');
const game = {
	gamewin: async function(req,res){
		const user = await User.findOne({name: 'Buranku'}, "souls statistics"); //unsure what to place at the second part
		//increment souls by 5 because they guessed all of it correctly
		user.souls += 5;
		//update stats to accomodate loss
		//increment winstreak by 1
		user.statistics.win_streak += 1;
		var ws = user.statistics.win_streak;
		//if win_streak > max_streak, set max_streak to win_streak
		if (ws > user.statistics.max_streak)
		user.statistics.max_streak = ws;
		var ms = user.statistics.max_streak;
		//increment num_wins by 1
		user.statistics.num_wins += 1;
		var nwins = user.statistics.num_wins;
		//increment num_games by 1
		user.statistics.num_games += 1;
		var gms = user.statistics.num_games;
		res.status(200).send({message: "You Win!", souls: user.souls, winst: ws, max: ms, wins: nwins, ngms: gms });
	},
	gameloss: async function(req,res){
		const user = await User.findOne({name: 'Buranku'}, "souls statistics"); //unsure what to place at the second part
		//update souls based on all correct guesses
		
		//update stats to accomodate loss
			//update win_streak to 0
			user.statistics.win_streak - 0;
			//no change to max_streak and num_wins
			//increment num_games by 1
			user.statistics.num_games += 1;
	}
}

module.exports = game;