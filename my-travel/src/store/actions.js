/*
通过mutation间接更新state的多个方法的对象
 */
import {
 

  RECEIVE_CATEGORYS,
  RECEIVE_USER_INFO,
  RECORD_CATEGORYS_GOODLIST,
  RECORD_CITY,
  RECORD_CURRENT_ITEM,
  RECORD_USER_INFO,
  RECEIVE_FOODS,
  SWITCH_INPUT_CITY,//切换输入城市
  SET_POSITON,
  CHOOSE_CITY_NAME,
  Add_LOVELIST,//记录收藏
  RESET_USER_INFO,//退出
  SET_IMGDATA,
  RECORD_WEATHER//记录天气

  

} from './mutation-types'

import {

  reqUserInfo,
  reqRecommend,
  reqFoodList,
  reqAddShopCart,
  reqLogout,//退出
 


} from '../api'

export default {
  

  // 同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  
  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      console.log(userInfo)
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  //退出
   // 异步登出
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  
  //异步获取推荐类型
  async getRecommend({commit}){
    const result = await reqRecommend()
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }

  },

  //同步记录首页的推荐数据
  recordCategory({commit}, categorysList){
  
    commit(RECORD_CATEGORYS_GOODLIST, {categorysList})
  },

  //同步记录下当前的城市
  recordCity({commit}, city){
    commit(RECORD_CITY, {city})
    console.log(city)
  },


  //获取到美食列表
  async getFoodsList({commit, state}, callback){
    const  {localCity}= state
    const result = await reqFoodList(localCity.substring(0,2))
    if(result.code === 0){
      const foods = result.data
      commit(RECEIVE_FOODS, {foods})
      //数据更新后通知一下组件进行处理
      callback && callback()
    }
  },


  //切换输入城市
   switch_input_city({ commit }) {
    commit('SWITCH_INPUT_CITY')
  },

  //获取详细定位
  getCurrentPosition({ commit, state }, map) {
    AMap.plugin(['AMap.Geolocation', 'AMap.Autocomplete'], function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        extensions: 'all'
      });
      geolocation.getCurrentPosition(function (status, result) {
        // console.log(result)
        if(result.aois && result.aois.length>0 ){
          console.log(result)
          commit(SET_POSITON, result)
           map.addControl(geolocation);
        }else {
          if (state.hasLocation) {
            // console.log(123)
            return false
          } else {
            state.ismask = true
            state.location = true
            state.hasLocation = true
          }
        }
      }) 
    })
  },
  
  // 选择城市，地图中心切换
  choose_city_name({ commit }, index) {
    commit(CHOOSE_CITY_NAME, index)
    AMap.plugin('AMap.Geocoder', function () {
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      });
      geocoder.getLocation(state.position.city, function (status, result) {
        var center = [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
        var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 16,
          center: center
        });
        console.log(result)
        map.addControl(geocoder)
      });

    })
  },
  
  //用户发表动态时的图片
 
  setMoodImg({commit}, imgdata){
    commit(SET_IMGDATA, {imgdata})

  },

  //同步记录获取到的天气状态
  recordWeather({commit}, weather){
    commit(RECORD_WEATHER, {weather})
  }
  
}