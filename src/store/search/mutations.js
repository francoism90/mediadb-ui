import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setFilter (state, payload = null) {
  state.filter = payload
}

export function setQuery (state, payload = null) {
  state.query = payload
}
