import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/Home'
import Search from '@/pages/Search/Search'
import Found from '@/pages/Found/Found'
import Login from '@/pages/Login/Login'
import Profile from '@/pages/Profile/Profile'
import Citys from '@/components/Citys/Citys'
import Map from '@/components/Map/map2'
import Weather from '@/components/Weather/Weather'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      meta: {
        showFooter: true
      }
    },
    {
    	path: '/home',
    	component: Home,
    	meta: {
        showFooter: true
      }
    },
    {
    	path: '/search',
    	component: Search,
    	meta: {
        showFooter: true
      }
    },
    {
    	path: '/found',
    	component: Found,
    	meta: {
        showFooter: true
      }
    },
    
    {
    	path: '/profile',
    	component: Profile,
    	meta: {
        showFooter: true
      }
    },
    
    {
    	path: '/login',
    	component: Login
    },
    
    {
    	path: '/citys',
    	component: Citys
    },
    {
    	path: '/weather',
    	component: Weather
    },
    {
    	path: '/map',
    	component: Map
    },
     
  ]
})
