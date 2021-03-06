import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

var Fly=require("flyio/dist/npm/wx")
var fly=new Fly()
Vue.prototype.$fly=fly //将fly实例挂在vue原型上

Vue.prototype.$fly.interceptors.request.use((config, promise) => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
})

const app = new Vue(App)
app.$mount()
