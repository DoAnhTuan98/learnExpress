var db = require('../db')
var shortid = require('shortid')

module.exports.login =  function(req,res){
    res.render('auth/login',{
        users: db.get('users').value()
    });
};

module.exports.postLogin = function(req,res,next) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email: email}).value();
    if(!user) {
        res.render('auth/login',{
            errors: [
                'User does not exists'
            ],
            values : req.body
        });
        return;
    }

    if(user.password !== password) {
        res.render('auth/login',{
            errors: [
                'Wrong password'
            ],
            values: req.body
        })
        return;
    }


    res.cookie('userid',user.id)
    res.redirect('/users')
}