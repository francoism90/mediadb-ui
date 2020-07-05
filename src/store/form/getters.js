import { find, isEmpty } from 'lodash'

export function getData (state) {
  return state.data
}

export function isValid (state) {
  const errors = find(state.validations, { error: true })
  const invalids = find(state.validations, { invalid: true })

  return isEmpty(errors) && isEmpty(invalids)
}
