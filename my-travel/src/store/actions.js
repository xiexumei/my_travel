/*
通过mutation间接更新state的多个方法的对象
 */
import {
 

  RECEIVE_CATEGORYS,
  RECEIVE_USER_INFO,
  RECORD_CATEGORYS_GOODLIST
  

} from './mutation-types'
import {

  reqUserInfo,
  reqRecommend,


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
      commit(RECEIVE_USER_INFO, {userInfo})
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
  }

  
}