export function initialize ({ commit }, payload = {}) {
  const { model = {}, tracks = [] } = payload

  // Reset state
  commit('resetState')

  // Set model
  commit('setModel', model)
  commit('setTracks', tracks)

  // Set ready
  commit('setReady', true)
}

export function reset ({ commit }) {
  commit('resetState')
}
