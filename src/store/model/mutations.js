import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function setId (state, payload = null) {
  state.id = payload
}

export function setModel (state, payload = null) {
  state.model = payload
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setState (state, payload) {
  updateField(state, payload)
}
