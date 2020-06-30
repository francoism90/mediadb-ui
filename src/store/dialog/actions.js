export function open ({ commit }, params = {}) {
  const { component = null, data = {}, props = {} } = params

  commit('resetState')

  commit('setComponent', component)
  commit('setData', data)
  commit('setOptions', props)

  commit('setActive', true)
}

export function close ({ commit }, params = {}) {
  const { props = {} } = params

  commit('setOptions', props)
  commit('setActive', false)
}
