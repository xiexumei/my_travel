<template>
	<div>
		<div v-show="userInfo._id">
			 <div class="me-header">
			  <div class="header-bg">
			  	<div class="me-header-config">
				<router-link to="/profiledetail" class="config">
					<img style="width:20px; height: 20px; " src="./set.png">
				</router-link>
			
			</div>
			<div class="me-header-follwer">
				<span class="my-follow left">
					<span>我的关注</span>
					<span>0</span>
				</span>
				<span>
					
						<img class="avator" :src="userInfo.avater" />
					
					
				</span>
				<span class="follow-me right">
					<span>我关注的</span>
					<span>0</span>
				</span>

			</div>
			<div class="me-header-name">
				<p>{{userInfo.nickName}}</p>
				<p>这个人很懒，什么也没留下</p>
			</div>
			  </div>
			<div class="my-collection">
				<span>我的收藏</span>
				<ul class="collections">
					<li>收藏</li>
					<li>评论</li>
					<li>购物</li>
					<li>足迹</li>
				</ul>
			</div>
		</div>
		<div>
			<div class="my-moment"></div>
			<div v-if="UserMoods.length==0" class="no-moment"></div>
			<div v-else class="mood-wrapper">
					<ul>
						<li class="mood" v-for="(moodlist,index) in UserMoods">
							<div class="del"></div>
							<div class="mood-avater">
								<img :src="moodlist.writer.avater">
							</div>
								<div class="content">
		            				<div class="username">{{moodlist.writer.nickName}}</div>
		            				<!--mood-content里面存放文字-->
		            				<div class="mood-content">{{moodlist.content}}</div>

		            				<!--有文字有图片的动态<div class="one-box">
		            					<div class="one"></div>
		            				</div>-->
		            				<!--只含有一张图片的动态:将图片渲染成背景，双击时有预览效果-->
		            				<div style="width: 100%" v-if="moodlist.moodImg.length===1" class="one-box">
		            					<div class="one" :style="'backgroundImage:url('+moodlist.moodImg[0]+')'" @click="showimg(moodlist.moodImg,0)">
		            						
		            					</div>
		            				</div>
		            				<!--当图片超过1张的时候:分为四张显示和九张显示的效果-->
		            				<div v-if="moodlist.moodImg.length>1" class="mood-img">
		            					<div ref="items" :class="moodlist.moodImg.length===4? 'four':'nine'" v-for="(item,index) in moodlist.moodImg " :key="index" :style="'backgroundImage:url(' +item +')'">
		            						
		            					</div>
		            					
		            				</div>
		            				<div class="footer">
		            				   <div class="add-time">{{moodlist.addTime | fomatTime}}</div>
		            				   <div class="comments" @click="comment(moodlist._id, moodlist.writer.username)">评论</div>
		            		    </div>
		                     <div class="comments-lists" v-if="moodlist.comments.length">
		                    <div class="comment">
		                      <div class="comment-content" v-for="(comment,index) in moodlist.comments" :key="index" @click="commentTo(moodlist._id, comment.from,moodlist.writer.username)"><!--点击评论列表的时候此时是回复列表:当前动态_id, from是评论这条动态的人，回复人，动态作者-->
		                        <!--如果to存在那么此时是回复列表-->
		                        <div class="cbox" v-if="comment.to">
		                          <span class="from">{{comment.from}}</span>
		                          <span>回复</span>
		                          <span class="to">{{comment.to}}</span>
		                          <span class="cbox-content">{{comment.content}}</span>
		                        </div>
		                        <!--to不存在是评论列表-->
		                        <div class="cbox" v-else>
		                          <!--评论人-->
		                          <span class="from">{{comment.from}}</span>:
		                          <span class="cbox-content">{{comment.content}}</span>
		                        </div>
		                      <!--  <div class="cbox">
		                          <span class="from"></span>
		                          <span class="content"></span>
		                        </div>-->
		                      </div>
		                    </div>
		                  </div>
            			</div>
						</li>
					</ul>
				</div>
		</div>
		

		<div class="add" @click="addMessage()">
            <img class="icon" src="./icon.png">
        </div>
		</div>
		
        <unLogin v-show="!userInfo._id" />
	</div>
</template>
<script type="text/javascript">
  import BScroll from 'better-scroll'
  import {mapState, mapMutations} from 'vuex'
  import { MessageBox, Toast } from 'mint-ui'
  import {reqUserInfo} from '../../api'
  import HeaderTop from '../../components/Header/Header.vue'
  import unLogin from '../../components/UnLogin/unlogin.vue'
  export default {
    data(){
      return{
       UserMoods:[]
      }
      
    },
    components:{
    	unLogin
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created(){
    	//每次渲染后重新请求一次用户信息
       this.$store.dispatch('getUserInfo')
       this.getUserMood()
    },
    methods: {
     	
        
      addMessage(){
      	this.$router.push('/make')
      },

      //获取到当前用户的动态
      getUserMood(){
      	var id = this.userInfo._id
      	this.$axios.get('/api/pdMood/moodbyId?id='+id).then((res)=>{
      		this.UserMoods = res.data
      	}).then(()=>{

      		
            this.$nextTick(()=>{
                 		this.createScroll()
            })
                 
      	})
      },

      		//评论
	      comment(id,writer){//moodlist._id, moodlist.writer.username
	        this.$router.push({path:'/comment', query:{id, writer}})
	      },

	      //回复
	      commentTo(id, to, writer){//id是动态id, to是被回复的人，writer是发表动态的人
	        console.log(id, to, writer)
	        this.$router.push({path:'/comment', query:{id, to, writer}})

	      },

       //建一个滚动列表
	      createScroll(){
	        //左边的滚动条
	        console.log(111)
	        this.scroll=new BScroll('.mood-wrapper',{
	          click:true 
	        })
	        console.log(this.scroll)
	       
	      },
     
    },


}
</script>
<style type="text/css" scoped>
    ul,li{
    	margin: 0;
    	padding: 0;
    }
	.me-header{
		width: 100%;
		height: 310px;
		border:1px solid #000;
		
	}
	.me-header-config{
		height: 22px;
	}
	.header-bg{
		height: 200px;
		background: url(p-bg.jpg) no-repeat;
		background-size: 375px 200px;
	}
	.config{
		position: absolute;
		top: 15px;
		left: 15px;
		display: inline-block;
		width: 20px;
		height: 20px;
		
		border-radius: 50%;

	}
	.message{
		position: absolute;
		top: 20px;
		right: 20px;
		width: 80px;
		height: 20px;
		background-color: #fff;
		border-radius: 50%;
	}
	.me-header-follwer{
		position: relative;
		margin-top: 20px;
		width: 100%;
		height: 100px;
		text-align: center;
		line-height: 100px;
	}
	.my-follow,.follow-me{

		display: inline-block;
		width: 100px;
		height: 40px;
		
	}
	.my-follow .left{
		position: absolute;
		top: 100px;
		left: 30px;
	}
	.avator{
		display: inline-block;
		width: 80px;
		height: 80px;
		background-color: #fff;
		border: 1px solid #fff;
		border-radius: 50%;
	}
	.me-header-name{
		padding:0;
		text-align: center;
	}
	.me-header-name p{
		color: #f9f6f2;
		padding: 0;
		margin: 0;
	}

	.my-collection{

		height: 200px;
		background-color: #fff;

	}
	.collections{
		width: 350px;
		margin: 10px auto;
	}
	.collections li{
      display: inline-block;
      width: 60px;
      height: 60px;
      background-color: #ccc;
      opacity: 0.5;
	}
	.my-moment{
		height: 80px;
		background: url(m5.png) no-repeat;
		background-size: 375px 80px;
		

	}
	.no-moment{
		height: 200px;
		background: url(./m3.png) no-repeat;
		background-size: 375px 200px;
	}

	.add{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 0 10px 0 #666;
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 99;
            background: url(./add.jpg);
           
        }
         
         .icon{
                width: 40px;
                height: 40px;
             
            }


       .mood-wrapper{
		margin-top: 50px;
		overflow: hidden;
		height: 670px;
	}
	.mood{
		min-height: 50px;
		background-color: #f9f6f2;
		margin-bottom: 1px;
		padding: 10px;
		display: flex;
		position: relative;
	}
	.mood .del{
        position: absolute;
        top: 0;
        right: 10px;
        float: right;
        color: black;
        opacity: 0.8;
        font-size: 20px;
	}
	.mood-avater{
		background-color: black;
		min-width: 50px;
		height: 50px;
		width: 50px;
		margin-right: 10px;
		overflow: hidden;
	}
	.mood-avater>img{
		width: 100%;
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.mood-content{
		display: flex;
		flex-direction: column;
		width: 85%;
		max-width: 85%;

	}

	.content {
        display: flex;
        flex-direction: column;
        width: 85%;
        max-width: 85%;
        }
.content .username {
        color: #026CFF;
        line-height: 30px;
        max-width: 200px;
        margin-left: 2px;
        }
      
.footer {
             
        display: flex;
        justify-content: space-between;
        color: grey;
        font-size: 14px;
              
            }
.footer .comments {
                color: #026CFF;
                padding-right: 1rem;
              }
.comments-lists {
              padding: 5px;
              margin-top: 0.5em;
              min-height: 25px;
              width: 95%;
              background-color: #f6f6f6;
          }
             

.from, .to {
                    color: #026CFF;
                  }
                

                
  .reply-lists {
                  margin-left: 1rem;
                  
                }

            
  .one {
            display: block;
            margin: 5px 0;
            width: 250px;
            height: 250px;
            background: no-repeat 50%;
            background-size: cover;
          }
  .mood-img{
            width: 80%;
            display: flex;
            flex-wrap: wrap;
           }
  .mood-img .four {
              margin-right: 3px;
              margin-bottom: 3px;
              width: 48.5%;
              height: 105px;
              background: no-repeat 50%;
              background-size: cover;
             
            }
  .nine {
              margin-right: 3px;
              margin-bottom: 3px;
              width: 31.5%;
              height: 79px;
              background: no-repeat 50%;
              background-size: cover;
            }

</style>