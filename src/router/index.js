import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/routes/Home'
import Drive from '@/components/routes/Drive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/drive/:id',
      name: 'drive',
      component: Drive
    }
  ]
})
