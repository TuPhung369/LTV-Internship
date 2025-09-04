import { createRouter, createWebHistory, type Router } from 'vue-router'
import routes from './routes'
import { IS_LOGIN } from '@/core/constants'

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  let isLogin = false
  if (localStorage.getItem(IS_LOGIN) === 'true') {
    isLogin = true
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLogin) {
      next({ name: 'LoginPage' })
    } else {
      next()
    }
  } else if (to.name === 'LoginPage' && isLogin) {
    next({ name: 'UserProfile' })
  } else {
    next()
  }
})

export default router
