export function initialize ({ commit, state }, payload = {}) {
  const { model = null } = payload

  commit('resetData')
  commit('setModel', model)
  commit('setReady', true)
}

export function reset ({ commit }) {
  commit('resetState')
}
