export function initialize ({ commit, state }, payload = {}) {
  const { options = {} } = payload

  if (state.ready) {
    return
  }

  commit('resetState')

  commit('setReady', true)
  commit('setOptions', options)
}

export function setPage ({ commit, getters }, payload = {}) {
  const { data = [], meta = {} } = payload

  commit('setMeta', meta)

  if (!getters.isLoaded && data.length) {
    commit('concatData', data)
    commit('increasePage')
  }
}

export function resetItems ({ commit }, payload = {}) {
  commit('setData')
  commit('setMeta')
  commit('setPage')
  commit('setId', +new Date())
}
