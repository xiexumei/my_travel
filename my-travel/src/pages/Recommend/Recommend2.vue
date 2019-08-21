<template>
	<div>
		<!--专属推荐-->
		<div class="personal_recommend_section1">
			<div class="personal_recommend">
			<div class="personal_recommend_header">专属推荐<span class="personal_recommend_city">{{position.city||localCity}}</span>
			</div>
		    <div class="person-wrap_nav" ref="personWrap">
			        <ul class="person-list" ref="personTab">
			          <li class="person-item" v-for="(item, index) in categorys" :key="index" :class="{on: index === currentIndex}"   @click="clickMenuItem(item.name,index)">{{item.name}}</li>		       
			        </ul>
			</div>
            <div class="person-wrap_list" ref="personList">
			        <ul class="person-listshop" ref="personShopTab">
			          <li tag='li' replace to="/recommend/detail" class="person-shop" v-for="(item, index) in newcategorysList.datas" :key="index" @click="gotoDeatail(item.id,index)">
			          	<span class="red_nav">{{types}}</span>
			          	<img class="red_img" :src="item.imgUrl1">
			          	<div class="red_img_bottom">
                         <div class="red_titles">{{item.titles}}</div>
                         <div class="red_titles_price">
                         	<span class="price">￥{{item.price}}</span>起
                         </div>
			          	</div>
			          </li>

			        </ul>
	        </div>
					
		</div>
		</div>

		<!--优惠出行-->
		<div class="personal_recommend_section2">
			<div class="discount_travel">
				<div class="personal_recommend_header">每日优惠
					<span class="personal_recommend_city">09</span>
					<span class="personal_recommend_city">09</span>
					<span class="personal_recommend_city">09</span>
					<span class="personal_recommend_city">09</span>
			    </div>
			    <div>
			    	<div class="recommend_section2_left"></div>
			    	<div class="recommend_section2_right">
			    		<div class="right1"></div>
			    		<div class="right2"></div>
			    	</div>
			    </div>
		    </div>
		</div>
		

		<!--优惠出行-->
		<div class="personal_recommend_section3">
			<div class="discount_travel">
				<div class="personal_recommend_header">热门城市
					
			    </div>
		    </div>
		</div>
		
	</div>
</template>
<script>
	 import BScroll from 'better-scroll'
	 import {mapState} from 'vuex'
	 import {reqRecommendList} from '../../api'
	 export default{
	 	props:{
	 		city: String

	 	},
	 	data(){
	 		return{
	 			scrollX:0,
	 			recommend_category:[],
	 			currentIndex:0,
	 			types:"酒店",//保存点击时获取的类型
	 			newcategorysList:[],//过滤掉不同类型的 			 			
	 		}
	 	},
	 	
		created() {

		//创建滚动条
	    this.$nextTick(() => {
	 
	      this.createScroll(this.$refs.personTab,this.$refs.personWrap)
	      this.createScroll(this.$refs.personShopTab,this.$refs.personList)
	    });

	    //渲染数据
	    this.$store.dispatch('getRecommend')
	     //一开始就调用这个请求推荐分类数据的方法
           
        
	  },

	  watch:{
	  	city(){//最开始加载的时候没有点击默认渲染第一个类型的数据，一定要在拿到city值之后再发请求

	    		var _this = this
	    		_this.$nextTick(function(){
	    			_this.clickMenuItem("酒店",0)			
	    		})  	
	  	}

	  },

	  computed:{
	  	...mapState(['categorys','categorysList','position','localCity'])

	  },

   methods: {
 
     createScroll(personTab, personList) {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = 6 * 100;
      personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
       
          this.scroll = new BScroll(personList, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
      });
    },

    //点击当前的
    async clickMenuItem(name,index){  
        var that = this
    	this.currentIndex = index//设置点击高亮
    	this.types = name
        var cuCity = (this.position.city&&this.position.city)|| this.city.substring(0,2) ||'厦门'
    	const result = await reqRecommendList(cuCity);
    
    	console.log(result)
        //将获取到的数据保存到vuex中
        if(result.code===0){
        	var categorysListd = result.data.childArr
        	this.$store.dispatch('recordCategory',categorysListd)
        }

        //将从vuex中取到的数据过滤
        var {categorysList} = this
        console.log(categorysList)
        that.newcategorysList=categorysList.find(function(item, index){
           return item.types === that.types
        })
         		  
    },

    //点击下面的滚动条跳到详情页面
    gotoDeatail(productId){
        return this.$router.push({path:'/recommendDetail', query:{productId}}) //
    }

 
    }



}
</script>
<style type="text/css" scoped>
.personal_recommend_section1, .personal_recommend_section2,.personal_recommend_section3{
	height: 220px;
	margin-bottom: 8px;
}
.personal_recommend, .discount_travel{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	margin-top: 10px;
	padding: 5px;
	width: 95%;
	height: 220px;
	border:1px solid #ccc;
	border-radius: 10px;
    font-family: '黑体';
	font-size: 18px;
	font-weight: 700;
}
.personal_recommend_city{
	position: relative;
	top: -3px;
	left: 5px;
	display: inline-block;
	width: 50px;
	height: 20px;
	font-size: 12px;
	text-align: center;
	color: #fff;
	background-color: #ff502f;
}
.personal_recommend_category{
	white-space: nowrap;
	overflow-x: scroll;
}
.person-wrap_nav{
	height: 42px;
	overflow: hidden;
}
.person-wrap_list{
	
	overflow: hidden;
}
.person-list, .person-listshop{
    white-space: nowrap;
    padding-left: 0;

}

.menu-item{
   display: inline-block;
}
  
.person-item {
          display: inline-block;
          height: 30px;
          padding: 4px 4px;
          margin-right: 5px;
          margin-top: 5px;
          line-height: 20px;
          font-size: 16px;
          font-family: '黑体';
          border: 1px solid #e8e8e8;
          border-radius: 3px;
    }

.person-shop{
	      display: inline-block;
	      margin-top: 2px;
	      margin-right: 8px;
          width: 100px;
          height: 130px;
          border: 1px solid #ccc;
          border-radius: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
}
.on{
	background-color: #f9fd50;
} 

.recommend_section2_left, .recommend_section2_right{
	float: left;
	width: 50%;
	height: 176px;
	border:1px solid #ccc;
}

.recommend_section2_right{
	float: right;
}

.right1, .right2{
	width: 90%;
	height: 40%;
	border: 1px solid #ccc;
	margin-left: 10px;
	margin-top: 10px;
}

.red_img{
	width: 99px;
	height: 70px;
	border-radius: 5px;
}

.red_price{
	position: relative;
	top: 50px;
	left: -80px;
}

.red_img_bottom{
	width: 100px;
	height: 60px;
	border: 1px solid #ccc;
}
.red_titles{
	display: inline-block;
	width: 100px;
	height: 20px;
	font-size: 16px;
}
.red_titles_price{
	font-size: 14px;
	color: #525252;
}
.price{
	color: #ff502f;
	font-size: 18px;
}
.red_nav{
	position: absolute;
	display: inline-block;
	width: 30px;
	height: 18px;
	color: #fff;
	font-size: 12px;
	background-color: #525252;
	opacity: 0.5;
	
}
</style>