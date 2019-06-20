var mongoose = require("../config/mongoose");


var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, validate: {
        validator: async function(v){
            // The await operator is used to wait for a promise returned by an async function. The await expression causes async function execution to pause and wait for the promise's resolution, and resumes the async function execution when the value is resolved, and returns the resolved value. If the value is not a promise, it's converted to a resolved promise.
            docs = await User.find({email: v})
            if(docs.length > 0){
                return false
            }else return true
        },
        message: props => `${props.value} is not valid, please use a valid email`
    }},
    birthday: {type: String, required: true, validate: {
        validator: function(v){
            return /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)([0-9][0-9])$/.test(v);

            // The test() method tests for a match in a string. This method returns true if it finds a match, otherwise it returns false.
        },
        message: props => `${props.value} is not a valid birthday, please use MM/DD/YYYY format!`
    }}
}, {timestamps: true})

var User = mongoose.model('User', UserSchema);

module.exports = User;