var express  = require('express');
var router = express.Router();
// var { body, validationResult } = require('expreess-validator');
var Post = require('../models/Post');
var pass = 'webOS'
// Index 
router.get('/general', function(req, res){
    //시간순 정렬
  Post.find({})                 
  .sort('-createdAt') //createdAt순서대로 정렬(내림차순이라 -붙음)           
  .exec(function(err, posts){    
    if(err) return res.json(err);
    res.render('posts/general', {posts:posts});
  });
});

// New
router.get('/new', function(req, res){
  res.render('posts/new');
});

// create
router.post('/', function(req, res){
    if(pass == req.body.password){
        Post.create(req.body, function(err, post){
        if(err) return res.json(err);
        res.redirect('/notice');
        });
    }
    else{
        res.redirect('/notice');
    }
});

// show
router.get('/:id', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/show', {post:post});
  });
});

// edit
router.get('/:id/edit', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/edit', {post:post});
  });
});

// update
router.put('/:id', function(req, res){
    if(pass == req.body.password){
        req.body.updatedAt = Date.now(); //2
        Post.findOneAndUpdate({_id:req.params.id}, req.body)
            .exec(function(err, post){
        if(err) return res.json(err);
        console.log(req.body.password);
        res.redirect("/posts/"+req.params.id);
    });
    } else{
        //비번 틀렸다는 알림 띄우기
        res.redirect("/posts/"+req.params.id);
    }
});

// destroy
// 비번 하고 삭제되어야 하는데 걍 됨
router.delete('/:id', function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/notice');
  });
});

module.exports = router;