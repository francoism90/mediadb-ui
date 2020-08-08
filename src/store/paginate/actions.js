export function setPage ({ commit, getters, rootState }, payload = {}) {
  const { data = [], meta = {} } = payload

  // Set ready
  commit('setReady', false)

  // Set meta
  commit('setMeta', meta)

  // Set data
  if (!getters.isLoaded && data.length) {
    commit('setData', data)
    commit('increasePage')
  }

  // Set ready
  commit('setReady', true)
}

export function resetItems ({ commit }) {
  // Regenerate id
  commit('setId')

  // Reset state
  commit('resetItems')
  commit('resetPage')
}

export function resetPages ({ commit }, payload = {}) {
  // Reset state
  commit('resetState')

  // Set option
  commit('setOption', payload)
}
