<template>
  <div class="footer_guide">
    <router-link class="guide_item" to="/home" :class="{on: '/home'===$route.path}">
      <span class="item_icon">
        <i class="iconfont iconlvyou"></i>
      </span>
      <span>旅行社</span>
    </router-link>
    <router-link  class="guide_item" to="/search" :class="{on: '/search'===$route.path}">
      <span class="item_icon">
        <i class="iconfont iconsousuo5"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link class="guide_item" to="/found" :class="{on: '/found'===$route.path}">
      <span class="item_icon">
        <i class="iconfont iconpengyouquan"></i>
      </span>
      <span>发现</span>
    </router-link>
    <router-link class="guide_item" to="/profile" :class="{on: '/profile'===$route.path}">
      <span class="item_icon">
        <i class="iconfont iconwode"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 0px
      color #999999
      .item_icon
        margin-bottom 0
      &.on
        color #02a774
      span
        font-size 12px
        margin-bottom 0
        .iconfont
          font-size 22px
</style>