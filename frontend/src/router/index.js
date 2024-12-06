import Vue from 'vue'
import VueRouter from 'vue-router'
import { abort, autoRoute } from '@/util/routes'

Vue.use(VueRouter)

const routes = [
  autoRoute(),
  abort(),
]

const router = new VueRouter({
  mode: 'history',
  base: `${process.env.BASE_URL}`,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  },
  routes
})


export default router