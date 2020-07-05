import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setData (state, payload = {}) {
  const currentData = state.data || {}
  const finalData = { ...currentData, ...payload }

  state.data = Object.assign({}, state.data, finalData)
}

export function setValidation (state, payload = {}) {
  const currentValidations = state.validations || {}
  const finalValidations = { ...currentValidations, ...payload }

  state.validations = Object.assign({}, state.validations, finalValidations)
}
