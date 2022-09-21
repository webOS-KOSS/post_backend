var express  = require('express');
var router = express.Router();
var Post = require('../models/Post');

/*---------------------------notice------------------------- */
// Index 
router.get('/', function(req, res){
    //시간순 정렬
    Post.find({selectbox:'notice'})                 
  .sort('-createdAt') //createdAt순서대로 정렬(내림차순이라 -붙음)           
  .exec(function(err, posts){    
    if(err) return res.json(err);
    res.render('posts/notice/notice', {posts:posts});
  });
});

// New
router.get('/notice/new', function(req, res){
  res.render('posts/notice/new');
});

// create
router.post('/', function(req, res){
  var noticeRequest = new Object();
  noticeRequest.selectbox = 'notice';
  noticeRequest.title = req.body.title;
  noticeRequest.body = req.body.body;

  if (req.body.notification == 'noti_On'){
    var noticeSend = new Array(
      {title:noticeRequest.title, content:noticeRequest.body},
      {start:'10H 30M',end:'12H 00M'},
      {appliance:req.body.appliance, operation: req.body.operation},
      );
    var jsonString = JSON.stringify(noticeSend);      
    var jsonData = JSON.parse(jsonString); 
//2002-11-18 19:00:00 시간 데이터 이런 식으로
    console.log("jsonString: ", jsonString);
    console.log("jsonData: ", jsonData);
  }

  if(req.body.password == "notice"){
  Post.create(noticeRequest, function(err, post){
    if(err) return res.json(err);
    res.redirect('/');
    });
  }
  else{
    res.redirect('/');
  }
});

// show
router.get('/notice/:id', function(req, res){
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
router.put('/posts/:id', function(req, res){
    if(pass == req.body.password){
        req.body.updatedAt = Date.now(); 
        Post.findOneAndUpdate({_id:req.params.id}, req.body)
            .exec(function(err, post){
        if(err) return res.json(err);
        res.redirect("/notice/"+req.params.id);
    });
    } else{
        //비번 틀렸다는 알림 띄우기
        res.redirect("/notice/"+req.params.id);
    }
});

// destroy
// 비번 하고 삭제되어야 하는데 걍 됨
router.delete('/:id', function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/');
  });
});

/*---------------------------general------------------------- */
//Index
router.get('/general', function(req, res){
    //시간순 정렬
    Post.find({selectbox:'general'})                 
  .sort('-createdAt') //createdAt순서대로 정렬(내림차순이라 -붙음)           
  .exec(function(err, posts){    
    if(err) return res.json(err);
    res.render('posts/general/general', {posts:posts});
  });
});

// New
router.get('/general/new', function(req, res){
    res.render('posts/general/new');
  });

// create
router.post('/general', function(req, res){
  var generalRequest = new Object();
  generalRequest.selectbox = 'general';
  generalRequest.title = req.body.title;
  generalRequest.body = req.body.body;
  if(req.body.password == "general"){
    Post.create(generalRequest, function(err, post){
      if(err) return res.json(err);
      res.redirect('/general');
      });
    }
    else{
      res.redirect('/');
    }
  });

// show
router.get('/general/:id', function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/show', {post:post});
    });
  });

// update
router.put('/general/posts/:id', function(req, res){
    if(req.body.password == "general"){
        req.body.updatedAt = Date.now(); 
        Post.findOneAndUpdate({_id:req.params.id}, req.body)
            .exec(function(err, post){
        if(err) return res.json(err);
        res.redirect("/general/"+req.params.id);
    });
    } else{
        //비번 틀렸다는 알림 띄우기
        res.redirect("/general/"+req.params.id);
    }
});

// destroy
// 비번 하고 삭제되어야 하는데 걍 됨
router.delete('/general/:id', function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/posts/general');
    });
  });

module.exports = router;