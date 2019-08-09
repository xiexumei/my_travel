// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import VeLine from 'v-charts/lib/line.common'
import { Swipe, SwipeItem } from 'mint-ui';
//移动端左右滑动
import VueTouch from 'vue-touch'        
Vue.use(VueTouch, {name: 'v-touch'})        
VueTouch.config.swipe = {             
threshold: 100 //手指左右滑动距离       
 }

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);



Vue.prototype.$axios = axios
//使用Vcharts
Vue.component(VeLine.name, VeLine)
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'l3CCgapo1RoxPs7pgasBPk4wnE2Kv33N'
})
import AMap from 'vue-amap'

Vue.use(AMap)
//初始化地图
AMap.initAMapApiLoader({
	key:'c2a3323567c7a653bffb4bdb7644cfbb',
	plugin:['AMap.Geolocation'],
	uiVersion: '1.0' // 版本号
})
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
