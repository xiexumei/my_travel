/*
直接更新state的多个方法的对象
 */

import Vue from 'vue'
import {

  RECEIVE_USER_INFO,
  RECEIVE_CATEGORYS,
  RECORD_CATEGORYS_GOODLIST,
  RECORD_CITY,
  RECORD_CURRENT_ITEM,
  SWITCH_INPUT_CITY,//切换输入城市
  RECEIVE_FOODS,
  SET_POSITON,
  CHOOSE_CITY_NAME,
  Add_LOVELIST,
  RESET_USER_INFO,//退出
  SET_IMGDATA,
  RECORD_WEATHER
 

} from './mutation-types'
export default {
 
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  //获取首页推荐数据
  [RECORD_CATEGORYS_GOODLIST](state, {categorysList}){
  	state.categorysList = categorysList

  },
  //同步记录当前城市
  [RECORD_CITY](state, {city}){
    state.localCity = city
  },

  //同步记录当前点击的这一项
  [RECORD_CURRENT_ITEM](state, {categorysCurItem}){
    state.categorysCurItem = categorysCurItem
  },

  
  [RECEIVE_FOODS](state,{foods}){
    state.foods = foods
  },
  //切换输入城市
   [SWITCH_INPUT_CITY](state) {
    state.isChoosed = !state.isChoosed
  },

  // 保存当前位置
  [SET_POSITON](state, result) {
    console.log('postion')
    const position = {
      address:result.aois[0].name,
      city: result.addressComponent.city
    }
    state.position = position
    // state.position.address =position.address
    // state.position.city = position.city

    
    // state.position.address = result.aois[0].name
    // state.city = result.addressComponent.city
    // console.log(state.position)
  },
   // 选择城市
  [CHOOSE_CITY_NAME](state, index) {
    // console.log(state.cityList[index.i].cityName[index.j])
    state.position.city = state.cityList[index.i].cityName[index.j]
    state.isChoosed = true
    console.log(state.position.city)
  },
 
  //记录下发布的动态图片
  [SET_IMGDATA](state, imgdata){
    state.imgdata = imgdata
  },
  //同步记录天气状态
  [RECORD_WEATHER](state, weather){
    state.weather = weather
  }

}