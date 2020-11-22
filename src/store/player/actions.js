export function initialize ({ commit, state }, payload = {}) {
  const { id = null, model = null, startTime = 0, textTracks = [] } = payload

  if (id && state.id !== id) {
    commit('resetState')
  }

  commit('setId', id)
  commit('setModel', model)
  commit('setSeekTime', startTime)
  commit('setTextTracks', textTracks)
  commit('setReady', true)
}

export function reset ({ commit }) {
  commit('resetState')
}
