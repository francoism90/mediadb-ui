const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('pages/Library.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: '403',
    path: '/403',
    component: () => import('pages/error/403.vue'),
    meta: { auth: false, layout: 'Auth' }
  },
  {
    name: '429',
    path: '/429',
    component: () => import('pages/error/429.vue'),
    meta: { auth: false, layout: 'Auth' }
  },
  {
    name: '500',
    path: '/500',
    component: () => import('pages/error/500.vue'),
    meta: { auth: false, layout: 'Auth' }
  },
  {
    name: 'collections',
    path: '/collections',
    component: () => import('pages/Collections.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'profiles',
    path: '/profiles',
    component: () => import('pages/Profiles.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'collect',
    path: '/collect/:id/:slug?',
    component: () => import('pages/Collection.vue'),
    meta: { auth: true, layout: 'Main' },
    props: true
  },
  {
    name: 'video',
    path: '/video/:id/:slug?',
    component: () => import('pages/Video.vue'),
    meta: { auth: true, layout: 'Main' },
    props: true
  },
  {
    name: 'history',
    path: '/history',
    component: () => import('pages/History.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/Search.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/user/Login.vue'),
    meta: { auth: false, layout: 'Auth' }
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/error/404.vue')
  })
}

export default routes
