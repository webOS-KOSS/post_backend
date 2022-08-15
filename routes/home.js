var express = require('express');
var router = express.Router();

// Home
router.get('/', function(req, res){
  // res.render('home/index');
  res.redirect('/posts');
});
// router.get('/about', function(req, res){
//   res.render('home/welcome');
// });

module.exports = router;