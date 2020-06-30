import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setComponent (state, payload = null) {
  state.component = payload
}

export function setData (state, payload = {}) {
  state.data = Object.assign({}, state.data, payload)
}

export function setActive (state, payload = false) {
  state.active = payload
}

export function setOptions (state, payload = {}) {
  const currentOptions = state.options || {}
  const finalOptions = { ...currentOptions, ...payload }

  state.options = Object.assign({}, state.options, finalOptions)
}
