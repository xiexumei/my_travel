let express = require('express')
let router = express.Router()
let UserModel = require('../Models/User')
let Password = require('../Models/Password')
const crypto = require('crypto')//加密算法中间件
var svgCaptcha = require('svg-captcha')
const users = {}
const _filter = {'pwd': 0, '__v': 0} // 查询时过滤掉
//定义一个响应体
let resData

router.use((res, req, next)=>{
	resData = {
		code: 0,
		msg:''
	}
	next()
})

/*
密码登陆
 */

router.post('/login_pwd', function (req, res) {
  const name = req.body.name
  const pwd = req.body.pwd
  const captcha = req.body.captcha.toLowerCase()
  console.log('/login_pwd', name, pwd, captcha, req.session)

  // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
  if(captcha!==req.session.captcha) {
    return res.send({code: 1, msg: '验证码不正确'})
  }
  // 删除保存的验证码
  delete req.session.captcha

  UserModel.findOne({username:name}, function (err, user) {
      console.log(111)
    if (user) {
      console.log('findUser', user)
      if (user.password !== pwd) {
        res.send({code: 1, msg: '用户名或密码不正确!'})
      } else {
        req.session.userid = user._id
        res.send({code: 0, data: user})
      }
    } else {
      const userModel = new UserModel({username:name, password:pwd})
      let psd = new Password({
            username:name,
            password:pwd
        });
      psd.save()
      userModel.save(function (err, user) {
        // 向浏览器端返回cookie(key=value)
        // res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
        console.log(user)
        req.session.userid = user._id
        const data = {data: {_id: user._id, username: user.username, avater:user.avater,description:user.description}}
        // 3.2. 返回数据(新的user)
        res.send({code: 0, data:user})//返回id和name,新用户还没有订单信息，只需返回id和name
      })
    }
  })
})

/*
一次性图形验证码
 */
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create({
    ignoreChars: '0o1l', //过滤掉了这些容易误导的字符
    noise: 2,//验证码上面的线条数
    color: true ,//将会有颜色
   
  });
  req.session.captcha = captcha.text.toLowerCase();
  console.log(req.session.captcha)
  /*res.type('svg');
  res.status(200).send(captcha.data);*/
  res.type('svg');
  
  res.send(captcha.data)
});

//退出
router.get('/logout',function(req, res){
     // 清除浏览器保存的userid的cookie
     delete req.session.userid
     // 返回数据
    res.send({code: 0})
})

//修改昵称
router.post('/updateNickname', function(req, res){
     var newNickname = req.body.newNickname
     var oldNickname = req.body.oldNickname
     var username = req.body.username
     console.log(username,newNickname)
     if(newNickname === oldNickname){
        res.send({code:1, msg:"新昵称与旧的相同哦"})
     }
     UserModel.update({
        username:username
     },{
        nickName:newNickname
     }).then(()=>{
        res.json({
                    code:0,
                    msg:'修改成功！'
                    });
     })

})

//修改签名
router.post('/updateDescription',(req,res)=>{
    let newval = req.body.newval
    let username = req.body.username
    UserModel.findOne({
        username:username
    }).then((rs)=>{
        if(!rs){
            res.json({
                code:1,
                msg:"出错啦"
            })
            return 
        }else{
            UserModel.update({
                username:username
            },{
                description: newval
            }).then(()=>{
                res.json({
                    code:0,
                    msg:'修改成功'
                })
            })
        }
    })
})

/*
重新获取到用户信息

*/
router.get('/userInfo', function (req, res) {
  // 取出userid
  const userid = req.session.userid
  // 查询
  UserModel.findOne({_id: userid}, _filter, function (err, user) {
    // 如果没有, 返回错误提示
    if (!user) {
      // 清除浏览器保存的userid的cookie
      delete req.session.userid

      res.send({code: 1, msg: '请先登陆'})
    } else {
      // 如果有, 返回user
      res.send({code: 0, data: user})
    }
  })
})

//获取用户主页
router.get('/showuserInfo',(req,res)=>{
   let username = req.query.username;
   UserModel.findOne({
       username:username
   }).then((userInfo)=>{
       if (userInfo){
           res.json(userInfo)
       }
   })
});

module.exports = router;