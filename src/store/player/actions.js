export function initialize ({ commit }, payload = {}) {
  const { model = {}, tracks = [] } = payload

  commit('resetState')

  commit('setModel', model)
  commit('setTracks', tracks)

  commit('setReady', true)
}
