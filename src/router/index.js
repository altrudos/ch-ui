import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/routes/Home'
import Drive from '@/components/routes/Drive'
import DriveClaim from '@/components/routes/DriveClaim'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/drive/:author/:id',
      name: 'drive',
      component: Drive
    },
    {
      path: '/claim/:token',
      name: 'drive-claim',
      component: DriveClaim
    }
  ]
})
