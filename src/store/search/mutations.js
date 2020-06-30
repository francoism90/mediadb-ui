import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setQuery (state, value = null) {
  state.query = value
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function setType (state, value = null) {
  state.type = value
}
