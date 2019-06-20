var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/login_reg');

module.exports = mongoose;