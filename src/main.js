import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueGtag from 'vue-gtag'
const fb = require('./firebaseConfig.js')

Vue.config.productionTip = false
require('./components/BreweryDrop');
require('./components/BeerDash');
require('./components/ReviewedBeerDash');
require('./components/BreweryTwitter');
require('./components/Contact');
require('./components/PhotoDash');

router.beforeEach((to, from, next) => {

    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
    next();
});

Vue.use(VueGtag, {
  config: { id: "UA-140224498-1" }
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
