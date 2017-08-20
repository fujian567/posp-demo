import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Error from '@/components/error/error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
