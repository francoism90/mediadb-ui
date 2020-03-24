import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setComponent (state, payload = null) {
  state.component = payload
}

export function setData (state, payload = {}) {
  state.data = Object.assign({}, state.data, payload)
}

export function setModel (state, payload = false) {
  state.model = payload
}

export function setProps (state, payload = {}) {
  const currentProps = state.props || {}
  const finalProps = { ...currentProps, ...payload }

  state.props = Object.assign({}, state.props, finalProps)
}
