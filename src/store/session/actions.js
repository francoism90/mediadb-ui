export function resetState ({ commit }) {
  commit('resetState')
}

export function setSession ({ commit }, payload = {}) {
  const { data = {} } = payload

  commit('setData', data)
}
