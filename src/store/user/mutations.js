import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setReady (state, payload) {
  state.ready = payload
}

export function setUser (state, payload) {
  const { data = {}, meta = {} } = payload

  // Set user data
  state.data = data
  state.meta = meta
}
