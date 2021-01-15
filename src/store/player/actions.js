export function initialize ({ commit, state }, payload = {}) {
  const { id = null, model = null, requestTime = 0, requestTracks = [] } = payload

  if (id && state.id !== id) {
    commit('resetState')
  }

  commit('setId', id)
  commit('setModel', model)
  commit('setTime', requestTime)
  commit('setTracks', requestTracks)
  commit('setReady', true)
}

export function reset ({ commit }) {
  commit('resetState')
}
