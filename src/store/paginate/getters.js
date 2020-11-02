import { getField } from 'vuex-map-fields'
import { get } from 'lodash'

export function getId (state) {
  return state.id
}

export function getName (state) {
  return state.name
}

export function getData (state) {
  return state.data
}

export function getMeta (state) {
  return state.meta
}

export function getOption (state) {
  return getField(state.options)
}

export function getOptions (state) {
  return state.options
}

export function getTotal (state) {
  return get(state.meta, 'total', 0)
}

export function isReady (state) {
  return state.ready
}

export function isLoaded (state) {
  const lastPage = get(state.meta, 'last_page', 1)
  const total = get(state.meta, 'total', 0)

  if ((!total || !lastPage) || (total === 0 || lastPage < state.page)) {
    return true
  }

  return false
}
