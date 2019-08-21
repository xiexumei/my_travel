/*
用户动态的schemas
*/
var mongoose = require('mongoose')
module.exports = new mongoose.Schema({
	addTime:{
		type: Date,
		default: Date.now
	},
	user:{
       type: mongoose.Schema.Types.ObjectId, //这里的类型是User里面的id
       ref:'User'//关联User集合
	},
	goods:{
		type: Object
	}
})
