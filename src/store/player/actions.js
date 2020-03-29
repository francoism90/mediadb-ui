export function create ({ commit }, model = {}) {
  // Reset current state
  commit('setReady', false)
  commit('resetState')

  // Set model
  commit('setModel', model)
  commit('setReady', true)
}

export function update ({ commit }, params = {}) {
  commit('setData', params)
}

export function callback ({ commit }, params = {}) {
  commit('setCallback', params)
}
