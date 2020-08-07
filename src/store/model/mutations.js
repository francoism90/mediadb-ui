import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setData (state, data = {}) {
  state.data = data
}

export function setMeta (state, meta = {}) {
  state.meta = meta
}

export function setReady (state, payload = false) {
  state.ready = payload
}
