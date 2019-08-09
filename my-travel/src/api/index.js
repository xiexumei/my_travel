//登录注册时请求的方法
/*import getAjax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'*/


//短信验证码请求函数  data = phone
/*export const reqSendCode = (phone)=>{
	getAjax(`${BASE_URL}/sendcode`, {phone})
}

//请求登录的函数
export const reqSmsLogin = (phone, code)=>{
	getAjax(`${BASE_URL}/SMS_login`, {phone, code}, 'POST')
}

//密码登录请求函数
export const reqPwdLogin = ({name, pwd, captcha})=>{
	getAjax(`${BASE_URL}/login_pwd`, {name, pwd, captcha}, 'POST')
}

//获取会话信息
export const reqUserInfo = () => getAjax(BASE_URL+'/userinfo')

//获取天气
export const reqWeather = () => getAjax(BASE_URL+'/getweather')*/

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
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')


//城市位置请求=================================================
//1.请求热门的城市
export const reqHotCitys = () => ajax(BASE_URL+'/hot_citys')

//2.请求分类城市

export const reqLetterCitys = () => ajax(BASE_URL+'/letter_citys')


//首页请求=============================
export const reqRecommend = ()=> ajax(BASE_URL+'/recommends_categorys')


//首页推荐的数据列表请求
export const reqRecommendList = (city, types) => ajax(BASE_URL+'/recommend_category_list',{city, types})




