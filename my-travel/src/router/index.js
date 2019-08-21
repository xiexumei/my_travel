import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import Search from '../pages/Search/Search.vue';
import SearchBar from '../pages/Search/SearchBar.vue';
import Found from '@/pages/Found/Found'
import Login from '@/pages/Login/Login'
import Profile from '@/pages/Profile/Profile2.vue'
import ProfileDetail from '@/pages/Profile/ProfileDetail.vue'
import Food from '@/pages/Food/Food'
import Citys from '@/components/Citys/CityMap.vue'
import Weather from '@/components/Weather/Weather'
import Make from '@/components/Make/Create.vue'
import Recommend from '@/pages/Recommend/Recommend2'
import recommendDetail from '../components/RecommendDetail/Recommendetail.vue'
import Updateavater from '../components/updateavater/updateavater';
import UpNickname from '../components/updateNickname/upNickname.vue'
import Updatesign from '../components/updateNickname/upDescription.vue'
import Comment from '../components/Comment/Comment.vue'
import PersonIndex from '../components/PersonIndex/PersonIndex.vue'
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
      path: '/index',
      component: resolve => require(['@/pages/index/index'], resolve),
      meta: {keepAlive: true},
       children: [
        {
          path: '',
          component: resolve => require(['@/pages/index/index'], resolve)
        },
        {
          path: 'page1', 
          name: 'page1',
          component: resolve => require(['@/pages/index/page1'], resolve)
        },
        {
          path: 'page2',
          name: 'page2',
          component: resolve => require(['@/pages/index/page2'], resolve)
        },
        {
          path: 'page3',
          name: 'page3',
          component: resolve => require(['@/pages/index/page3'], resolve)
        },
        {
          path: 'page4',
          name: 'page4',
          component: resolve => require(['@/pages/index/page4'], resolve)
        },
        {
          path: 'page5',
          name: 'page5',
          component: resolve => require(['@/pages/index/page5'], resolve)
        },
        {
          path: 'page6',
          name: 'page6',
          component: resolve => require(['@/pages/index/page6'], resolve)
        },
        {
          path: 'page7',
          component: resolve => require(['@/pages/index/page7'], resolve)
        },
      ]
   
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
      path: '/searchbar',
      component: SearchBar,
      meta: {keepAlive: false, showFooter: false}
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
        path: '/profiledetail',
        component: ProfileDetail,
       
    },

    {
        path:'/updateavater',
        component: Updateavater

    },

    {
        path:'/updatesign',
        component: Updatesign
    },

    {
        path:'/updatenickname',
        component: UpNickname

    },
    {
    	path: '/login',
    	component: Login
    },
    {
        path: '/food',
        component: Food
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
        path: '/recommend',
        component: Recommend,     
    },
    {
        path: '/recommendDetail',
        component: recommendDetail
    },
    {
        path:'/make',
        component:Make
    },
    {
        path:'/comment',
        component: Comment
       
    },
    {
        path:'/personindex',
        component: PersonIndex
    },

     
  ]
})
