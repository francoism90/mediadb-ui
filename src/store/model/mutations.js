import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setReady (state, payload) {
  state.ready = payload
}

export function setRoute (state, payload) {
  const { path = null, params = {} } = payload

  const currentParams = state.params || {}
  const finalParams = { ...currentParams, ...params }

  state.path = path || state.path
  state.params = Object.assign({}, state.params, finalParams)
}

export function setModel (state, payload) {
  const { data = {}, meta = {} } = payload

  state.data = Object.assign({}, state.data, data)
  state.meta = Object.assign({}, state.meta, meta)
}
