export function setQuery ({ commit }, params = {}) {
  const { filter = null, query = null } = params

  commit('resetState')
  commit('setFilter', filter)
  commit('setQuery', query)
}

export function resetState ({ commit }) {
  commit('resetState')
}
