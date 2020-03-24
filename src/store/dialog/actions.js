export function open ({ commit }, params = {}) {
  const { component = null, data = {}, props = {} } = params

  commit('resetState')

  commit('setComponent', component)
  commit('setData', data)
  commit('setProps', props)

  commit('setModel', true)
}

export function close ({ commit }, params = {}) {
  const { props = {} } = params

  commit('setProps', props)
  commit('setModel', false)
}
