var request = require('request');
var Parse = require('parse');

const url1 = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnMsg';
const key = "%2Fzbv%2FDjZ5VgROYe%2FVGDBIHhRmJCEFRBoQU2s1l3hL2XvSw9pif%2F9tkJ%2BziGMpQj7%2FAXx6mvKsDAdXji16UteQQ%3D%3D";
const stnId = '109';  //수도권 id
const dataType = 'JSON';

// url
const all_url = url1 + '?serviceKey=' + key +  '&dataType=' + dataType + '&stnId=' + stnId;   
request(all_url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    obj = JSON.parse(body);
    var resultCode = obj['response']['header']['resultCode'];
    if(resultCode == 00){   //특보 있음
      console.log("코드가 00 특보 존재");
    }
    else{ //특보 없음
      console.log("resultCode : ", resultCode);
    }
  } else {
    return 'API 호출 실패';
  };
});