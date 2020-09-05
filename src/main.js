import Vue from 'vue'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Alert from './components/shared/alert'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import {routers} from "@/router";
import Vuetify from "vuetify";
import {store} from "@/store";
import * as firebase from 'firebase/app';
import EditDialog from "@/components/events/edit/EditDialog";
import RegisterDialog from "@/components/events/register/RegisterDialog";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css';


import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.component('app-alert', Alert);
Vue.component('app-edit', EditDialog)
Vue.component('app-register', RegisterDialog)
const router = new VueRouter({

    routes: routers,
    mode: 'history',

});
new Vue({
    router,
    vuetify,
    store,
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBP2wZOzAGXDAVmQhsl-gqaHCD6tH83yfc',
            authDomain: 'podlasie-b1f30.firebaseapp.com',
            databaseURL: 'https://podlasie-b1f30.firebaseio.com',
            projectId: 'podlasie-b1f30',
            storageBucket: 'gs://podlasie-b1f30.appspot.com',
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$store.dispatch('autoSignIn', user)
                this.$store.dispatch('fetchUserData')
            }
        })
        this.$store.dispatch('loadEvents')
    }
}).$mount('#app')
