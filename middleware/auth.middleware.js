var db = require('../db')

module.exports.requiredAuth = function(req,res,next) {

    // console.log(req.cookies,req.signedCookies);
    if(!req.signedCookies.userid) {
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({id: req.signedCookies.userid}).value();
    if(!user) {
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user;
    next();
}