var express  = require('express');
var router = express.Router();
var Post = require('../models/Post');
var pass = 'webOS'

var util = require('../util');
var request = require('request');
// var cheerio = require('cheerio');
// var Parse = require('parse');
// const parseString = require('xml2js').parseString;

// Index 
router.get('/', function(req, res){
    //시간순 정렬
  Post.find({})                 
  .sort('-createdAt') //createdAt순서대로 정렬(내림차순이라 -붙음)           
  .exec(function(err, posts){    
    if(err) return res.json(err);
    res.render('posts/index', {posts:posts});
  });
});

router.get('/weather', function(req, res, next) {
    const url1 = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnMsg';
    const key = "%2Fzbv%2FDjZ5VgROYe%2FVGDBIHhRmJCEFRBoQU2s1l3hL2XvSw9pif%2F9tkJ%2BziGMpQj7%2FAXx6mvKsDAdXji16UteQQ%3D%3D";
    const stnId = '108';  //수도권 id = 109
    const dataType = 'JSON';
    const fromTmFc = '20220823'; //특보 나온 날 예시  23일만 발표 있음
    const toTmFc = '20220823';
    // url
    const all_url = url1 + '?serviceKey=' + key +  '&dataType=' + dataType + '&stnId=' + stnId + '&fromTmFc=' + fromTmFc + '&toTmFc=' + toTmFc;   
    request(all_url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        obj = JSON.parse(body);
        console.log(obj);
        var resultCode = obj['response']['header']['resultCode'];
        if(resultCode == 00){   //특보 있음
          //특보가 해제일 경우 clear 내용이 없음
          const report = obj['response']['body']['items']['item'][0]['t4'];

          //발표일경우
          if(report != ""){
            const title = obj['response']['body']['items']['item'][0]['t1'];
            console.log("title = ", title);
            const body = obj['response']['body']['items']['item'][0]['t2'];
            console.log("body = ", body);          
            
            //db저장
            var post = new Post({'title':title, 'body':body});
            post.save(function(err, silence){
              if(err){
                console.log(err);
                 res.redirect('/');
                    return;
              }
              res.redirect('/');
            });
          }
        }
        else{ //특보 없음
          console.log("resultCode : ", resultCode);
        }
      } else {
        return 'API 호출 실패';
      };
    });
});


// New
router.get('/new', function(req, res){
  var post = req.flash('post')[0] || {};
  var errors = req.flash('erros')[0] || {};
  res.render('posts/new', { post:post, errors:errors});
});

// create
router.post('/', function(req, res){
    if(pass == req.body.password){
        Post.create(req.body, function(err, post){
        if(err){
          req.flash('post', req.body);
          req.flash('errors', util.parseError(err));
          return res.redirect('/posts/new');
        }
        res.redirect('/posts');
        });
    }
    else{
        res.send(
            `<script> alert('Wrong password!');
           location.href='${'http://localhost:3000/posts/new'}';
            </script>`
        )
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
  var post = req.flash('post')[0];
  var errors = req.flash('errors')[0] || {};
  if(!post){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/edit', {post:post});
    });
  }
  else {
    post._id = req.params.id;
    res.render('posts/edit', { post:post, errors:errors });
  }
  
});

// update
router.put('/:id', function(req, res){
    if(pass == req.body.password){
        req.body.updatedAt = Date.now();
        Post.findOneAndUpdate({_id:req.params.id}, req.body,  {runValidators:true}, function(err, post){
          if(err){
            req.flash('post', req.body);
            req.flash('errors', util.parseError(err));
            return res.redirect('/posts/'+req.params.id+'/edit');
          } 
          console.log(req.body.password);
          res.redirect("/posts/"+req.params.id);
        });
    }
     else{
        res.send(
            `<script> alert('Wrong password!');
            location.href='${"/posts/"+req.params.id}';
            </script>`
        )
    }
});

// destroy
// 비번 하고 삭제되어야 하는데 걍 됨
router.delete('/:id', function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});

//admin categroy routes
router.route('/category')
      .get()

module.exports = router;