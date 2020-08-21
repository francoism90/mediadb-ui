import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function setModel (state, payload = {}) {
  state.model = payload
}

export function setTracks (state, payload = []) {
  state.tracks = payload
}

export function addTrack (state, payload = {}) {
  state.tracks.push(payload)
}

export function setBuffered (state, payload = null) {
  state.buffered = payload
}

export function setCurrentTime (state, payload = 0) {
  state.currentTime = payload
}

export function setDuration (state, payload = 0) {
  state.duration = payload
}

export function setError (state, payload = null) {
  state.error = payload
}

export function setEnded (state, payload = false) {
  state.ended = payload
}

export function setMetadata (state, payload = false) {
  state.metadata = payload
}

export function setPlaying (state, payload = false) {
  state.playing = payload
}
