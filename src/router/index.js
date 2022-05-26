// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard'),
      route('Profil', null, 'profil'),
      route('Login', null, 'login'),
      route('Error', null, '*'),
    ]),
  ],
})

router.beforeEach((to, from, next) => {
  // console.log(localStorage.getItem('user'))
  // console.log(localStorage.getItem('token'))
  // console.log(sessionStorage.getItem('user'))
  // console.log(sessionStorage.getItem('token'))

  // if (to.name === 'Dashboard' && (!sessionStorage.getItem('token') || !localStorage.getItem('token'))) {
  //   next({ name: 'Login' })
  // } else if (to.name === 'Login' && (sessionStorage.getItem('token') || localStorage.getItem('token'))) {
  //   next({ name: 'Dashboard' })
  // } else {
    return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
  // }
})

export default router