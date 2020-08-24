export function initialize ({ commit }, payload = {}) {
  const { model = {} } = payload

  commit('setModel', model)
  commit('setReady', true)
}

export function reset ({ commit }) {
  commit('resetState')
}
