let User = require('../Models/User')
let PdMood = require('../Models/PdMood')
let express = require('express')
let router = express.Router()
let fs = require('fs')
let multer = require('multer')//文件上传中间件
let OSS = require('ali-oss')//配置阿里云OSS存储
let client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIzTgxnZjZYvn6',
    accessKeySecret: 'IAtd0qE414NgbVEDCfloEk9cuy3JJO'
})

client.useBucket('treval')//使用的存储桶

async function put(fileName, filePath, callback){
	try{
		// object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
		let result = await client.put(fileName, filePath)
		console.log(result)
		fs.unlinkSync('public/images/' + result.name)
		callback(result)
	}catch(err){
		console.log(err)
	}
}
var fileName
var filePath
let Storage = multer.diskStorage({
    destination: function (req, file, cb) {//计算图片存放地址
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {//图片文件名
        fileName = Date.now() + '_' + parseInt(Math.random() * 1000000) + '.png';
        filePath = './public/images/' + fileName;
        cb(null, fileName)
    }
});

let upload = multer({storage: Storage}).any()//接受一切上传的文件。文件数组将保存在 req.files。
let avater = multer({storage: Storage}).single('avater')//接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file。



router.post('/uploadAvater', function (req, res, next) {
    avater(req, res, function (err) {
        let username = req.body.username;//获取到当前用户的id
        console.log(username)
        let imgs;
        let oldVal = req.body.oldVal || '';
        if (oldVal) {
            oldVal = oldVal.replace('http://pfr020xzs.bkt.clouddn.com/', '');
            client.delete(oldVal, function (err) {
                if (err) {
                    console.log(err)
                }
            })
        }
        if (err) {
            return res.end(err);
        }
        let i = 0;
        let item = req.file;
        let filePath = `./public/images/${item.filename}`;
        put(fileName,filePath,(result)=>{
            imgs = result.url;
            console.log(imgs)
            User.update({
                _id: username
            }, {
                avater: imgs
            }).then(() => {
                res.json({
                    code: '0',
                    msg: '上传成功'
                });
            })
        });
    });
});


//发布动态
/*router.post('/uploadFile',function(res, req, next){
	   
    upload(req, res, function(err){
    	let username = req.body.username//用户_id
	    let content = req.body.content
	    let imgs = []

	    if(err){
	    	res.send({code:0, msg:"出错"})
	    }
	    console.log(req.files)    

    })
	
})
*/

//发布动态
router.post('/uploadFile',function(req, res, next){
	upload(req, res, function(err){
		console.log(111)
		let content = req.body.content || '';
		let username = req.body.username //用户的_id
		console.log(content)
		//传来的图片
		let imgs = []

		if(err){
			return res.send({code:1, data:err})
		}
        console.log(req.files)
		if(req.files.length === 0){//用户没有上传图片
           //就新建一个没有图片的PdMood对象
           new PdMood({
           	writer: username,   //发表用户的当前_id
           	content: content
           })
           .save()
           .then((result)=>{
           	res.json({
           		code: 0,
           		result: result,
           		msg:'上传成功'
           	})
           })
		}

		//图片不为0，发送了含有图片的动态
		let i = 0;
		req.files.forEach((item, index) => {
			//图片上传到的路径
			let filePath = './public/images/'+item.filename

			//上传图片
			put(item.filename, filePath, (result)=>{
				imgs.push(result.url)
				i++
				if(i === req.files.length){
					//新建一个含有图片的动态
					new PdMood({
						content: content,
						writer: username, //用户_id
						moodImg: imgs
					}).save().then(()=>{
						res.json({
							code:0,
							msg:'发布成功'
						})
					})
				}
			})
		})
	})
})
module.exports = router;