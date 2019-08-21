/*
这是用户专门操作动态的模块
*/
let PdMood = require('../Models/PdMood')
let Comment = require('../Models/Comment')
let express  = require('express')
let router = express.Router()

//获取到全部动态
router.get('/getMoods',(req, res)=>{
	//sort({_id: -1})降序排列数据，populate关联查询
	var userInfo = req.userInfo
	PdMood.find().sort({_id: -1}).populate(['writer','comments']).then((data)=>{
		res.json({
			code:0,
			//useInfo, //获取评论数组的时候将用户信息返回
			data
		})
	})
})

//删除当前该用户的动态
/*
删除该用户动态的时候还需要将关于该动态里面的评论也删除
*/
router.post('/delMood',(req,res)=>{
	let id = req.body.id
	console.log(id)
	PdMood.findOne({
		_id:id
	})
	.then((mood)=>{//这里获取到动态符合该动态_id的动态
		console.log(mood)
		if(mood.comments.length===0)//该动态不存在评论列表
         {
            PdMood.remove({//删除该动态
            	_id:id
            }).then(()=>{
            	res.json({
            		code: 0,
            		msg:'删除成功'
            	})
            	return
            })
         }else{//该动态的评论列表不为0
         	let i = 0;
         	PdMood.comments.forEach((item)=>{
         		Comment.remove({//去评论列表里面删除这条动态的评论
         			_id:item //item是评论id

         		})
         		.then(()=>{
         			i++ //每删除一个i++
         			if(i == PdMood.comments.length){//将评论删除完之后，再将这个动态删除
		                PdMood.remove({//删除该动态
		            	_id:id
			            }).then(()=>{
			            	res.json({
			            		code: 0,
			            		msg:'删除成功'
			            	})
		            	return
                     })
         			}
         		})
         	})

         }
	})
})


//根据传来的writer._id查询该用户的所有动态
router.get('/moodbyId',(req, res)=>{
	//获取到传来的weiter._id
	var writer = req.query.id
	console.log(writer)
	PdMood.find({
		writer
	}).sort({_id:-1}).populate(['writer', 'comments'])
	.then((data)=>{
		res.json(data)
		return 0
	})
})
module.exports = router;