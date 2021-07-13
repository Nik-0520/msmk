import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import 'lib-flexible'

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
  	next()
	if(to.path =='/my'){//如果是去我的页面
		if(!localStorage.adminToken){//如果没有登录，就先进入login组件进行登录
			next('/login');
		}else{//如果登录了，那就继续
			next();
		}
	}else{//如果是其他组件，那就继续。
		next();	
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
