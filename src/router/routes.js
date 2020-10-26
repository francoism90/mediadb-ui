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
    name: 'search',
    path: '/search',
    component: () => import('pages/Search.vue'),
    meta: { auth: true, layout: 'Main' }
  },
  {
    path: '/collections',
    component: () => import('pages/Collection.vue'),
    meta: { auth: true, layout: 'Main' },
    children: [
      {
        name: 'collection',
        path: '',
        component: () => import('pages/collection/Items.vue'),
        meta: { auth: true, layout: 'Main' }
      },
      {
        name: 'collection-details',
        path: 'details/:id/:slug?',
        component: () => import('pages/collection/Details.vue'),
        meta: { auth: true, layout: 'Main' },
        props: true
      }
    ]
  },
  {
    path: '/tags',
    component: () => import('pages/Tag.vue'),
    meta: { auth: true, layout: 'Main' },
    children: [
      {
        name: 'tag',
        path: '',
        component: () => import('pages/tag/Items.vue'),
        meta: { auth: true, layout: 'Main' }
      }
    ]
  },
  {
    path: '/videos',
    component: () => import('pages/Video.vue'),
    meta: { auth: true, layout: 'Main' },
    children: [
      {
        name: 'video',
        path: '',
        component: () => import('pages/video/Items.vue'),
        meta: { auth: true, layout: 'Main' }
      },
      {
        name: 'video-details',
        path: 'details/:id/:slug?',
        component: () => import('pages/video/Details.vue'),
        meta: { auth: true, layout: 'Main' },
        props: true
      }
    ]
  },
  {
    path: '*',
    component: () => import('pages/error/404.vue'),
    meta: { auth: false, layout: 'Error' }
  }
]

export default routes
