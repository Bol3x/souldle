const User = require('../database/models/User.js');

const profile = {
    getProfileUser: async function(req, res){
        
    },

    getProfileFind: async function(req,res){
		const name = req.query.name;
		const uid = req.query.uid;
	
		const user = await User.findOne({name, uid}, "avatar statistics").populate({path: 'avatar.hat'}).populate({path: 'avatar.weapon'});

		const avatar = user.avatar;
		const stats = user.statistics;
		res.redirect('profile', {name, avatar, stats});
	}
}

module.exports = profile;