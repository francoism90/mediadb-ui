export function query ({ commit, dispatch, getters, state }, payload = {}) {
  const { type = null, query = null } = payload

  commit('setType', type || state.type)
  commit('setQuery', query)

  // Create the paginate module
  dispatch(
    getters.getType.module + '/create',
    getters.getType.apiRoute,
    { root: true }
  )

  // Reset the paginate module
  dispatch(
    getters.getType.module + '/reset',
    getters.getType.apiRoute,
    { root: true }
  )
}
