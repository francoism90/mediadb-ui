export function initialize ({ commit, state }, payload = {}) {
  const { name = null, options = {} } = payload

  if (name && state.name !== name) {
    commit('resetState')
  }

  commit('setName', name)
  commit('setOptions', options)
  commit('setReady', true)
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
  const { id = null, options = {} } = payload

  commit('setData')
  commit('setMeta')
  commit('setPage')

  commit('setOptions', options)
  commit('setId', id)
}
