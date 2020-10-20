import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function resetData (state) {
  state.data = Object.assign(state.data, defaultState().data)
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function setModel (state, payload = null) {
  state.data.model = payload
}

export function setState (state, payload) {
  updateField(state, payload)
}
