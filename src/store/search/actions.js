export function query ({ commit }, payload = null) {
  commit('setQuery', payload)
}
