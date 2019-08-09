<template>
  <div class="footer_guide">
    <router-link class="guide_item" to="/home">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>旅行社</span>
    </router-link>
    <router-link  class="guide_item" to="/search">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link class="guide_item" to="/found">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>发现</span>
    </router-link>
    <router-link class="guide_item" to="/profile">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>

</script>

<style lang="stylus" rel="stylesheet/stylus">
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