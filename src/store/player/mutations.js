import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setReady (state, payload) {
  state.ready = payload
}

export function setData (state, payload = {}) {
  const currentState = state.data || {}
  const finalState = { ...currentState, ...payload }

  state.data = Object.assign({}, state.data, finalState)
}

export function setCallback (state, payload) {
  state.callback = payload
}
