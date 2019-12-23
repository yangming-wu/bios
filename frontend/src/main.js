// 1. 导入 Vue 包
// import Vue from "Vue"
import Vue from '../node_modules/vue/dist/vue.js'

// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var status = localStorage.getItem('login') || 'Failed'

const store = new Vuex.Store({
  state:{
    login_statu: status,
  },
  mutations:{// this.$store.commit('方法的名称', '按需传递唯一的参数')
    update_statu(state, statu){
      state.login_statu = statu
    }
  },
  getters:{// this.$store.getters.***
    getStatu(state) {
      var statu = state.login_statu;
      return statu
    }
  }
});

// 2. 导入vue-router 路由
import VueRouter from "vue-router"
// 2.1 安装路由到Vue
Vue.use(VueRouter)

// 3. 导入 vue-resource 
import VueResource from "vue-resource"
// 3.1 安装vue-resource
Vue.use(VueResource)
// 3.2 设置请求的根路径
Vue.http.options.root = 'http://127.0.0.1:8001/';
// 3.3 全局设置 post 时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;



// 5. 导入 router.js
import router from "./router.js"

// 6.1 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// 6.2 引入 antd ui框架
import Antd from 'ant-design-vue'

// 4. 导入 APP 组件
import App from "./App.vue"

import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(Antd)

// 解决使用Ant-Design-Vue指定警告 [Vue warn]: Failed to resolve directive: ant-input
import antInputDirective from 'ant-design-vue/es/_util/antInputDirective'
Vue.use(antInputDirective)

// 解决 [Vue warn]: Failed to resolve directive: ant-ref
import ref from 'vue-ref';
Vue.use(ref, { name: 'ant-ref' });

Vue.use(ElementUI)

// 7. 实例化 Vue
var vm = new Vue({
  el : "#app",
  render : c => c(App),
  router:router, //将路由对象挂载到 vm 上
  store:store // 将store挂载到vm上
});