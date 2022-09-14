require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session'); 
var app = express();
const schedule = require('node-schedule');
// const weather = require('./weather/weather');

// DB setting
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash()); 
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true})); 

app.engine('html', require('ejs').renderFile);  //html로 렌더링

// Routes
app.use('/', require('./routes/post'));

// Port setting
var port = 80;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
  
  /*-------------------weather alarm------------------------- */
  schedule.scheduleJob('0 * * * * *', function(){
    console.log(new Date() + ' scheduler running!');
    var weather = require('./weather/weather');
    
  });
});
