import { getField } from 'vuex-map-fields'

export function getState (state) {
  return getField(state)
}

export function getSearch (state) {
  return state.search
}
