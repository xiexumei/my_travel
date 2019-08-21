<template>
<div class="backg">
	<div class="go_back" @click="$router.go(-1)"><返回</div>
	 <div class="today">
	 	<div class="current_city">{{city}}</div>
	 	<div class="current_content">{{temperature1}}</div>
	 	<div class="current_wind">{{wind}}</div>
	 </div>
	 <div class="pred">
	 	<span class="left">预报</span>
	 	<span class="right">今天：<span class="week">{{todate}}/{{week}}</span></span>
	 </div>
	 <ve-line  :data="chartData" :settings="chartSettings"  :extend="extend"> </ve-line>
</div>

</template>

<script>
	export default {
    data: function () {
       this.chartSettings = {
        metrics: ['最高温度', '最低温度'],
        dimension: ['日期']
      },
      this.extend = {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      }
      return {
        chartData: {
          columns: ['日期', '最高温度', '最低温度'],
          rows: [
            { '日期': '星期一', '最高温度': 20, '最低温度': 0 },
            { '日期': '星期二', '最高温度': 30, '最低温度': 10 },
            { '日期': '星期三', '最高温度': 15, '最低温度': 13},
            { '日期': '星期四', '最高温度': 16, '最低温度': 15},
            { '日期': '星期五', '最高温度': 25, '最低温度': 2},
            { '日期': '星期六', '最高温度': 40, '最低温度': 1},
            { '日期': '星期日', '最高温度': 40, '最低温度': 1}
          ]
        },
        weather1:"",
        temperature1:"",
        futureWeather:[],
        wind:"",
        week:"",
        todate:"",
        city:""
      }
    },
     watch:{
	    	
	    	futureWeather:function(){ //这里需要等城市获取到之后才能获取到对应的信息
	    		var _this = this
	    		_this.$nextTick(function(){
	    			_this.getFutureWeather()
	    		})
	    	}
	    },
    mounted(){
    	this.getWeather()
    	
    },
    
    
    methods:{
    	 //获取天气数据
	        getWeather(){
	            	
	       	 var url = '/weat/index?format=2&cityname='+'厦门'+'&key=fb88e9750e246ccb03ffa878c6afbac6'
				  this.$axios.get(url).then((res) => {
				    
				    var result = res.data.result
				    console.log(result)
				    this.weather1 = result.today.weather
				    this.temperature1 = result.today.temperature
				    this.wind = result.today.wind
				    this.futureWeather = result.future
				    this.week = result.today.week
				    this.todate = result.today.date_y
				    this.city = result.today.city
				//   console.log(res.data.result.future)
				  }).catch((e) => {
				    console.log(e)
				  })
	       },
	       
	       //分离出最高温度和最低温度
	       getFutureWeather(){
	       	console.log(111)
	       	var that = this
	       	var minTemperature = []
	       	var maxTemperature = []
	       	console.log(that.futureWeather)
	       	that.futureWeather.forEach(function(item, index){
	       		//console.log(item.temperature)
	       		//取出最低气温和最高气温
	       		var temperature = item.temperature
	       		var i = temperature.indexOf('℃')
	       		var j = temperature.lastIndexOf('℃')
	       		var min = temperature.substring(0,i)
	       		var max = temperature.substring(j-2,j)
	       		minTemperature.push(min)
	       		maxTemperature.push(max)
	       	})
	       	
	       	that.chartData.rows.forEach(function(item, index){
	       		
	       		
	       		item['最高温度']=maxTemperature[index]
	       		item['最低温度']=minTemperature[index]
	       	})
	       	
	       	
	       }
	       
	       //将取出来的最高温度和最低温度替换
	       
	       
	       
    }
  }
</script>

<style scoped>
	.today{
		width:100%;
		height: 200px;
		text-align: center;
		padding-top: 30px;
		color: #FFFFFF;
		font-size: 25px;
	}
	.backg{
		width: 375px;
		height: 667px;
	}
	.current_wind{
		font-size: 16px;
	}
	
	.pred{
	    height: 50px;
		border-bottom: 3px solid gainsboro;
		padding: 5px;
		font-family: '楷体';
		font-size: 20px;
		color: #FFFFFF;
	}
	.week{
		font-size: 14px;
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	/*返回按钮*/
.go_back{
	position:absolute;
    top: 5px;
    left: 5px;
    height: 30px;
    
    font-size: 20px;
    color: #fff;   
}
</style>