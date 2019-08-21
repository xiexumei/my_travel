/*
状态对象
 */
import {navList,cityList} from './data'
export default {

  userInfo: {}, // 用户信息
  categorys: [], // 推荐分类数组
  categorysList:[],//获取到首页推荐里面的数据
  localCity:"",//当前城市
  foods:{},
  goods:{},
  /*城市定位*/
  position:{},
  isChoosed: true,
  autocompleteList:[],//记录自动选择城市存放的数组
  cityList:cityList, //城市列表
  location: false,
  ismask: false,
  hasLocation:false,
  imgdata:{},//用户发表动态时查看的图片

  /*找风景*/
  navState:0, //获取到当前状态
  weather:{}
 
}