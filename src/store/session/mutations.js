import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setData (state, payload = {}) {
  const currentData = state.data || {}
  const finalData = { ...currentData, ...payload }

  state.data = Object.assign({}, state.data, finalData)
}

export function updateDataField (state, payload) {
  updateField(state.data, payload)
}
