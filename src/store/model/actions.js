export function initialize ({ commit, state }, payload = {}) {
  const { id = null, model = {} } = payload

  if (id && state.id !== id) {
    commit('resetState')
  }

  commit('setId', id)
  commit('setModel', model)
  commit('setReady', true)
}

export function reset ({ commit }) {
  commit('resetState')
}
