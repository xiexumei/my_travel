<template>
	<div class="ua">
		<HeaderTop class="app-header2" :title="'更换头像'">
			<i class="iconfont iconfanhui left" slot="left" @click="goback()"></i>
			<span slot="right" class="right" @click="upDateOk()">确定</span>
		</HeaderTop>
		<div class="ua-box">
			<img :src="avater?avater:userInfo.avater" class="avater">
		</div>
		<input  ref="avater" type="file" name="" style="display: none" accept="image/*" 
		@change="changeImg($event)">
		<a  class="weui-btn weui-btn_primary btn-login choose-avater" @click.prevent="chooseImg()">选择头像</a>
	</div>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex'
	import {updateAvater} from '../../api'
	import {Toast, Indicator} from 'mint-ui'
	import HeaderTop from '../Header/HeaderTop.vue'
	/*思路：
	1.点击按钮选择图片，其实是间接触发input图片选择
	2.input框被监听change事件

	*/
	export default{
		data(){
			return{
				file:'',
				avater:''

			}
		},
		computed:{
          ...mapState(['userInfo'])
		},
		components:{
			HeaderTop
		},
		methods:{
			//返回
			goback(){
				return this.$router.go(-1)
			},
			//间接点击input框
			chooseImg(){
                var avater = this.$refs.avater
                avater.click()
                avater.click() //这里要设置两次才有用
			},

			//change()函数将选中的图片绘制到页面中
			changeImg(event){
				console.log(111)
				var files = event.target.files
				
                if(files.length===0){//没有选中
                 return;
                }

                var imgPreview//新建一个缓冲区象允许Web应用程序异步读取存储在用户计算机上的文件。
                var length = files.length
                for(let i=0; i<length; i++){
                	this.file = files[i]
                	imgPreview = new FileReader()
                	if(this.file.size > self.maxSize){
                		Toast('图片太大，不允许上传')
                		return;
                	}
                }
                //加载选中的图片
                imgPreview.onload=(event)=>{
                   let newimg = new Image()
                   newimg.onload = ()=>{
                   	//创建画布
                   	let canvas = document.createElement('canvas')

                   	let ctx = canvas.getContext('2d')
                   	let width = newimg.width
                   	let height = newimg.height

                   	//设置画布的大小
                   	canvas.width = width;
                   	canvas.height = height
                   	ctx.drawImage(newimg, 0, 0, width, height)

                   	let newimgUrl = canvas.toDataURL('image/png')//方法返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为96dpi。
                   	this.avater = newimgUrl
                   	console.log(this.avater)
                   }

                   newimg.src = event.target.result;
                  
                }
                 imgPreview.readAsDataURL(this.file)//readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE
                   
			},

			//确定更新
			upDateOk(){
				if(!this.file){
					Toast('请选择新的头像')
					return
				}
			//	Indicator.open('头像更新中...')
				let self = this
				let param = new FormData()//FormData对象用以将数据编译成键值对
				param.append('username',this.userInfo._id)
				param.append('avater',this.file)
				console.log(param)
				if(this.userInfo.avater!== 'http://localhost:4000/public/images/ava.jpg'){
					param.append('oldVal', this.userInfo.avater)
				}
				let headers = {
					headers:{
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}
				//请求更新头像的方法
				self.$axios.post('/api/upload/uploadAvater',param, headers).then(function(result){
					 self.$router.push({path: '/home'});
                     Indicator.close();
                     Toast(result.data.msg)
				})
			}
		
		}
	}
</script>
<style type="text/css">
	.ua {
    position: fixed;
    top: 50px;
    bottom: 60px;
    width: 100%;
    height: 675px;
    background: url(./lx2.jpg) no-repeat;
    background-size:  375px 675px
    
  }
  .ua-box {
      background-color: black;
      width: 200px;
      height: 200px;
      margin: 100px auto;
      position: relative;
      overflow: hidden;
     
    }

     .avater {
        display: block;
        margin: 0 auto;
        width: 100%;
        height: auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .choose-avater{
        color: #000;
      	background: #c7f0db;
      	opacity: 0.4;
      }
</style>