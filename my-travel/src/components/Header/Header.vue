<template>
	<header class="header">
		<div  name="location" class="header_location" @click="searchCity()">
			<div>{{position.city||locationCity}} <i>8</i></div>
		
		</div>
		<a class="header_title">
			<span class="header_title_text ellipsis">倾travel</span>
		</a>
		<div name="header_weather" class="header_weather">
			<span>{{temperature}}</span>
			<span>{{weather}}</span>
		</div>
		<keep-alive>
		<router-view></router-view>
	    </keep-alive>
	</header>
	
</template>
<script type="text/javascript">
 import BMap from 'BMap'	
 import {reqWeather} from '../../api'
 import {mapState} from 'vuex'
 export default{
 	props:{
 		locationCity: String,
 		temperature: String,
 		weather: String
 	},
  computed:{
   ...mapState(['position'])
  },
  methods:{
    searchCity(){
      return this.$router.push('/citys')
    }
  }
 	
 }
 
 /*小问题：
  需要等城市定位获取到之后才能获取天气信息： 已解决
 多个代理配置问题： 已解决
 var {LocationCity, weather} = this
 weather = res.data.result.today.temperature//这样引入这样赋值无效

  * */
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped >
  .header
    background-color #1fab89
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_location
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 50%
      height 50%
      color #fff
      .icon-sousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_weather
      font-size 14px
      color #fff
      position absolute
      right 5px
      top 50%
      transform translateY(-50%)
    
</style>