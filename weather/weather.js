const schedular = require('node-schedule');
var request = require('request');
var Parse = require('parse');

const url1 = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnMsg';
const key = "%2Fzbv%2FDjZ5VgROYe%2FVGDBIHhRmJCEFRBoQU2s1l3hL2XvSw9pif%2F9tkJ%2BziGMpQj7%2FAXx6mvKsDAdXji16UteQQ%3D%3D";
const stnId = '109';  //수도권 id
const dataType = 'JSON';
const all_url = url1 + '?serviceKey=' + key +  '&dataType=' + dataType + '&stnId=' + stnId;   

const schedule = schedular.scheduleJob("*/5*****", function(){
  request({all_url,
           method: 'GET'
        }, function(error, response, body) {
          console.log("5초마다 실행");
    if (!error && response.statusCode == 200) {
      obj = JSON.parse(body);
      var resultCode = obj['response']['header']['resultCode'];
      if(resultCode == 00){   //특보 있음
        //특보가 해제일 경우 report 내용이 없음
        const report = obj['response']['body']['items']['item'][0]['t4'];

        //특보가 발표일 경우
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
})

function callback(err, res, body){
  if(!err && res.statusCode == 200){

  } else{
    console.log(err)
  }
}

request(options, callback);

module.exports = weather;