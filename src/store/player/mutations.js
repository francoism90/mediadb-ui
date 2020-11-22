import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function setId (state, payload = false) {
  state.id = payload
}

export function setModel (state, payload = null) {
  state.model = payload
}

export function setSeekTime (state, payload = null) {
  state.seekTime = payload
}

export function setTextTracks (state, payload = []) {
  state.textTracks = payload
}

export function setState (state, payload) {
  updateField(state, payload)
}
