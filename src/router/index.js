import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/routes/Index'
import Drive from '@/components/routes/Drive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/drive/:id',
      name: 'drive',
      component: Drive
    }
  ]
})
