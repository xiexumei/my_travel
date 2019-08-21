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
import AMap from 'vue-amap'
//import { Swipe, SwipeItem } from 'mint-ui'

//移动端左右滑动
import VueTouch from 'vue-touch' 
import MintUI from 'mint-ui'
import WeUI from 'weui'
import 'weui/dist/style/weui.min.css';
import 'mint-ui/lib/style.css'

Vue.use(WeUI)
Vue.use(MintUI) 
//import { Button } from 'mint-ui'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(AMap)
// 初始化vue-amap
AMap.initAMapApiLoader({
  key: 'c2a3323567c7a653bffb4bdb7644cfbb',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation'],
  uiVersion: '1.0.11' // 版本号
})



Vue.use(VueTouch, {name: 'v-touch'})        
VueTouch.config.swipe = {             
threshold: 100 //手指左右滑动距离       
 }

//Vue.component(Swipe.name, Swipe);
//Vue.component(SwipeItem.name, SwipeItem);
//Vue.component(Button.name, Button); 


Vue.prototype.$axios = axios
//使用Vcharts
Vue.component(VeLine.name, VeLine)
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'l3CCgapo1RoxPs7pgasBPk4wnE2Kv33N'
})

Vue.use(Vuex)

Vue.config.productionTip = false

//时间过滤器：发布动态的时间

Vue.filter('fomatTime', function (valueTime) {
  if (valueTime) {

    valueTime = new Date(valueTime);//发布动态的时间

    let newData = Date.parse(new Date());//当前的时间，转化为时间戳：1566129839000
   
    let diffTime = Math.abs(newData - valueTime);//求得两个时间戳的差
    if (diffTime > 7 * 24 * 3600 * 1000) {//当前的时间差大于了7天
      let date = new Date(valueTime);
      let y = date.getFullYear();//年
      let m = date.getMonth() + 1;//月
      m = m < 10 ? ('0' + m) : m;//月小于时前面加前导0
      let d = date.getDate();  //天数
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours(); //小时
      h = h < 10 ? ('0' + h) : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? ('1' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return m + '-' + d + ' ' + h + ':' + minute;

    } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
      // //注释("一周之内");

      // let time = newData - diffTime;
      let dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      return dayNum + "天前";

    } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
      // //注释("一天之内");
      // let time = newData - diffTime;
      let dayNum = Math.floor(diffTime / (60 * 60 * 1000));
      return dayNum + "小时前";

    } else if (diffTime < 3600 * 1000 && diffTime > 0) {
      // //注释("一小时之内");
      // let time = newData - diffTime;
      let dayNum = Math.floor(diffTime / (60 * 1000));
      return dayNum + "分钟前";

    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
