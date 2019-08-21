/*
用户动态的schemas
*/
var mongoose = require('mongoose')
module.exports = new mongoose.Schema({
	addTime:{
		type: Date,
		default: Date.now
	},
	content:String, //用户发表内容
	writer:{
       type: mongoose.Schema.Types.ObjectId, //这里的类型是User里面的id
       ref:'User'//关联User集合
	},
	comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
	moodImg:{//用户上传的图片数组
		type: Array,
		default:[]
	}
})
