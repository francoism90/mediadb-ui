import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setComponent (state, payload = null) {
  state.component = payload
}

export function setActive (state, payload = false) {
  state.active = payload
}

export function setOptions (state, payload = {}) {
  const currentOptions = state.options || {}
  const finalOptions = { ...currentOptions, ...payload }

  state.options = Object.assign({}, state.options, finalOptions)
}

export function setProps (state, payload = {}) {
  state.props = Object.assign({}, state.props, payload)
}
