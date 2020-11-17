import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App.vue'

Vue.config.productionTip = false

import { AlertPlugin, ToastPlugin,LoadingPlugin,ConfirmPlugin, DatetimePlugin } from 'vux';
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(DatetimePlugin);

// 解决 vux x-input 无法触发清除
// https://github.com/airyland/vux/issues/2603#issuecomment-568337283
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
}).$mount('#app')
