// 1. 导入 Vue-router 包
import VueRouter from "vue-router"
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// 2. 导入相应的路由组件
import login from "./components/Login.vue"
import frame from "./components/Frame.vue"
import index from "./components/Index.vue"

// 创建 VueRouter 实例化对象
var router = new VueRouter({
  routes : [
    { path:"/", redirect: "/index"}, // 配置默认显示Home组件
    { path:"/", component: frame,
      children: [
        { path: 'index', component: index },
      ]
  
    },
    { path:"/login", component: login}
  ]
});


// 把 router 对象曝露出去
export default router