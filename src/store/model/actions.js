export function setModel ({ commit }, payload = {}) {
  const { data = {}, meta = {} } = payload

  commit('setReady', false)

  commit('setData', data)
  commit('setMeta', meta)

  commit('setReady', true)
}

export function resetModel ({ commit, dispatch }, payload = {}) {
  const { data = {}, meta = {} } = payload

  commit('resetState')

  if (data || meta) {
    dispatch('setModel', payload)
  }
}
