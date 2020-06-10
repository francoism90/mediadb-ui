export function getTypes (state) {
  return [
    {
      module: 's_default',
      label: 'Videos',
      icon: 'video_library',
      component: 'Video',
      apiRoute: {
        path: 'media',
        params: {
          include: 'model,tags',
          'filter[query]': state.query,
          'page[size]': 15
        }
      }
    },
    {
      module: 's_collects',
      label: 'Collections',
      icon: 'collections',
      component: 'Collection',
      apiRoute: {
        path: 'collect',
        params: {
          include: 'tags,user',
          'filter[query]': state.query,
          'page[size]': 15
        }
      }
    },
    {
      module: 's_users',
      label: 'Users',
      icon: 'people_alt',
      component: 'User',
      apiRoute: {
        path: 'user',
        params: {
          include: 'media',
          'filter[query]': state.query,
          'page[size]': 10
        }
      }
    }
  ]
}

export function getType (state, getters) {
  return getters.getTypes.find(x => x.module === (state.type || 's_default'))
}

export function getQuery (state) {
  return state.query
}
