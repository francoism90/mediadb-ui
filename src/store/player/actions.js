export function setPlayer ({ commit }, payload = {}) {
  const { tracks = {} } = payload

  commit('setTracks', tracks)
  commit('setReady', true)
}

export function resetState ({ commit }) {
  commit('resetState')
}
