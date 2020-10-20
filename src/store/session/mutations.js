import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setState (state, payload) {
  updateField(state, payload)
}
