const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('pages/Home.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: '403',
    path: '/403',
    component: () => import('pages/error/403.vue'),
    meta: { layout: 'Error' }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('pages/error/404.vue'),
    meta: { layout: 'Error' }
  },
  {
    name: '429',
    path: '/429',
    component: () => import('pages/error/429.vue'),
    meta: { layout: 'Error' }
  },
  {
    name: '500',
    path: '/500',
    component: () => import('pages/error/500.vue'),
    meta: { layout: 'Error' }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/auth/Login.vue'),
    meta: { auth: false, layout: 'Auth' }
  },
  {
    name: 'logout',
    path: '/logout',
    component: () => import('pages/auth/Logout.vue'),
    meta: { auth: true, layout: 'Auth' }
  },
  {
    name: 'video',
    path: '/video/:id/:slug?',
    component: () => import('pages/Video.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    path: '*',
    component: () => import('pages/error/404.vue'),
    meta: { auth: false, layout: 'Error' }
  }
]

export default routes
