<template>
	<div>
	
		<Header class="home-header" :locationCity="LocationCity" :weather="weather" :temperature="temperature"></Header>
		<div class="nav_height">
			<div class="swiper-height">
				<mt-swipe :auto="4000" style="width:100%; height: 160px;" class="swiper-wrapper">
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./image/lunbo1.png" />
			  </mt-swipe-item>
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./image/lunbo2.png" />
			  </mt-swipe-item>
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./image/lunbo3.png" />
			  </mt-swipe-item>
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./image/lunbo4.png" />
			  </mt-swipe-item>
			</mt-swipe>
			</div>
			
			<div class="navbar">
				<div class="swiper-text">
				<span class="text-line"></span>
				<span>旅行</span>
				<span class="text-line"></span>
			    </div>
			<div class="nav_wrapper">
				<div class="nav_guide">
			    <router-link class="guide_item" to="/index">
			      <span class="item_icon">
			        <i class="iconfont iconjingdian"></i>
			      </span>
			      <span>找景点</span>
			    </router-link>
			    <router-link  class="guide_item" to="/food">
			      <span class="item_icon">
			        <i class="iconfont iconhuanqiumeishi"></i>
			      </span>
			      <span>找美食</span>
			    </router-link>
			    <router-link class="guide_item" to="">
			      <span class="item_icon">
			        <i class="iconfont iconjiudian"></i>
			      </span>
			      <span>找民宿</span>
			    </router-link>
			    <router-link class="guide_item" to="/found">
			      <span class="item_icon">
			        <i class="iconfont iconyouji"></i>
			      </span>
			      <span>找游记</span>
			    </router-link>
			 </div>
			</div>
			
			</div>
			
		</div>
		
		<div class="right_nav">
			<div class="right_nav_item">
			  <img src="./shopcart.png" class="img_size"/>
			  <div class="num"></div>
			</div>
			
			<router-link class="right_nav_item" to="/citys" ref="map" @click="console.log(111)">
			  <img src="./map.png" class="img_size"/>
			</router-link>
			
			<router-link class="right_nav_item" ref="weather" to="/weather" >
			  <img src="./weather.png" class="img_size"/>
			</router-link>
		
		</div>
	 
	  	 <Recommend :city="LocationCity"/>
	   <keep-alive>
	   	<router-view></router-view>
	   </keep-alive>
	 
	</div>
		
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	import Header from '../../components/Header/Header'
	import Weather from '../../components/Weather/Weather'
	import Recommend from '../Recommend/Recommend2'
    import BMap from 'BMap'
	import {reqRecommd} from '../../api'
	import Swiper from 'swiper'
	import "mint-ui/lib/style.css"
	export default{
		
		components:{
			Header,
			Weather,
			Recommend,
			
			
		},
		computed:{
            ...mapState(['userInfo','position']),
          
		},

		data(){
			return{
				img:"",
				LocationCity:"正在定位",	
				weather:"",
				temperature:"",
				
			}
		},
		mounted() {
          this.city()
          //this.$store.dispatch('getCurrentPosition', 'AMap')
        },
		activated(){
          // this.$store.dispatch('getCurrentPosition', 'AMap')
		},
		watch:{
	    	
	    	LocationCity:function(){ //这里需要等城市获取到之后才能获取到对应的信息
	    		var _this = this
	    		_this.$nextTick(function(){
	    			_this.getWeather()
	    			_this.$store.dispatch('recordCity',_this.LocationCity)//之前一直存不了当前城市到vuex中，一定要在获取到当前城市之后存
	    		})
	    	}
	    },
	   
	     methods:{
	       city(func){    //利用百度地图定义获取城市方法
	            const geolocation = new BMap.Geolocation();
	            var _this = this
	            geolocation.getCurrentPosition(function getinfo(position){
	                let city = position.address.city;             //获取城市信息
	                let province = position.address.province;    //获取省份信息
	                _this.LocationCity = city
	                console.log(position)
	                console.log(_this.LocationCity)
	                
	            }, function(e) {
	                _this.LocationCity = "定位失败"
	            }, {provider: 'baidu'});   
	           
	        },
	        
	        //获取天气数据
	        getWeather(){
	        	var {LocationCity} = this
	        	 var url = '/weat/index?format=2&cityname='+LocationCity.substring(0,2)+'&key=fb88e9750e246ccb03ffa878c6afbac6'
				  this.$axios.get(url).then((res) => {
				    console.log(111)
				    console.log(res.data.result)
				    this.weather = res.data.result.today.weather
				    this.temperature = res.data.result.today.temperature
				   var weather = res.data.result

				    //天气获取成功之后存到vuex中管理
				 //   this.$store.dispatch('recordWeather', {weather})
				    console.log(weather)
				  }).catch((e) => {
				    console.log(e)
				  })
	       },
	       
	      
	    },
		
	}
</script>


<style type="text/css" scoped>

.my_map,.my_shopcart,.my_weather {
 	display: inline-block;
 	width: 50px;
 	height: 50px;
 	border: 1px solid green;
 	border-radius: 50%;
 	
 }
 .swiper-height{
 	height: 180px;
 }
 .img_size{
 	widows: 45px;
 	height: 45px;;
 } 
 
 .active{
 	background-color: red;
 }
 .section{
  margin-top: 50px;
 }
 .section_bg{
 	width:375px;
 	height: 150px;
 }
 .iconfont{
 	font-size: 26px;
 }
 .swiper-wrapper{
 	margin-top: 50px;
 	
 }          
.swiper-img{
	 display: inline-block;
     width: 100%;
     height: 150px;
}
.swiper-text{
	text-align: center;
	margin-top: -10px;
	font-style: oblique;
	font-size: 20px;
}
                
 .text-line{
 	display: inline-block;
 	width: 120px;
 	height: 1px;
 	background: #ccc;
 }  
 
 .nav_guide{
 	background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
 }
 .nav_wrapper{
 	height: 50px;
 }
 .guide_item{
 	  display: flex;
      flex: 1;
      text-align: center;
      flex-direction: column;
      align-items: center;
      margin: 0px;
      color: #999999;
 }
 
 .item_icon{
 	 margin-bottom: 0;
 }

.item_img{
	width:50px;
	height: 50px;
} 

.right_nav{
	position: fixed;
    right: 5px;
    bottom: 20px;
	width: 60px;
	height: 220px;
	z-index: 20;
	
}

.right_nav_item{
	display: inline-block;
	width: 50px;
	height: 50px;
	border:1px solid green;
	border-radius: 50%;
	margin-top: 10px;
}

/*购物车小球样式*/
.num{
	position: absolute;
	top: 2px;
	right: 2px;
	width: 24px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)

}
.nav_height{
	height: 280px;
}

</style>