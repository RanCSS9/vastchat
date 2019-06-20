
var UserController = require("../controllers/usercontrol")
const mongoose = require('mongoose'),
    User = mongoose.model('User')
    var bcrypt = require("bcrypt")
    var session = require('express-session')
    var register = require('../controllers/register.js')
    var login = require('../controllers/login.js')
    var chatcontrol = require('../controllers/chatcontrol.js')


module.exports = function(app){
    
app.get('/', function(request,response){
    console.log('in get /')
    response.render ('index')
})


app.get('/success', function(request,response){
    console.log('in get /success')
    console.log(request.session)    
    if('login_user' in request.session){
        console.log("I'm logged in!")
        response.locals.login_user = request.session.login_user;
        response.render('home')
    }else{
        response.redirect('/')
    }
})

app.get('/chat', function(request,response){
    console.log('in get /chat')

    if('login_user' in request.session){
        response.render('chat')
    }else{
        response.redirect('/')
    }
})

app.post('/login', function(request, response){
    console.log('in post login')
    UserController.findUserByEmail(request.body.email)
    .then(user => {
        if (user == null) {
            response.redirect("/")
        } else {
            request.session.login_user = user;
            console.log("------")
            console.log(request.session.login_user)
            login.login(user, request.body.password, function(success) {
                if (success) {
                    response.redirect("/success")
                } else {
                    response.redirect("/")
                }
            })
        }
        return user;
    })
    .catch(err => {
        console.log('find user error: ', err)
        return err;
    }) 
})

app.get('/users/edit/:id', function(request,response){
    console.log('in get /edit')
    if('login_user' in request.session){
        response.render('update', {user:request.params.id})
    }else{
        response.redirect('/')
    }
})

// Below this line be CRUD! ARRGGH!
app.post('/users', async function (request,response){
    console.log(request.body)
    register.create(request,response);
})

app.post("/users/update/:id", function(request, response) {
    console.log('hahahahhahahahahhahaahhahaahhahhhahahahahhaaaahahhaahahhaha')
    var userinfo = request.body
    UserController.updateUser(request.params.id, userinfo)
    .then(updatedUser => {
        console.log('userinfo')
        request.session["login_user"] = updatedUser;
        response.redirect('/success')
    })
    .catch(err => {
        console.log(err);
        response.redirect("/users/update/" + request.params.id)
    })
    
})

app.get("/users/delete/:id", function(request, response) {
    console.log('DELETE ME DELETE ME DELETE ME!!!')
    var userinfo = {first_name:request.body.first_name, last_name:request.body.last_name, email:request.body.email, birthday:request.body.birthday }
    UserController.deleteUser(request.params.id, userinfo)
    .then(user => {
       console.log('IT WORKS IT WORKS IT WORKS!!!')
        request.session.destroy();
        response.redirect('/')
    })
    .catch(err => {
        console.log(err);
        response.redirect("/success")
    })



})
app.post("/users/read/:id", function(request, response) {
})
}