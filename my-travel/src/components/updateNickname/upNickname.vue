<template>
  <div class="name">
    <myheader :title="'设置名称'">
      <i class="iconfont iconfanhui left" slot="left" @click="goback"></i>
      <span slot="right" class="right" @click="update">确定</span>
    </myheader>
    <div class="weui-cells__title">昵称</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input v-model="username" class="weui-input" type="text" placeholder="设置新的名称"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import myheader from '../Header/HeaderTop.vue';
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        username: ''
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    components: {
      myheader
    },
    methods: {
      goback() {
        this.$router.push({path: '/profile'});
      },
      update() {
        let newNickname = this.username;
        let oldNickname = this.userInfo.nickName;
        let username = this.userInfo.username
        this.$axios.post('/api/updateNickname', {
          newNickname,
          oldNickname,
          username

        }).then((res) => {
          if (res.data.code) {
            Toast(res.data.msg);
            return;
          }
          Toast(res.data.msg);
          this.$router.push({path: '/profile'});
        })
      }
    }
  }
</script>

<style scoped>
  .name {
    position: fixed;
    top: 50px;
    bottom: 60px;
    width: 100%;
    background-color: #fcfcfc;
  }
</style>
