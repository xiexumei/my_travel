<template>
	<div class="person-index">
		<HeaderTop class="app-header2" :title="username+'的主页'"></HeaderTop>
		<div class="scroll">
			<div>
				<div class="person-index-top">
					<div class="avater" :style="'backgroundImage:url(' + showUserInfo.avater +' )'" ></div>
					<div class="username">{{username}}</div>
					<div class="description">个性签名:{{showUserInfo.description}}</div>
					<!--私信的时候传进去当前主页用户的用户名和id-->
					<div class="private-letter" @click="chatWith(username,id)">私信他<img class="private-img" src="./sx.png"></div>
				</div>
				<div class="mood-wrapper">
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
		</div>
	</div>
</template>
<script type="text/javascript" >
	import HeaderTop from '../Header/HeaderTop.vue'
	import BScroll from 'better-scroll'
	export default{
		components:{
			HeaderTop
		},
		data(){
			return{
				showUserInfo:{},//这是查看的用户主页
				UserMoods:[], //这里存放的是当前这个用户发表的所有动态
				id:this.$route.query.id||'', //地址栏中带的参数id, 发表动态的用户id
				username:this.$route.query.username||'', //地址栏中的username
			}
		},
		created(){
           this.getshowUserInfo()
           this.getMoodsList()
		},

		methods:{
			//得到当前的用户信息
			getshowUserInfo(){
                console.log(this.id)
                console.log(this.username)
				this.$axios.get(`/api/showuserInfo?username=${this.username}`)
				.then(({data})=>{
					this.showUserInfo=data
				})
			},

			//得到当前用户发表的所有动态,需要带上id到动态表里面查
			getMoodsList(){
                 this.$axios.get('/api/pdMood/moodbyId?id='+this.id).then(({data})=>{
                  this.UserMoods = data
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

	      //私聊
	      chatWith(chatName, chatId){
	      	this.$router.push({path: 'chat', query:{chatName, chatId}})
	      }
		}
	}
</script>
<style type="text/css" scoped>
	.person-index{
		top: 0;
		bottom: 0;
		padding: 0;
		margin: 0;
	}
	ul, li{
		padding: 0;
		margin: 0;

	}
	.person-index-top{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 250px;
		background-size: cover;
		background-position: center;
		padding: 1px;
		background: url(./sx2.jpg) no-repeat;
		background-size: 100% 250px;
	    background-color: #ccc;
		z-index: 2;

	}
	.avater{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin: 54px auto 5px;
        background-position: center;
        background-size: cover;

	}
	 .username,.description{
		margin: 0 auto;
		text-align: center;
		color:  #ccc;
		font-size: 20px;
	}
	.private-letter{
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
	.private-img{
		width: 50px;
		height: 40px;
	}
	.description{
		font-size: 14px;
	}
	.mood-wrapper{
		margin-top: 250px;
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