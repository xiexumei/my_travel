<template>
  <div class="profile">
    <HearderTop class="app-header2" :title="'我的'">
         <i class="iconfont iconfanhui left" slot="left" @click="goback"></i>
    </HearderTop>
    <div class="p-box">
      <div class="p-content">
        <div class="weui-cells">
          <router-link tag="div" to="/updateavater" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>头像</p>
            </div>
            <div class="weui-cell__ft">
              <div class="avater">
                <img :src="userInfo.avater"/>
              </div>
            </div>
          </router-link>
           <router-link tag="div"  class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>用户名</p>
            </div>
            <div class="weui-cell__ft">{{userInfo.username}}</div>
          </router-link>
          <router-link tag="div" to="/updatenickname" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>昵称</p>
            </div>
            <div class="weui-cell__ft">{{userInfo.nickName}}</div>
          </router-link>
          <router-link  to="/updatesign" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>签名</p>
            </div>
            <div class="weui-cell__ft">{{userInfo.description}}</div>
          </router-link>
        </div>
        <a style="margin: 20px" class="weui-btn weui-btn_warn btn-login logout" @click="logout()">退出登录</a>
      </div>
     
    </div>
  </div>
</template>

<script>
 
  import { MessageBox } from 'mint-ui';
  import HearderTop from '../../components/Header/HeaderTop.vue'
  import {mapState} from 'vuex'
  export default {
    computed:{
       ...mapState(['userInfo'])
    },
    components:{
    	HearderTop
    },
    methods:{
       logout(){
        MessageBox.confirm('是否要退出').then(action => {
               this.$store.dispatch('logout')
               this.$router.push('/profile')
               Toast('登出完成')
          });
       },
       goback(){

        return this.$router.go(-1)
       }
    }
  }
</script>

<style scoped>
  .profile{
    height: 665px;
    background: url(./1.jpg) no-repeat;
    background-size: 375px 700px;
  }
  .p-box {
    position: absolute;
    top: 40px;
    bottom: 60px;
    width: 100%;
   
    
  }
  .iconfont{
    font-size: 22px;
  }
  .avater {
      background-color: black;
      min-width: 50px;
      height: 50px;
      width: 50px;
      margin-right: 10px;
      overflow: hidden;
      
    }
  .avater img{

        width: 100%;
        display: block;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
     
  }

  .logout{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0.6;
  }
</style>
