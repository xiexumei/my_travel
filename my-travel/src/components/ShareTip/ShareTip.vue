<template>
	<div class="share">
		<img class="share_img" src="./image/love.png">		
		<img class="share_img" src="./image/review.png">
		<img class="share_img" src="./image/share.png">
		
			<slot>
				<button class="share_button" @click="AddShopCart()">立即加入
				</button>
			</slot>
		<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
	</div>
</template>
<script>
    import {mapState} from 'vuex'
    import {reqAddShopCart} from '../../api'
    import AlertTip from '../AlertTip/AlertTip'
	export default{
		data(){
			return{
				alertText:"",//提示文本
			    alertShow: false///是否显示警告
			}
			

		},
        components:{
           AlertTip
        },
		computed:{
            ...mapState(['categorysCurItem'])
		},

		//点击立即加入的时候要将当前的信息存到用户的购物车信息中
		methods:{
         async AddShopCart(){
		        var {categorysCurItem} = this
		        //this.clearCart()
		        console.log(categorysCurItem)
		        //1.先要检测是否有用户登录
		        var result = await reqAddShopCart(categorysCurItem)
                console.log(result.data)
		        if(result.code !== 0){//已经登录，改变图片颜色
		      	 	           	
		      	 	this.showAlert(result.data)
		      	 }
		           

		      },
		       showAlert(alertText) {
		        this.alertShow = true
		        this.alertText = alertText
		      },

		       // 关闭警告框
		      closeTip () {
		        this.alertShow = false
		        this.alertText = ''
		      },
		      

		      //加入到购物车
		     addToCart(){
              if(!storage['user']){
              	MessageBox.alert('你尚未登录').then(action=>{
              		this.$router.push('/login')
              	})
              }else{
              	this.cartVisible = true
              }
		     },
		}
	}
</script>
<style type="text/css">
	.share{
		 position:fixed;
         z-index:100; 
         left:0; 
         right:0;
         bottom:0; 
         padding:0 10px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #fff;
		border-top: 1px solid #e8e8e8;
	}

	.share_img{
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}
    .share_button{
    	position: relative;
    	right: -80px;
    	width: 140px;
    	height: 36px;
    	border-radius: 20px;
    	background-color: #ffe837;

    }
</style>