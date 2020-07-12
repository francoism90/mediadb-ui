
export function getStores (state) {
  return [
    {
      namespace: 'search_videos',
      label: 'Videos',
      icon: 'video_library',
      itemComponent: 'Video',
      apiRoute: {
        path: 'media',
        prefetch: false,
        params: {
          append: 'preview,thumbnail',
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
        prefetch: false,
        params: {
          append: 'thumbnail,items',
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
        prefetch: false,
        params: {
          append: 'thumbnail,items',
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
        prefetch: false,
        params: {
          append: 'items',
          'filter[query]': state.query,
          'page[size]': 12,
          sort: 'relevance'
        }
      }
    }
  ]
}

export function getStore (state, getters) {
  if (!state.store) {
    return null
  }

  return getters.getStores.find(x => x.namespace === (state.store))
}

export function getQuery (state) {
  return state.query
}

export function getItemCount (state, getters, rootState, rootGetters) {
  let items = 0

  for (const store of getters.getStores) {
    items += rootGetters[store.namespace + '/getItemCount']
  }

  return items
}

export function isReady (state) {
  return state.ready
}
