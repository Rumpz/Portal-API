var model = require('models').user
module.exports = function(req, res, next){
  model.remove( req.id, function(err,rows){
  	if(err) throw err
  	next(null, rows)
  })
}