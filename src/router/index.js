import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/index',
    children:[
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue'),
        meta:{
          title:'首页'
        },
      },
      {
        path: '/course',
        name: 'Course',
        component: () => import('../views/course.vue'),
        meta:{
          title:'特色课'
        }
      },
      {
        path: '/record',
        name: 'Record',
        component: () => import('../views/record.vue'),
        meta:{
          title:'约课记录'
        }
      },
      {
        path: '/exercise',
        name: 'Exercise',
        component: () => import('../views/exercise.vue'),
        meta:{
          title:'练习'
        }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/my.vue'),
        meta:{
          title:'我的'
        }
      }, 
    ]
  },
  {
    path: '/index/indexDetail',
    name: 'indexDetail',
    component: () => import('../views/indexDetail.vue'),
    meta:{
      title:'讲师详情'
    },
  },
  {
    path: '/index/courceDetail',
    name: 'courceDetail',
    component: () => import('../views/courceDetail.vue'),
    meta:{
      title:'课程详情'
    },
  },
  {
    path: '/course/coursedet',
    name: 'coursedet',
    component: () => import('../views/coursedet.vue'),
    meta:{
      title:'课程详情',
      data:['课程介绍','课程大纲','课程评价']
    },
  },     
  {
    path: '/my/setPass',
    name: 'setPass',
    component: () => import('../views/MyChildren/setPass.vue'),
    meta:{
      title:'设置密码'
    },
  },
  {
    path: '/my/setNewPass',
    name: 'setNewPass',
    component: () => import('../views/MyChildren/setNewPass.vue'),
    meta:{
      title:'修改密码'
    },
  },
  {
    path: '/my/info',
    name: 'info',
    component: () => import('../views/MyChildren/info.vue'),
    meta:{
      title:'个人信息'
    },
  },
  {
    path: '/my/setInfo',
    name: 'setInfo',
    component: () => import('../views/MyChildren/setInfo.vue'),
    meta:{
      title:'个人信息'
    },
  },
  {
    path: '/my/concern',
    name: 'concern',
    component: () => import('../views/MyChildren/concern.vue'),
    meta:{
      title:'我的关注'
    },
  },
  {
    path: '/my/collect',
    name: 'collect',
    component: () => import('../views/MyChildren/collect.vue'),
    meta:{
      title:'我的收藏'
    },
  },
  {
    path: '/my/order',
    name: 'order',
    component: () => import('../views/MyChildren/order.vue'),
    meta:{
      title:'课程订单'
    },
  },
  {
    path: '/my/study',
    name: 'study',
    component: () => import('../views/MyChildren/study.vue'),
    meta:{
      title:'我的学习'
    },
  },
  {
    path: '/my/studyCalendar',
    name: 'studyCalendar',
    component: () => import('../views/MyChildren/studyCalendar.vue'),
    meta:{
      title:'学习日历'
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta:{
      title:'登录'
    },
  },
  {
    path: '/smslogin',
    name: 'smslogin',
    component: () => import('../views/smslogin.vue'),
    meta:{
      title:'验证码登录'
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
