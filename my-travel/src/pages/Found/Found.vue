<template>
	<div class="pMood">
        <HeaderTop class="header-find" :title="'心情墙'"></HeaderTop>
        
        <div class="mood-list">
            
            <div class="upload-tip">下拉刷新</div>       
            <div class="mood-card">
            		<ul>
            		<li class="mood" v-for="(moodlist, index) in moodLists ">
            			<!--当该动态是当前登录的人的就显示x号-->
            			<div class="del" v-if="moodlist.writer.username === userInfo.username" @click="delMood(moodlist._id)">x</div>
                  <!--点击动态的头像的时候默认跳到当前动态人的主页,将当前发动态人的用户名和该动态的id传过去-->
            			<div class="avater" @click="goToPerson(moodlist.writer.username, moodlist.writer._id)">
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
            					<div class="one" :style="'backgroundImage:url('+moodlist.moodImg[0]+')'" @click="">
            						
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
</template>
<script type="text/javascript">
	
	import HeaderTop from '../../components/Header/HeaderTop.vue'
  import BScroll from 'better-scroll'
	import {getMoodsList} from '../../api'
	import {mapState} from 'vuex'
  import {MessageBox, Toast} from 'mint-ui';
	export default{
		computed:{
            ...mapState(['userInfo'])
		},
		data(){
           return{
           	moodLists:[] //心情墙上的所有动态列表
           }
		},
		components:{
		
			HeaderTop,
		
		},
		created(){
       this.getMoodList()    
		},
   
		activated(){
          this.getMoodList()
		},
		methods:{
			//请求得到动态数组
			async getMoodList(callback){
				
				var res = await getMoodsList()		
				if(res.code===0){
					this.moodLists = res.data
					console.log(this.moodLists)
            this.$nextTick(() =>{
                  this.createScroll()
              });     
				}

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
        this.scroll=new BScroll('.mood-card',{
          click:true 
        })
        console.log(this.scroll)
       
      },

      //删除自己发的动态, id是该动态的id
      delMood(id){
        console.log(id)//5d5a3d227a6012389ce1b1ce
         MessageBox.confirm('确定要删除这条朋友圈？').then(action =>{
            this.$axios.post('/api/pdMood/delMood',{id:id})
         }).then((res)=>{
            this.$router.push({path: '/comment'});//先让他去评论组件，然后又马上回来，再次刷新了页面 
            this.$router.go(-1);
            Toast(res.data.msg)
         })
       
      },

       addMessage(){
        this.$router.push('/make')
      },


      //跳到当前发动态的作者的主页中去
      goToPerson(username, id){
        if(this.userInfo.username === username){//查看发动态人是当前登录这
          //跳转到个人中心去
          this.$router.push('/profile')
        }else{
          this.$router.push({path:'/personIndex', query:{id,username}}) //根据传的参数
        }
        
      }
		}
	}
</script>
<style type="text/css" scoped>
 
  .pMood {
    height: 100%;  
  }
  .mood-list {
      position: absolute;
      top: 50px;
      bottom: 60px;
      width: 100%;
      background-color: #f4f4f4;

  }
  .mood-card {/*这个才是遮罩*/
        height: 600px;  
        background-color: #f3f5f7;
        
      }
  .upload-tip {
        position: fixed;
        top: 50px;
        text-align: center;
        height: 50px;
        font-size: 14px;
        line-height: 50px;
     
        width: 100%;
      }
  .upload {
        position: fixed;
        padding: 5px;
      }
       
  ul,li{
      	padding: 0;
      	margin: 0;
      }
 .mood {
         
        min-height: 50px;
        background-color: white;
        margin-bottom: 1px;
        padding: 10px;
        display: flex;
        position: relative;
      }
 .del {
        position: absolute;
        top: 0;
        right: 10px;
        float: right;
        color: black;
        opacity: 0.8;
        font-size: 20px;
        }
 .avater {
        height: 50px;
        width: 50px;
        margin-right: 10px;
        overflow: hidden;
            
        }
 .avater>img {
        width: 50px;
        height: 50px;
        display: block;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        }
 .content {
        display: flex;
        flex-direction: column;
        width: 85%;
        max-width: 85%;
        }
 .username {
        color: #026CFF;
        line-height: 30px;
         max-width: 75px;
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
</style>