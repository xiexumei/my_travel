/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {

  RECEIVE_USER_INFO,
  RECEIVE_CATEGORYS,
  RECORD_CATEGORYS_GOODLIST
 

} from './mutation-types'

export default {
 
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  //获取首页推荐数据
  [RECORD_CATEGORYS_GOODLIST](state, {categorysList}){
  	state.categorysList = categorysList

  }

}