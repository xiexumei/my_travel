<template>
	<div class="comment div-wrap">
       <HeaderTop class="app-header3" :title="to?'回复':'评论'">
       	<i class="iconfont iconfanhui left" slot="left" @click="goback"></i>
       	
       </HeaderTop>
        <div class="weui-cells weui-cells_form content ">
	      <div class="weui-cell">
	        <div class="weui-cell__bd">
	          <textarea class="weui-textarea" v-model="content" :placeholder="to?'回复'+to:'评论...'" rows="3"></textarea>
	        </div>
	      </div>
	     
    </div>
		 <span class="send" @click="comment()">发送</span>
	</div>
</template>
<script type="text/javascript">
	import HeaderTop from '../Header/HeaderTop.vue'
	import {mapState} from 'vuex'
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return{
				to:this.$route.query.to || '', //to是被回复的人
			    id:this.$route.query.id || '', //动态的id
		     	writer:this.$route.query.writer || '',
		    	content:''//评论的内容
			}
			

		},
		computed:{
          ...mapState(['userInfo'])
		},
		components:{
			HeaderTop
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},

			comment(){
				if(!this.content){
					Toast('内容不能为空')
					return
				}

				this.$axios.post('/api/comment/comment',{
					writer: this.writer, //发动态的作者
					from: this.userInfo.username, //回复人
					to: this.to, //被回复的用户
					Mood:this.id, //动态的id
					content: this.content //评论内容
				}).then((rs)=>{
					console.log(111)

					if(this.writer === this.userInfo.username && this.to === this.userInfo.username){
						//返回到上一个路由
						this.$router.go(-1)
						Toast(rs.data.msg)
						return
					}

					this.$router.go(-1)
					Toast(rs.data.msg)


				})
			}
		}
	}
</script>
<style type="text/css" scoped>
.comment{
	height: 665px;
	padding-top: 50px;
	background: url(comment.jpg) no-repeat;
	
}
.content{
	width: 100%;
	opacity: 0.6;
}	

.send{
	display: inline-block;

	width: 200px;
	height: 35px;
	margin-top: 20px;
	margin-left: 5px;
	text-align: center;
	color: #ccc;
	background-color: #226b80;
	opacity: 0.5;

}
</style>