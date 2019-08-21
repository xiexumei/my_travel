/*
请求美食，风景数据模块
*/
let express = require('express')
let router = express.Router()
let UserModel = require('../Models/User')
let Collect = require('../Models/Collect')
let foods = require('../data/foods.json')//导入食物数据
/*
获取首页分类列表
 */
router.get('/index_category', function (req, res) {
  setTimeout(function () {
    const data = require('../data/index_category.json')
    res.send({code: 0, data})
  }, 300)
})

//请求首页推荐
router.get('/recommends_categorys', function(req, res){

  setTimeout(function () {
    const data = require('../data/recommend_category.json')
    res.send({code: 0, data})
    console.log(data)
  }, 300)

})

//根据不同参数请求不同的数据
router.get('/recommend_category_list', function(req, res){
   const city = req.query.city
   setTimeout(function(){
    const newdata = require('../data/recommend_list.json')
    var data = newdata.find(function(item, index){//之前没有将过滤的数组复制给另一个变量，一直有bug
        return item.city === city
    })

    res.send({code: 0, data})
    
   }, 300)
   
   
   
})


//查找食物
router.get('/getfoods', function (req,res) {
   var city = req.query.city
   setTimeout(function(){
    const newdata = require('../data/foods.json')
    var data = newdata.find(function(item, index){//之前没有将过滤的数组复制给另一个变量，一直有bug
        return item.city === city
    })

    res.send({code: 0, data})
    
   }, 300)
})

router.post('/addCarts', function (req, res) {
  // 取出userid
  const userid = req.session.userid
  const foods = req.body.foods
  console.log(foods)
  UserModel.update({_id: userid}, {$addToSet:{cartList: foods}}, function(err, req){
    res.send({code: 0, data:req})//这里返回的信息是更新成功的标识
  })
})

//用户加入收藏
router.post('/collectFood',(req,res)=>{
  //用户id
  //物品name
  //先查找是否有用户
  //然后从物品数组里面查询是否有该物品，

  var userid = req.body.userId
  var productName = req.body.productname
  var city = req.body.localCity.substring(0,2)
  var prdoctType = req.body.prdoctType

  console.log(userid,productName,city,prdoctType)
  UserModel.findOne({
    _id:userid
  })
  .then((user)=>{//用户查到了
    //遍历用户的购物车
    console.log(user)
    var flag=0;//默认没有相同的
    if(user.cartList.length!==0){
       user.cartList.forEach((item)=>{
      //看看是否有相同的，如果有相同的就提示给用户是否要取消
      console.log(item)
      if(item.name === productName){
       flag=1
      }
     })
    }
   
    if(flag===0){
      //根据城市筛选出
      var foodsByCity = foods.find((item,index)=>{
        return item.city === city
      })   
      //根据类型筛选
      var foodslist = foodsByCity.foodChild//得到的是一个各个类型的食物
      var collectType = foodslist.find((item,index)=>{//筛选出当前类型
        return item.name === prdoctType
      }) 
      console.log(foodslist)
      var foodslist = collectType.foods  
      //获取到当前物品   
      var currentfood = foodslist.find((item,index)=>{
        return item.name = productName
      })
    }

    //更新用户信息
    UserModel.update({
      _id:userid
    },{
      $addToSet:{cartList: currentfood}
    },function(err, req){
    return res.send({code: 0, msg:'加入成功'})//这里返回的信息是更新成功的标识
  })

  })

  
  

})
module.exports = router;