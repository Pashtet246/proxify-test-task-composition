import Vue from 'vue';
import App from './App.vue';
import vuetify from '@/plugins/vuetify.ts';
import VueTypedJs from 'vue-typed-js';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueTypedJs);
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
