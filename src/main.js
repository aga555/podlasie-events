import Vue from 'vue'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import {routers} from "@/router";

Vue.config.productionTip = false


const router = new VueRouter({

  routes: routers,
  mode: 'history',
  scrollBehavior(to, form, savedPosition) {

    if(savedPosition)
    {
      return savedPosition
    }
    else {
      return {x:0,y:0}
    }
  }
});
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
