let express = require('express')

let mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	username: String,
	password: String,
	nickName:{
		type: String,
        default: '一只会说话的猪'
	},
	isAdmin:{
		type: Boolean,
		default: false
	},
	avater:{
		type: String,
		default:'http://localhost:4000/public/images/ava.jpg'

	},
	description:{
		type:String,
		default:'这个人很懒，什么都没留下'
	},

	cartList:{
		type: Array
	}
})

