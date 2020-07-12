export async function query ({ commit, dispatch }, payload = {}) {
  const { store = null, query = null } = payload

  // Set query & store (optional)
  commit('setReady', false)
  commit('setStore', store)
  commit('setQuery', query)

  // Reset stores to filter on query
  await dispatch('resetStores')

  // Set ready
  commit('setReady', true)
}

export async function resetStores ({ dispatch, getters }) {
  for (const searchModule of getters.getStores) {
    await dispatch(
      searchModule.namespace + '/reset',
      searchModule.apiRoute,
      { root: true }
    )
  }
}
