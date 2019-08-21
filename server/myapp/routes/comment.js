/*
处理用户评论的模块
*/
let User = require('../Models/User')
let PdMood = require('../Models/PdMood')
let Comment = require('../Models/Comment')
let express = require('express')
let router = express.Router()

router.post('/comment',(req,res)=>{
	let content = req.body.content //接受到评论内容
	let from = req.body.from //评论人
	let to = req.body.to ||'' //被评论
	let moodId = req.body.Mood //被评论动态的id
	//拿到这些参数之后新建一个评论对象存储这些参数
	let writer = req.body.writer//发布动态的人
	console.log(content,from,to,moodId,writer)
	new Comment({
		content: content,
		from: from,
		to: to,
		Mood: moodId,
		writer: writer
	})
	.save()//保存
	.then((rs)=>{//保存成功之后去动态表里面查找动态
		PdMood.findOne({
			_id: moodId
		}).then((result)=>{
			let comments = result.comments //取到关于该动态的所有评论
		    comments.push(rs._id) //在当前的动态数中将当前的评论加到该动态的评论数组中
		    PdMood.update({//更新该动态
              _id: moodId
		    },{
		    	comments:comments
		    })
		    .then(()=>{
		    	res.json({
		    		code:0,
		    		msg:'评论成功'
		    	})
		    })
		})
	})
})

module.exports = router;