var db = require('../db')

module.exports.requiredAuth = function(req,res,next) {
    if(!req.cookies.userid) {
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({id: req.cookies.userid}).value();
    if(!user) {
        res.render('/auth/login');
        return;
    }
    next();
}