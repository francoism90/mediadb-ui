export function setPage ({ commit, getters, state }, payload = {}) {
  const { data = [], meta = {} } = payload

  commit('setReady', false)
  commit('setMeta', meta)

  if (!getters.isLoaded && data.length) {
    commit('setData', data)
    commit('increasePage')
  }

  commit('setReady', true)
}

export function resetItems ({ commit }, payload = {}) {
  const { id = null } = payload

  commit('resetItems')
  commit('resetPage')
  commit('setId', id)
}

export function resetState ({ commit }, payload = {}) {
  const { id = null } = payload

  commit('resetState')
  commit('setId', id)
  commit('setOption', payload)
}
