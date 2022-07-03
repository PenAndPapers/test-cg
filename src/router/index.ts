import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', 
      name: 'GreetingScreen',
      component: () => import(/* webpackChunkName: "GreetingScreen" */ '../pages/GreetingScreen.vue')
    },
    {
      path: '/register', 
      name: 'FormScreen',
      component: () => import(/* webpackChunkName: "FormScreen" */ '../pages/FormScreen.vue')
    },
    {
      path: '/summary', 
      name: 'SummaryScreen',
      component: () => import(/* webpackChunkName: "SummaryScreen" */ '../pages/SummaryScreen.vue')
    },
    {
      path: '/error', 
      name: 'ErrorScreen',
      component: () => import(/* webpackChunkName: "ErrorScreen" */ '../pages/ErrorScreen.vue')
    },
    {
      path: '/:catchAll(.*)', 
      name: 'ErrorPage',
      component: () => import(/* webpackChunkName: "ErrorScreen" */ '../pages/ErrorScreen.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router