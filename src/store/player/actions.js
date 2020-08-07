export function initialize ({ commit }, payload = {}) {
  const { tracks = [] } = payload

  // Set tracks
  commit('setTracks', tracks)

  // Set ready
  commit('setReady', true)
}

export function reset ({ commit }, payload = {}) {
  // Reset state
  commit('resetState')
}
