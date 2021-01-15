import { getField } from 'vuex-map-fields'
import { get } from 'lodash'

export const getId = (state) => {
  return state.id
}

export const getName = (state) => {
  return state.name
}

export const getData = (state) => {
  return state.data
}

export const getMeta = (state) => {
  return state.meta
}

export const getOption = (state) => {
  return getField(state.options)
}

export const getOptions = (state) => {
  return state.options
}

export const getTotal = (state) => {
  return get(state.meta, 'total', 0)
}

export const isReady = (state) => {
  return state.ready
}

export const isLoaded = (state) => {
  const lastPage = get(state.meta, 'last_page', 1)
  const total = get(state.meta, 'total', 0)

  if ((!total || !lastPage) || (total === 0 || lastPage < state.page)) {
    return true
  }

  return false
}
