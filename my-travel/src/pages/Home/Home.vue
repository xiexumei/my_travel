<template>
	<div>
	
		<Header :locationCity="LocationCity" :weather="weather" :temperature="temperature"></Header>
		<div>
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
			
			<div class="swiper-text">
				<span class="text-line"></span>
				<span>旅行</span>
				<span class="text-line"></span>
			</div>
			
			<div class="nav_guide">
			    <router-link class="guide_item" to="">
			      <span class="item_icon">
			        <i class="iconfont icon-dingdan"></i>
			      </span>
			      <span>找景点</span>
			    </router-link>
			    <router-link  class="guide_item" to="">
			      <span class="item_icon">
			        <i class="iconfont icon-dingdan"></i>
			      </span>
			      <span>找美食</span>
			    </router-link>
			    <router-link class="guide_item" to="">
			      <span class="item_icon">
			        <i class="iconfont icon-dingdan"></i>
			      </span>
			      <span>找民宿</span>
			    </router-link>
			    <router-link class="guide_item" to="">
			      <span class="item_icon">
			        <i class="iconfont icon-dingdan"></i>
			      </span>
			      <span>听民俗</span>
			    </router-link>
			 </div>
		</div>
		
		<div class="right_nav">
		<div class="my_shopcart">
		  <img src="./shopcart.png" class="img_size"/>
		</div>
		
		<router-link class="my_map" to="/map" ref="map">
		  <img src="./map.png" class="img_size"/>
		</router-link>
		
		<router-link class="my_weather" ref="weather" to="/weather" >
		  <img src="./weather.png" class="img_size"/>
		</router-link>
		
		</div>
	
	  <Recommend :city="LocationCity"/>
	</div>
		
</template>

<script>
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
		data(){
			return{
				img:"",
				LocationCity:"正在定位",	
				weather:"",
				temperature:""
			}
		},
		 mounted(){
	        this.city()  //触发获取城市方法    
	       
	    },
		
		watch:{
	    	
	    	LocationCity:function(){ //这里需要等城市获取到之后才能获取到对应的信息
	    		var _this = this
	    		_this.$nextTick(function(){
	    			_this.getWeather()
	    		})
	    	}
	    },
	     methods:{
	        city(func){    //定义获取城市方法
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
	        	 var url = '/weat/index?format=2&cityname='+LocationCity+'&key=fb88e9750e246ccb03ffa878c6afbac6'
				  this.$axios.get(url).then((res) => {
				   
				    console.log(res.data.result)
				    this.weather = res.data.result.today.weather
				    this.temperature = res.data.result.today.temperature
				    console.log(weather)
				  }).catch((e) => {
				    console.log(e)
				  })
	       },
	       
	      
	    },
		
	}
</script>


<style type="text/css">
 .my_map,.my_shopcart,.my_weather {
 	display: inline-block;
 	width: 50px;
 	height: 50px;
 	border: 1px solid green;
 	border-radius: 50%;
 	
 }
 .my_weather{
 	position: fixed;
 	bottom: 60px;
 	right: 15px;
 }
 .my_map{
 	position: fixed;
 	bottom: 120px;
 	right: 15px;
 }
 .my_shopcart{
 	position: fixed;
 	bottom: 180px;
 	right: 15px;
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
	z-index: 20;
}
</style>