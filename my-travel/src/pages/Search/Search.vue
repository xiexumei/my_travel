<template>
  <div class="div-wrap search">
    <myheader :title="'搜索'"> </myheader>
    <div class="weui-cell search-wrap">
      <div class="weui-cell__bd">
        <i class="iconfont icon-sousuo"></i>
        <!--点击输入框的时候跳转到搜索-->
        <input @click="$router.push('/searchbar')" ref="input" class="weui-input" type="text" placeholder="找找看"/>
      </div>
    </div>
    <!--历史记录列表-->
    <div v-if="searchList.length>0" class="history">
      <ul class="list">
        <li @click="$router.push({path:'/searchbar',query: {item}})" v-for="(item,index) in searchList" :key="index" class="list-item">
          {{item}}
          <i @click.stop="_deleteOne(index)" class="iconfont icon-chucuo"></i>
        </li>
      </ul>
      <div @click="_clear" class="clear">清除所有记录</div>
    </div>
  </div>
</template>

<script>
  import myheader from '../../components/Header/HeaderTop.vue';
  import {deleteOne,clear} from '../../common/js/localStorage'

  export default {
    created(){
      this.getList();
    },
    components: {
      myheader,
    },
    data(){
      return {
        searchList:[]
      }
    },
    methods:{
      getList(){//得到当前locallStorage中存储的搜索列表
        if (window.localStorage.search){
          this.searchList = JSON.parse(window.localStorage.search);
        }
      },
      _deleteOne(index){
        deleteOne(index);
        this.getList();
      },
      _clear(){
        clear();
        this.getList();
      }
    }
  }
</script>

<style  scoped>
  .div-wrap{
    height: 630px;
    background: url(./s2.png) no-repeat;
    background-size: 375px 670px;
  }
  .search-wrap{
    background-color: #1fab89;
    box-shadow: 1px 2px 2px gainsboro;
    margin-top: 50px;
  }
  .icon-sousuo{
      position: absolute;
      left: 8px;
    }
  .weui-input{
      background-color: white;
      border-radius: 5px;
      width: 90%;
      height: 25px;
      display: block;
      padding: 0 5px;
      margin-left: 5%;
    }
  
  .history{
    margin:0;
    background-color: #fff;
    opacity: 0.8;
    padding: 0;
  }
  .history ul,li{
    margin: 0;
    padding: 0
  }
  
  .list-item{
        background-color: white;
        padding: 5px 50px 5px 25px;
        font-size: 16px;
        border-bottom: 1px gainsboro solid;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 30px;
        line-height: 30px;
      
      
    }
  .list-item i{
          position: absolute;
          right: 15px;
          top:5px;
        }
  .clear{
      text-align: center;
      color: gray;
      background-color: white;
      height: 45px;
      line-height: 45px;
      box-shadow: 1px 2px 2px gainsboro;
    }
  

</style>
