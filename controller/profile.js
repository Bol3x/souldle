const User = require('../database/models/User.js');

const profile = {
    getProfileUser: async function(req, res){
        const name = req.session.name;
        
        const user = await User.findOne({name}, "avatar statistics").populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'});

		const avatar = user.avatar;
		const stats = user.statistics;
		res.render('profile', {name, avatar, stats});
    },

    getProfileFind: async function(req,res){
		const name = req.query.name;
	
		const user = await User.findOne({name}, "avatar statistics").populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'});

		const avatar = user.avatar;
		const stats = user.statistics;
		res.render('profile', {name, avatar, stats});
	}
}

module.exports = profile;