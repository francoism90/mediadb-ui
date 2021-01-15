import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export const resetState = (state) => {
  state = Object.assign(state, defaultState())
}

export const setState = (state, payload) => {
  updateField(state, payload)
}
