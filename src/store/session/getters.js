import { getField } from 'vuex-map-fields'

export const getState = (state) => {
  return getField(state)
}
