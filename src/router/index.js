import VueRouter from 'vue-router';

const Home = resolve => require(['@/pages/home'], resolve);
const NotFound = resolve => require(['@/pages/not-found'], resolve);

export default new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  }, {
    path: '*',
    name: 'notFound',
    component: NotFound,
  }],
});
