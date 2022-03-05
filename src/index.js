import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import router from '@/router';

import Application from '@/pages/application';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueI18n);

new Vue({
  el: '.root',
  store: require('@/store').default,
  i18n: require('@/i18n').default,
  router,
  components: {
    Application,
  },
});
