import { find } from 'lodash'

export function getQuery (state) {
  return state.query
}

export function getFilter (state) {
  if (!state.filter) {
    return {}
  }

  return find(state.types, { key: state.filter })
}

export function isReady (state) {
  return state.ready
}
