<template lang="html">
  <div class="page">
    <div class="header">
      <div class="left" @click="goback()">
        <i>返回</i>
      </div>
      
      <input class="search"  type="" name="" placeholder="搜你想搜的地方，过你想要的生活">
     
      <div class="right">
       
      </div>
    </div>
   
   
    <navbar :navs="navs" :chooseItem="chooseItem"></navbar>
    <v-touch @swipeleft="onSwipeleft" @swiperight="onSwipeRight" :priority="1">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="Router" @click="start($event)"></router-view>  
        </keep-alive>
      </transition>
    </v-touch>

  </div>

</template>

<script>
import navbar from '@/components/NavBar.vue'
export default {
  data () {
    return {
      navs: ['登山','看海','农家乐','小酒馆','赏月','红色景点','名人寒舍'],
      transitionName: 'slide-right', //默认向右滑动
      chooseItem: 0
     
    }
  },
  components: {
    navbar
  },
  computed: {
    getNavState () {
      return this.$store.state.navState
    }
  },
  watch: {
    // 监听计算属性 并且它来自vuex中状态
    getNavState(state){
      var index = state + 1
      // 跳转子页面 this.$router.push()
      this.$router.push('/index/page' + index)
    },
    '$route' (to, from) {
      console.log(to.path.split('/')) 
      let toNum = to.path.split('/')[2]
      console.log(toNum)//目的子路由
      let fromNum = from.path.split('/')[2]
      console.log(fromNum)//开始子路由
      if (toNum > fromNum) {//
        this.transitionName = 'slide-left' //目的子路由>开始子路由 向左滑动
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
  created () {
    // 初始化
    this.$router.push('/index/page1')
  },
  methods: {
    //返回
    goback(){
      return this.$router.push('/home')
    },
    onSwipeleft () {
      let index = 1
      let next = ""
      if(this.$route.name != null) {
        index =  +this.$route.name[4]
        index < 8  ?  (next = "page" + (index + 1)) &&(this.chooseItem = index + 1) && (this.chooseItem = +index + 1)
       : (next="page8") && (this.chooseItem = 7)
       this.$router.push('/index/' + next)
      } 
    },
    onSwipeRight () {
      // this.$router.back(-1)
      let index = 1
      let back = ""
      if(this.$route.name != null) {
        index =  +this.$route.name[4]
        index > 1  ?  (back = "page" + (index - 1)) &&(this.chooseItem = index - 1) && (this.chooseItem = +index - 1)
       : (back="page1") && (this.chooseItem = 1)
       this.$router.push('/index/' + back)
      } else {
        this.$router.push('/index/' + "page6")
      }
      
    } 

  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  background:#1fab89
  height 50px
  .left
    display inline-block
    margin-top 10px;
    margin-right 8px;
    padding-left: 10px
  .search
    height 30px;
    width 280px;
    border-radius 10px
  
.Router
  width 100%;
  transition: all .4s ease
  // slide-right-leave-active 右滑动 左路由 
  //在过渡的结束状态 跳向下一个的页面的透明度要设置为0  过渡结束的时候都是不显示的
  // slide-right-enter中的透明度为0 代表过渡刚进入也是不显示的
  &.slide-left-enter, &.slide-right-leave-active 
    opacity 0
    // 向左滑动 其实路由向右走 然后
    transform translateX(100%)
  &.slide-left-leave-active, &.slide-right-enter
    opacity 0
    transform translateX(-100%)

</style>
