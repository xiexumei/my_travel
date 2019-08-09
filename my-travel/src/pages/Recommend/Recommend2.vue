<template>
	<div>
		<!--专属推荐-->
		<div class="personal_recommend_section1">
			<div class="personal_recommend">
			<div class="personal_recommend_header">专属推荐<span class="personal_recommend_city">{{city.substring(0,2)}}</span>
			</div>
		    <div class="person-wrap_nav" ref="personWrap">
			        <ul class="person-list" ref="personTab">
			          <li class="person-item" v-for="(item, index) in categorys" :key="index" :class="{on: index === currentIndex}"   @click="clickMenuItem(item,index)">{{item.name}}</li>		       
			        </ul>
			</div>
            <div class="person-wrap_list" ref="personList">
			        <ul class="person-listshop" ref="personShopTab">
			          <li class="person-shop">酒店</li>
			          <li class="person-shop">门票</li>
			          <li class="person-shop">当地玩乐</li>
			          <li class="person-shop">跟团游</li>
			          <li class="person-shop">定制旅行</li>
			      
			       
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
		<keep-alive>
			<router-view/>
		</keep-alive>
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
	 			
	 		}
	 	},
	 	
		created() {

		//创建左右滚动条
	    this.$nextTick(() => {
	 
	      this.createScroll(this.$refs.personTab,this.$refs.personWrap)
	      this.createScroll(this.$refs.personShopTab,this.$refs.personList)
	    });

	    //渲染数据
	    this.$store.dispatch('getRecommend')

	  },

	  computed:{
	  	...mapState(['categorys'])
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

    //点击当前的,传进来的index===当前的index就高亮
    async clickMenuItem(item,index){  

    	this.currentIndex = index
    	const types = item.name
        console.log(this.city,types)
    	const result = await reqRecommendList(this.city,types);
    
    	console.log(result)
        //将获取到的数据保存到vuex中
        if(result.code===0){
        	var categorysList = result

        	this.$store.dispatch('recordCategory',categorysList)
        }
        
    		  
    }

    
    }



	 }
</script>
<style type="text/css">
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
	width: 30px;
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
	      margin-top: -5px;
          width: 100px;
          height: 140px;
          border: 1px solid #ccc;
          border-radius: 5px;
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
</style>