import { getField } from 'vuex-map-fields'

export function getState (state) {
  return getField(state)
}

export function getModel (state) {
  return state.model
}
