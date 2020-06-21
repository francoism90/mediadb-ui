export function query ({ commit, dispatch, state }, payload = {}) {
  const { type = null, query = null } = payload

  commit('setType', type || state.type)
  commit('setQuery', query)

  dispatch('resetStores')
}

export function resetStores ({ dispatch, getters }) {
  for (const type of getters.getTypes) {
    dispatch(
      type.module + '/create',
      type.apiRoute,
      { root: true }
    )

    dispatch(
      type.module + '/reset',
      type.apiRoute,
      { root: true }
    )
  }
}
