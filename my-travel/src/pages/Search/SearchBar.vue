<template>
  <div class="div-wrap">
    <!--搜索模块-->
    <div class="weui-cell search-wrap">
      <div class="weui-cell__bd">     
        <img class="search-icon" @click="getSearchList()" src="./search.png">
    
        <img v-show="isShow" @click="clearText" src="./del.png" class="iconfont icon-chucuo">
        <span class="back" @click="$router.go(-1)">取消</span>
        <form action='' onsubmit="return false;">
        <input v-model="searchText" ref="input" class="weui-input" type="search" autofocus="autofocus"
               placeholder="搜索" rel="input">
        </form>
      </div>
    </div>
   <div class="show-search">
      <!--如果没有查到相关的内容-->
    <div class="no-res" v-show="resNo">换个标题试试，暂时没有相关内容哦。</div>
    <!--如果查询到了用户模块-->
    <div v-if="user" class="text">用户</div>
    <div v-if="user" class="user" @click="goToPersonIndex(user.username,user._id)">
      <div class="left">
        <div :style="'backgroundImage:url(' + user.avater +' )'" class="avater"></div>
      </div>
      <div class="content">
        <div class="username">
          {{user.username}}
        </div>
        <div class="signature">
          {{user.description}}
        </div>
      </div>
    </div>
    <!--如果查询到了动态-->
    <div ref="mood" class="mood">
     <div v-if="user" class="text">心情</div>
      <div  v-if="moodList.length" :data="moodList" class="div-wrap">
        <div>
          <ul class="mood-card">
            <li class="mood" v-for="(list,index) in moodList">
              <div class="del" @click="del(list._id)" v-if="list.writer.username === userInfo.username">&times;</div>
              <div class="avater">
                <img :src="list.writer.avater"/>
              </div>
              <div class="content">
                <div class="username">{{list.writer.username}}</div>
                <div class="mood-content">{{list.content}}</div>
                <div style="width: 100%" v-if="list.moodImg.length === 1" class="one-box">
                  <img class="one" :loop="false" @click="showimg(list.moodImg,0)" :src="list.moodImg[0]" alt="">
                </div>
                <div v-if="list.moodImg.length > 1" class="mood-img">
                  <div ref="items" :class="list.moodImg.length === 4?'four':'nine'"
                       v-for="(item,index) in list.moodImg" :style="'backgroundImage:url(' + item +' )'"></div>
                </div>
                <div class="footer">
                  <div class="add-time">{{list.addTime|fomatTime}}</div>
                  <div @click="comment(list._id,list.writer.username)" class="comments">
                    评论
                  </div>
                </div>
                <div v-if="list.comments.length" class="comment-lists">
                  <div class="comment">
                    <div @click="commentTo(list._id,comment.from,list.writer.username)"
                         v-for="(comment,index) in list.comments" :key="index" class="comment-content">
                      <div class="cbox" v-if="comment.to">
                        <span class="from">{{comment.from}}</span>
                        <span> 回复 </span>
                        <span class="to">{{comment.to}}</span>:
                        <span class="ccontent"> {{comment.content}}</span>
                      </div>
                      <div class="cbox" v-else>
                        <span class="from">{{comment.from}}</span>:
                        <span class="ccontent"> {{comment.content}}</span>
                      </div>
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
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex';
 
  import {updateSearch} from '../../common/js/localStorage'

  export default {
  
    data() {
      return {
        searchText: this.$route.query.item||'', //输入的文字，看看是否是从历史记录里面点击进来的
        isShow: false,//当有输入内容的时候才显示删除号
        resNo:false ,//标识是否查询到了结果
        moodList: [], //将查到的动态数组放到里面
        foodList:[],//存储查到的食物数组
        user:'', //存储查到的用户
       
      }
    },

     computed: {
      ...mapState([
        'userInfo'
      ])
    },

     watch: {
      searchText() {
        this._isShow();
      }
    },


    created(){
      if (this.$route.query.item){
        this.getSearchList();
        this.isShow = true;
      }
    },
    updated() {
      this.$nextTick(() => {
        //只在当前页更新
        if (this.$route.path === '/searchbar') {
          
        }
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.input.focus();
        this.search();
        this.initImg();
        if (this.$route.query.item){
          this.$refs.input.blur();
        }
      })
    },
   
    
    methods: {
      ...mapMutations([
        'set_imgdata'
      ]),
      //搜索函数
      getSearchList(){
        updateSearch(this.searchText);//将当前的文字存入搜索列表

        this.$axios.get(`/api/search?searchText=${this.searchText}`).then((res) => {
         this.user = res.data.user;
          this.moodList = res.data.moodList;

         if (this.user||this.moodList.length){
            this.resNo = false;
          }else {
            this.resNo = true;
          }
          console.log(res)
        })
      },
     //如果查询到了有用户，跳到用户的主页
      goToPersonIndex(name, id) {
        this.$router.push({path: '/personindex', query: {id, name}});
      },

    //点击评论的时候跳转到评论
    //评论
      comment(id,writer){//moodlist._id, moodlist.writer.username
        this.$router.push({path:'/comment', query:{id, writer}})
      },

      //回复
      commentTo(id, to, writer){//id是动态id, to是被回复的人，writer是发表动态的人
        console.log(id, to, writer)
        this.$router.push({path:'/comment', query:{id, to, writer}})

      },

      //监听搜索函数
      search() {
        this.$refs.input.addEventListener('keypress',(e)=>{
          let keycode = e.keyCode;
          if(keycode == '13') {
            this.getSearchList();
          }
        });
      },
      
      _isShow() {
        if (this.searchText) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },

      //清空搜索
      clearText() {
        this.searchText = '';
      }
    },
   
  }
</script>

<style scoped>
  .div-wrap {
    top: 0;
    bottom: 0;
    padding: 0;
  }
  .search-wrap {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5;
      width: 100%;
      box-shadow: 1px 2px 2px gainsboro;
      background-color: #1fab89;;
     
     }
  .icon-chucuo {
        position: absolute;
        right: 12%;
        height: 20px;
        height: 20px;
      }
  .search-icon{
        position: absolute;
        left: 8px;
        top: 20px;
        width: 20px;
        height: 20px;
      }
  .show-search{
    margin-left: 0;
    margin-top: 50px;
  }
  .back{
    position: absolute;
    top: 20px;
    right: 8px;
    color: #fafccb;
  }
  .weui-input {
        background-color: white;
        border-radius: 5px;
        width: 85%;
        display: block;
        padding: 0 25px 0 5px;
        margin: 0 auto;
        font-size: 12px;
        line-height: 25px;
        height: 25px;
      }
    
    .no-res{
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      margin: 200px 0;
    }
    .text {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-weight: bold;
      border-bottom: gainsboro 1px solid;
      border-top: gainsboro 1px solid;
      background-color: white;
    }
    .user {
      display: flex;
      padding: 10px;
      background-color: white;
      box-shadow: 1px 2px 1px gainsboro;
      margin-bottom: 20px;
    }
    .left {
        float: left;
        height: 55px;
        width: 20%;
        text-align: center;
        line-height: 55px;
        overflow: hidden;
      }
    .avater {
          margin: 0 auto;
          width: 55px;
          height: 55px;
          background: no-repeat 50%;
          background-size: cover;
          border-radius: 50%;
        }
      
    .content {
        position: relative;
        padding-left: 0.5rem;
        font-size: 18px;
        font-weight: bold;
        line-height: 55px;
        width: 80%;
        display: flex;
        flex-direction: column;
      }
     .username {
          font-size: 18px;
          line-height: 30px;
        }
     .signature {
          font-weight: normal;
          font-size: 16px;
          line-height: 25px;
          color: grey;
          position: relative;
          overflow: hidden;
          width: 80%;
          text-overflow: ellipsis;
        }
      
    .div-wrapper{
      padding: 0;
      margin: 0;
    }
    .mood {
      background-color: white;
      height: 100%;
      overflow: hidden;
    }
      .mood-card {
        overflow: hidden;
        height: 100%;
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
          .mood .avater {
            background-color: black;
            min-width: 50px;
            height: 50px;
            width: 50px;
            margin-right: 10px;
            overflow: hidden;
          }
           .avater img {
              width: 100%;
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
            }
            .footer {
              display: flex;
              justify-content: space-between;
              color: grey;
              font-size: 14px;
            }
              .comments {
                color: #026CFF;
                padding-right: 1rem;
              }
            
            .comment-lists {
              padding: 5px;
              margin-top: 0.5em;
              min-height: 25px;
              width: 95%;
              background-color: #f6f6f6;
            }
              .comment-content {
                
              }
                .cbox {
                  word-wrap: break-word;
              }
               .ccontent {
                    word-break: break-all;
                    word-wrap: break-word;
                }
              .from, .to {
                    color: #026CFF;
                  }
              .reply-lists {
                  margin-left: 1rem;
                }
              .from, .to {
                    color: #026CFF;
                  }
                
            
          
          .one {
            display: block;
            margin: 5px 0;
            width: 80%;
            height: auto;
            background: no-repeat 50%;
            background-size: cover;
          }
          .mood-img {
            width: 80%;
            display: flex;
            flex-wrap: wrap;
          }
            .four {
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
