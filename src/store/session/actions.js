export function resetState ({ commit }) {
  commit('resetState')
}

export function setData ({ commit }, payload = {}) {
  commit('setData', payload)
}
