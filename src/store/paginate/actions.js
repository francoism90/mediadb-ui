export function initialize ({ commit, state }, payload = {}) {
  const { name = null, options = {} } = payload

  // Reset state on name change
  if (name && state.name !== name) {
    commit('setReady', false)
  }

  if (state.ready) {
    return
  }

  commit('resetState')

  commit('setReady', true)
  commit('setName', name)
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
  const { options = {} } = payload

  commit('setData')
  commit('setMeta')
  commit('setPage')

  commit('setOptions', options)
  commit('setId', +new Date())
}
