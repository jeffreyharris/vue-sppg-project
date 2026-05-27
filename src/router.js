import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        title: 'St. Pete Pint Guide | A complete guide to the breweries of St. Petersburg Florida.', 
        description: 'A complete guide to the breweries of St. Petersburg Florida.',
      } 
    }
  ]  
})


