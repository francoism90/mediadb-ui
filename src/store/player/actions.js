export function initialize ({ commit }, payload = {}) {
  const { model = {}, tracks = [] } = payload

  commit('setModel', model)
  commit('setTracks', tracks)

  commit('setReady', true)
}

export function reset ({ commit }) {
  commit('resetState')
}
