let express = require('express')

let mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	user_id:{//当前的用户id
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},

	chatWith:{//私信的用户
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'

	},
	addTime:{//发送内容的时间
		type:Date,
		default: Date.now
	},

	content:{
		type: String
	},
	unread:{//是否默认未读
		type: Boolean,
		default: true
	}
})