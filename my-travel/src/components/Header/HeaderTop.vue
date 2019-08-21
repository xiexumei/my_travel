<template>
  <div class="app-header">
    <slot name="left"></slot>
    <span class="title">
        <!--<div class="icon"></div>-->
        <slot name="icon"> </slot>
        {{title}}
      </span>
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    props:
      [
        'title'
      ]
  }
</script>

<style scoped>
  .app-header {
    z-index: 999;
    background-color: #1fab89;
    position: fixed;
    height: 50px;
    width: 100%;
    line-height: 50px;
    top: 0;
    box-shadow: 0 1px 2px gainsboro;
    

  } 

  .app-header2{
    z-index: 999;
    background-color: #fafafa;
    position: fixed;
    height: 50px;
    width: 100%;
    line-height: 50px;
    top: 0;
    box-shadow: 0 1px 2px gainsboro;
    
  }
  .app-header3{
     z-index: 999;
    background-color: #718ab2;
    position: fixed;
    height: 50px;
    width: 100%;
    line-height: 50px;
    top: 0;
    box-shadow: 0 1px 2px gainsboro;
  }

  .left {
      float: left;
      padding-left: 8px;
      font-size: 26px;
    }
    .right {
      float: right;
      padding-right: 13px;
      font-size: 14px;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      
    }

    .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
        width: 30px;
        height: 32px;
        margin-right: 9px;
     
        background-size: 30px 32px
      }
</style>
