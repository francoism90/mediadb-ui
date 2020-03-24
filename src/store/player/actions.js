export function create ({ commit }) {
  commit('setReady', false)
  commit('resetState')

  commit('setReady', true)
}

export function update ({ commit }, params = {}) {
  commit('setData', params)
}

export function callback ({ commit }, params = {}) {
  commit('setCallback', params)
}
