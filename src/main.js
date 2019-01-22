import Vue from 'vue';
import Vuetify from 'vuetify'//vuetify
import 'vuetify/dist/vuetify.min.css'//vuetify css
import App from './App.vue';
import router from './router';
import store from './store';
import baseUrl from './utils/misc';//URL globalization

Vue.use(Vuetify)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  baseUrl,
  render: h => h(App),
}).$mount('#app');
