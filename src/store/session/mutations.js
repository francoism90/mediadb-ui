import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function setUser (state, payload = {}) {
  const { data = {}, meta = {} } = payload

  state.data = Object.assign({}, state.data, data)
  state.meta = Object.assign({}, state.meta, meta)
}
