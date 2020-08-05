import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setData (state, payload = {}) {
  const currentState = state.data || {}
  const finalState = { ...currentState, ...payload }

  state.data = Object.assign({}, state.data, finalState)
}

export function setTrack (state, payload = {}) {
  state.tracks.push(payload)
}

export function setTracks (state, payload = []) {
  state.tracks = payload
}

export function setModel (state, payload = {}) {
  state.model = Object.assign({}, state.model, payload)
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function setControls (state, payload = false) {
  state.controls = payload
}

export function setFullscreen (state, payload = false) {
  state.fullscreen = payload
}
