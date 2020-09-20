const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('pages/app/Library.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: '403',
    path: '/403',
    component: () => import('pages/error/403.vue'),
    meta: { auth: false, layout: 'Error' }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('pages/error/404.vue'),
    meta: { auth: false, layout: 'Error' }
  },
  {
    name: '429',
    path: '/429',
    component: () => import('pages/error/429.vue'),
    meta: { auth: false, layout: 'Error' }
  },
  {
    name: '500',
    path: '/500',
    component: () => import('pages/error/500.vue'),
    meta: { auth: false, layout: 'Error' }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/auth/Login.vue'),
    meta: { auth: false, layout: 'Auth' }
  },
  {
    name: 'collections',
    path: '/collections',
    component: () => import('pages/app/Collections.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'tags',
    path: '/tags',
    component: () => import('pages/app/Tags.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/app/Search.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    path: '*',
    component: () => import('pages/error/404.vue'),
    meta: { auth: false, layout: 'Error' }
  }
]

export default routes
