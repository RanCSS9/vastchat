var mongoose = require("../config/mongoose")


var ChatSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    message: {type: String, required: true},
})




var Chat = mongoose.model('Chat', ChatSchema);



module.exports = {
    chat: ChatSchema


}