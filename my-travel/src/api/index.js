/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

//登录注册请求=================================================

// 1、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
// 2、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// 3、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// 4、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userInfo')
// 5、检查用户是否登录
export const checkLogin = () => ajax(BASE_URL+'/checkLogin')
// 6、退出
export const reqLogout = () => ajax(BASE_URL+'/logout')

//城市位置请求=================================================
//1.请求热门的城市
export const reqHotCitys = () => ajax(BASE_URL+'/hot_citys')

//首页请求=============================
export const reqRecommend = ()=> ajax(BASE_URL+'/getGoods/recommends_categorys')

//首页推荐的数据列表请求
export const reqRecommendList = (city) => ajax(BASE_URL+'/getGoods/recommend_category_list',{city})

//加入购物车

export const reqAddShopCart = ({userId, localCity, prdoctType, productname}) =>ajax(BASE_URL+'/getGoods/collectFood',{userId, localCity, prdoctType, productname}, 'POST')
export const reqFoodList = (city) => ajax(BASE_URL+'/getGoods/getfoods',{city})

//请求到动态数组
export const getMoodsList = ()=> ajax(BASE_URL+'/pdMood/getMoods')