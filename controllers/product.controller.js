var db = require('../db')

module.exports.index = function(req,res) {
    var page = parseInt(req.query.page) || 1;
    var perpage = 8;
    var start = (page -1) * perpage;
    var end = page * perpage;
    res.render('products/index',{
        products: db.get('products').value().slice(start,end)
        // cach 2 : products: db.get('products').drop(start).take(perpage).value()
    })
}