import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export const resetState = (state) => {
  state = Object.assign(state, defaultState())
}

export const setId = (state, payload = null) => {
  state.id = payload
}

export const setModel = (state, payload = {}) => {
  state.model = payload
}

export const setReady = (state, payload = false) => {
  state.ready = payload
}

export const setState = (state, payload) => {
  updateField(state, payload)
}
