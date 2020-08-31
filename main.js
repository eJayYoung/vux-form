import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { AlertPlugin, ToastPlugin,LoadingPlugin,ConfirmPlugin, DatetimePlugin } from 'vux';
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(DatetimePlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
