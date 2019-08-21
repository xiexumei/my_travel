var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
const mongoose = require('mongoose')
var logger = require('morgan');
/*与登录注册相关的中间件*/
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')//解析post请求
var session = require('express-session')

let User = require('./Models/User');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));//设置静态资源


app.all('*',function(req,res,next){  
 let origin=req.headers.origin;
   res.setHeader('Access-Control-Allow-Origin',"*");
   res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
})



/*设置session的有效时间*/
//设置session的有效时间
app.use(session({
  secret: '12345',
  cookie: {maxAge: 1000*60*60*24 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true,
}));
/*设置登录用户的session*/
app.use((req, res, next)=>{
	if(req.session.userInfo){
		//如果用户存在
		try{
			req.userInfo = req.session.userInfo;
			User.findOne({
				_id:req.userInfo._id//创建时mongodb会为每一个用户分发一个_id

			}).then((userInfo)=>{
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin)//判断用户是不是管理员，管理员有不同的权限
				req.userInfo.username = userInfo.username;
				req.userInfo.avater = userInfo.avater
				req.userInfo.description = userInfo.description
				next()//通行
			})
		}catch(e){

		}
	}else{
		next()
	}
})
//设置用户登录拦截
app.use(function(req, res, next){
	if(req.session.userid){
		next()
	}else{
		console.log("url:"+req.originalUrl)
		if(req.path!='/addCarts'){
			next()//通行
		}else{
			res.send({code: 1, data:"请先登录"})
		}
	}
})
//按模块引入
app.use('/', require('./routes/user'))
app.use('/upload', require('./routes/upload'));
app.use('/pdMood', require('./routes/getMood'));//用户操作动态的模块
app.use('/comment', require('./routes/comment'));//评论模块
app.use('/getGoods', require('./routes/getGoods'));//获取美食风景等数据模块
app.use('/search',require('./routes/search'));

//连接数据库
// 1. 连接数据库

mongoose.connect('mongodb://127.0.0.1:27017/treval', {useNewUrlParser:true},(err) => {
    
    if (err) {
        console.log("数据库连接失败。");
    } else {
        console.log("数据库连接成功！");

    }
})






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
