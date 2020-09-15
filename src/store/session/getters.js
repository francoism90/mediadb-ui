import { getField } from 'vuex-map-fields'

export function getDataField (state) {
  return getField(state.data)
}
