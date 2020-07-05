export function getModules (state) {
  return [
    {
      namespace: 'search_videos',
      label: 'Videos',
      icon: 'video_library',
      itemComponent: 'Video',
      apiRoute: {
        path: 'media',
        params: {
          include: 'model,tags',
          'filter[query]': state.query,
          'page[size]': 9,
          sort: 'relevance'
        }
      }
    },
    {
      namespace: 'search_channels',
      label: 'Channels',
      icon: 'live_tv',
      itemComponent: 'Channel',
      apiRoute: {
        path: 'channel',
        params: {
          include: 'model,tags',
          'filter[query]': state.query,
          'page[size]': 12,
          sort: 'relevance'
        }
      }
    },
    {
      namespace: 'search_playlists',
      label: 'Playlists',
      icon: 'layers',
      itemComponent: 'Playlist',
      apiRoute: {
        path: 'playlist',
        params: {
          include: 'model,tags',
          'filter[query]': state.query,
          'page[size]': 12,
          sort: 'relevance'
        }
      }
    },
    {
      namespace: 'search_tags',
      label: 'Tags',
      icon: 'label',
      itemComponent: 'Tag',
      apiRoute: {
        path: 'tags',
        params: {
          append: 'media',
          'filter[query]': state.query,
          'page[size]': 12,
          sort: 'relevance'
        }
      }
    }
  ]
}

export function isReady (state) {
  return state.ready
}

export function getType (state, getters) {
  return getters.getModules.find(x => x.namespace === (state.type))
}

export function getQuery (state) {
  return state.query
}
