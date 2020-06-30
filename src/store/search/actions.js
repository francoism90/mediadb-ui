export async function query ({ commit, dispatch }, payload = {}) {
  const { type = null, query = null } = payload

  // Set query & type (optional)
  commit('setReady', false)
  commit('setType', type)
  commit('setQuery', query)

  // Reset stores to filter on query
  await dispatch('resetStores')

  // Set ready
  commit('setReady', true)
}

export async function resetStores ({ dispatch, getters }) {
  for (const searchModule of getters.getModules) {
    await dispatch(
      searchModule.namespace + '/reset',
      searchModule.apiRoute,
      { root: true }
    )
  }
}
