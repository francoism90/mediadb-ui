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
          'page[size]': 12
        }
      }
    },
    {
      module: 's_channels',
      label: 'Channels',
      icon: 'live_tv',
      component: 'Channel',
      apiRoute: {
        path: 'channel',
        params: {
          include: 'model,tags',
          'filter[query]': state.query,
          'page[size]': 16
        }
      }
    },
    {
      module: 's_playlists',
      label: 'Playlists',
      icon: 'layers',
      component: 'Playlist',
      apiRoute: {
        path: 'playlist',
        params: {
          include: 'model,tags',
          'filter[query]': state.query,
          'page[size]': 16
        }
      }
    },
    {
      module: 's_tags',
      label: 'Tags',
      icon: 'label',
      component: 'Tag',
      apiRoute: {
        path: 'tags',
        params: {
          append: 'media',
          'filter[query]': state.query,
          'page[size]': 16
        }
      }
    }
  ]
}

export function getType (state, getters) {
  return getters.getTypes.find(x => x.module === (state.type))
}

export function getQuery (state) {
  return state.query
}
