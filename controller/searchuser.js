const User = require('../database/models/User.js');
const Item = require('../database/models/Item.js');

const search = {
    getSearch: function(req,res){
		if(req.session.name != null) 
			res.render('search_user');
		
		else
			res.render('index');
	},

	getCheckUser: async function(req,res){
		const user = await User.findOne(req.query);
		if (user == null)
			res.sendStatus(404);
		else
			res.sendStatus(200);
	}
}

module.exports = search;