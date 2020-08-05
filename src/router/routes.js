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
    name: 'channels',
    path: '/channels',
    component: () => import('pages/app/Channels.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'channel',
    path: '/channel/:id/:slug?',
    component: () => import('pages/app/Channel.vue'),
    meta: { auth: true, layout: 'Main' },
    props: true
  },
  {
    name: 'media',
    path: '/media/:id/:slug?',
    component: () => import('pages/app/Media.vue'),
    meta: { auth: true, layout: 'Main' },
    props: true
  },
  {
    name: 'collections',
    path: '/collections',
    component: () => import('pages/app/Collections.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'collection',
    path: '/collection/:id/:slug?',
    component: () => import('pages/app/Collection.vue'),
    meta: { auth: true, layout: 'Main' },
    props: true
  },
  {
    name: 'tags',
    path: '/tags',
    component: () => import('pages/app/Tags.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'history',
    path: '/history',
    component: () => import('pages/app/History.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/app/Search.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/auth/Login.vue'),
    meta: { auth: false, layout: 'Auth' }
  },
  {
    path: '*',
    component: () => import('pages/error/404.vue'),
    meta: { auth: false, layout: 'Error' }
  }
]

export default routes
