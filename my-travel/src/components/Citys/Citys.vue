<template>
	<div >
		<div class="city_header">
		
		</div>
		<div class="hotCitys">
			<div class="hot-city-title">热门城市</div>
			<div class="hot-city">
				<div class="hot-city-content">
					<div >
						<span class="city-box" v-for="(hotcity, index) in hotCitys" :key="index">{{hotcity.province}}</span>						
					</div>
				</div>
			</div>
		</div>
		
		<div class="city-list">
			<div v-for="(letter, index) in letters" :key="index">
				<span class="list-title">{{letter.childArr[0].name}}</span>
				<div class="list-content">
					<div>
					    
						<div class="city-block" v-for="(citysname, index) in letter.childArr[0].childArr">{{citysname.name}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {reqHotCitys, reqLetterCitys} from '../../api'
	export default{
		data(){
			return{
				hotCitys:[],
				letters:[],
				letterCitys:[],//分类城市
				searchCity:""//搜索的城市名
			}
		},
		created(){
			 this.getHotCitys()
			 this.getLetterCitys()
		},
		methods:{
			async getHotCitys(){
				let result = await reqHotCitys()
				if(result.code===0){
					this.hotCitys = result.data
				    console.log(this.hotCitys)
				}
				
			},
			
			async getLetterCitys(){
				let result = await reqLetterCitys()
				if(result.code===0){
					
					this.letters=result.data
					//console.log(this.letters)
					//console.log(result.data[0].childArr[0].name) //
					
				
				}							
			},
			
			getsearchCity(){
		      //console.log(this.searchCity)this.searchCity是输入的，
		      
			}
		}
	}
	
</script>

<style type="text/css" scoped>
.hot-city-title, .list-title{
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  color: #9e9e9e;
  font-size: 20px;
  height: 56px;
  line-height: 56px;
}	

.hot-city-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 30px;

 
}

 .city-box {
  display: inline-block;
  width: 22%;
  height: 40px;
  color: #4a4a4a; 
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  background: ghostwhite;
  margin-bottom: 5px;
  margin-right: 4px;
}


.list-content {
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #e6e6e6;
}


.city-block {
  width: 100%;
  padding-left: 25px;
  color: #4a4a4a;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #e6e6e6;
}

.city-block:last-child {
  border: 0px solid #e6e6e6;
}
</style>