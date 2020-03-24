import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setQuery (state, value) {
  state.query = value
}
