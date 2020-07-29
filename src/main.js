import Vue from 'vue'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({

  vuetify,
  render: h => h(App)
}).$mount('#app')
