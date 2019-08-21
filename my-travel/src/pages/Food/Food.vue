<template>
	<div>
		<div class="header-wrapper">
			<div class="city_location"></div>
			<div class="city_detail"><span class="goback" @click="goback()"><返回</span> &nbsp;</router-link>><span class="local-city">{{localCity}}</span><img class="img_location" src="./location2.png"></div>
			<div class="food-cover"></div>
			<div>
			  <mt-swipe :auto="4000" style="width:100%; height: 198px;" class="swiper-wrapper">
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./1.jpg" />
			  </mt-swipe-item>
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./2.jpg" />
			  </mt-swipe-item>
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./3.jpg" />
			  </mt-swipe-item>
			  <mt-swipe-item >
			  	<img class="swiper-img" src="./4.jpg" />
			  </mt-swipe-item>
			 </mt-swipe>

			</div>
		</div>
		<div class="goods">
			<div class="menu-wrapper">
				<ul>
					<li class="menu-item" v-for="(food,index) in foods.foodChild" :key="index" :class="{current: currentIndex===index}" @click="clickNavItem(index)"><span class="text">{{food.name}}</span></li>
					
				</ul>
			</div>
			<div class="foods-wrapper">
				<ul ref="foodsUl">
					<li class="food-list-hook" v-for="(food,index) in foods.foodChild" :key="index">
						<h1 class="title">{{food.name}}</h1>
					
					<ul>
						<li class="food-item" v-for="(item, index) in food.foods" :key="index">
							<div class="icon">
								<img width="120" height="70" :src="item.icon">
							</div>
							<div class="content">
								<span class="name">{{item.name}}:</span>
								<span class="desc"></span> 
							</div>
							<div class="collect">
								<span>250人收藏</span>
								
							</div>
							<div class="love">
								<img :ref="`${item.name}`"  @click.stop="AddMyCollect(food.name,item.name)" class="love_img love_img1" src="./love.png">
								<img class="love_img" src="./search.png">
							</div>
							
						</li>
						
					</ul>
					</li>
				</ul>
			</div>
		</div>
		<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script type="text/javascript">
	import Swiper from 'swiper'
	import AlertTip from '../../components/AlertTip/AlertTip'
	import BScroll from 'better-scroll'
	import {mapState} from 'vuex'
	import {reqFoodList, reqAddShopCart} from '../../api'
	export default{
		data(){
			return{
				scrollY: 0,
				tops:[],
				indexArr:[],
				newImg:{url:require('./love1.png')},
				alertText:"",//提示文本
				alertShow: false///是否显示警告			
			}
		},
		components:{
			AlertTip 
		},
		computed:{
           ...mapState(['localCity','foods','userInfo']),

           //当右边滚动的时候，左边对应的栏目中也要高亮
           currentIndex(){
           	var {scrollY, tops}=this
           	var index = tops.findIndex((top, index)=>{
             //当scroll>=当前的top&&scroll<下一个top
             return scrollY>= top && scrollY<tops[index+1]
           	})
           	return index
           }
		},

		mounted(){
	            this.$store.dispatch('getFoodsList', () => {// 数据更新后执行
			        this.$nextTick(() => { // 列表数据更新显示后执行
			         this.createScroll()
			         this.getTops()
              })
           })

		},

		methods:{
			async getFoodList(){
                console.log(this.localCity)
				var result = await reqFoodList(this.localCity.substring(0,2))
				console.log(result)
			},
			//创建滚动列表
			createScroll(){
				
				//左边的滚动条
				new BScroll('.menu-wrapper',{
					click:true
				})
                //右边的滚动条
				this.foodsListScroll = new BScroll('.foods-wrapper',{
					probeType: 2,
					click:true
				})

				//给右侧列表绑定scroll监听
				this.foodsListScroll.on('scroll', ({x,y})=>{
					this.scrollY = Math.abs(y)
				})

				//给右侧列表绑定scroll结束的监听
				this.foodsListScroll.on('scrollEnd', ({x, y})=>{
					console.log('scrollEnd',x,y)
					this.scrollY = Math.abs(y)
				})
			},
			 // 初始化tops
		     getTops() {
		        // 1. 初始化tops
		        const tops = []
		        let top = 0
		        tops.push(top)
		        // 2. 收集
		        // 找到所有分类的li
		        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
		        Array.prototype.slice.call(lis).forEach(li => {
		          top += li.clientHeight
		          tops.push(top)
		        })

		        // 3. 更新数据
		        this.tops = tops
		        console.log(tops)
		      },

		      //给导左边导航栏注册点击事件
		      clickNavItem(index){
		      	//让当前的高亮
		      	this.currentIndex = index


		      	//点击当前的导航栏，让右边滑动到相应的位置
		      	const scrollY = this.tops[index] //从刚刚保存的top中拿到目标位置
		      	console.log(scrollY)
		      	this.scrollY = scrollY

		      	//让右侧的滑动条滚动到这个目标位置
		      	this.foodsListScroll.scrollTo(0, -scrollY, 300)


		      },

		      showAlert(alertText) {
		        this.alertShow = true
		        this.alertText = alertText
		      },

		       // 关闭警告框
		      closeTip () {
		        this.alertShow = false
		        this.alertText = ''
		      },

		      //加入购物车收藏
		       async AddMyCollect(prdoctType,productname){
		     
		      	 console.log(prdoctType,productname)
		     	 var {userInfo, localCity} = this
		      	 var userId = userInfo._id
		      	 
                 //向后台添加
		      	 var result = await reqAddShopCart({userId, localCity, prdoctType, productname})
		      	 console.log(result)

		      	 var that = this
		      	 //获取到所有的收藏心，但是他们的下标不是对应的
		      	 var loves = that.$refs[name]
		      	 //赛选出当前类的心
                 console.log(loves,name)
                  if(result.code === 0){
		      	 	  
		      	    loves[0].src=this.newImg.url  
		      	 }else{
		      	 	this.showAlert(result.msg)
		      	 }
                 

		     },
		    
		     
		     goback(){
		     	return this.$router.go(-1)
		     }

		}
	}
</script>
<style type="text/css" scoped>
.goods{
	display: flex;
	position: absolute;
	top: 195px;
	bottom: 46px;
	width: 100%;
	height: 480px;
	background: #fff;
	overflow: hidden;

}	
.local-city{
	color: #fff;
	font-size: 20px;
}
.menu-wrapper{

	flex: 0 0 100px;
	width: 100px;
	background-color: #f3f5f7;
   
}

.menu-item{
	display: table;
	height: 54px;
    width: 90px;
	padding: 0 12px;
	line-height: 14px;
	border-bottom: 1px solid #ccc;
	text-align: center;
	line-height: 54px;
}
.text{
	 text-align: right;
}
.current{
	background-color: #fff;
}

.foods-wrapper{
	flex: 1;

}
.title{
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	border-left: 2px solid #d9dde1;
	font-size: 12px;
	color: rgb(147, 153, 159);
	background-color: #f3f5f7;
}
ul{
	padding-left: 5px;
}
.food-item{
	position: relative;
	display: inline-block;
	width: 125px;
	height: 160px;
	border:1px solid #ccc;
	
}

.food-cover{
	position: fixed;
	top:0;
	right: 0;
	left: 0;
	bottom: 476px;

	z-index: 55;
	background-color: rgba(0, 0, 0,0.5);
}
.swiper-wrapper{
	position: fixed;
	top:0;
	right: 0;
	left: 0;
	bottom: 476px;
	top: -44px;
}

.img_location{
	width: 30px;
	height: 30px;
}
.city_location{
	position: absolute;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	width: 80px;
	height: 80px;
	border-radius: 50%;
	border:1px solid #f4f6f6;
	z-index: 60;
}
.swiper-img{
	width: 375px;
	height: 200px;
}
.city_detail{
	position: absolute;
	left: 50%;
	top: 100px;
	transform: translateX(-50%);
	z-index: 60;

}
.name{
	margin:2px 0 8px 0;
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: rgb(7, 17, 27);
}

.collect{

	font-size: 12px;
	color: #ccc;

}
.love{
	position: absolute;
	bottom: 2px;
	padding: 0 3px;
}
.love_img{
	width: 30px;
	height: 30px;
	}
.love_img1{
	width: 30px;
	height: 30px;
	margin-right: 50px;
}
.goback{
	color: #fff;
	z-index: 60;
	font-size: 22px;
}

</style>