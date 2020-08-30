export function open ({ commit }, params = {}) {
  const { component = null, options = {}, props = {} } = params

  commit('resetState')

  commit('setComponent', component)
  commit('setOptions', options)
  commit('setProps', props)

  commit('setActive', true)
}

export function close ({ commit }, params = {}) {
  const { options = {} } = params

  commit('setOptions', options)
  commit('setActive', false)
}
