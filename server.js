
var express = require("express");
// var url = require('url');
var bodyParser = require('body-parser');
var app = express();
// const mongo = require('mongodb').MongoClient;

var session = require('express-session')
app.set('trust proxy', 1)
app.use(session({
    secret: 'Activate the switch!',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
// var database = require('./server/config/mongoose.js')

// var chat = require('./server/models/chats.js')

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended : true}));



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

const server = app.listen(8000, function() {
    console.log("listening on port 8000");
})
var io = require("socket.io")(server)

require('./server/config/routes')(app)
require("./server/config/socket")(io)
