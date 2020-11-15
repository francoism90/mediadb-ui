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
    name: 'settings',
    path: '/settings',
    component: () => import('pages/Settings.vue'),
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
        component: () => import('pages/collection/Models.vue'),
        meta: { auth: true, layout: 'Main' }
      },
      {
        name: 'collection-model',
        path: ':id/:slug?',
        component: () => import('pages/collection/Model.vue'),
        meta: { auth: true, layout: 'Main' }
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
        component: () => import('pages/tag/Models.vue'),
        meta: { auth: true, layout: 'Main' }
      },
      {
        name: 'tag-model',
        path: ':id/:slug?',
        component: () => import('pages/tag/Model.vue'),
        meta: { auth: true, layout: 'Main' },
        props: true
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
        component: () => import('pages/video/Models.vue'),
        meta: { auth: true, layout: 'Main' }
      },
      {
        name: 'video-model',
        path: ':id/:slug?',
        component: () => import('pages/video/Model.vue'),
        meta: { auth: true, layout: 'Main' }
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
