var User = require("../models/users");

//Export data for other files to access. FindUserById accesses a... 
module.exports = {
	findUserById: function(id) {
		console.log('Find user by id')
		return User.findOne({_id: id}, {new: true})
		//This is for READ
	},

	updateUser: function(id, userInfo) {
		console.log('User Update')
		
		return User.findOneAndUpdate({_id: id}, {first_name: userInfo.first_name, last_name:userInfo.last_name, email:userInfo.email}, {new: true, runValidators: true})

	},

	deleteUser: function(id, userInfo) {
		console.log('PISS OFF!!!')
		return User.findOneAndDelete({_id: id})

	},

	findUserByEmail: function(email) {
		console.log('Find user by email.')
		return User.findOne({email: email})
	},

}