import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function resetPage (state) {
  state.page = 1
}

export function resetItems (state) {
  state.data = []
  state.meta = {}
}

export function resetOptions (state) {
  state.options = {}
}

export function setId (state, value = null) {
  state.id = value || +new Date()
}

export function setData (state, data = []) {
  const currentData = state.data.concat(data)

  state.data = currentData
}

export function setMeta (state, meta = {}) {
  state.meta = meta
}

export function setOption (state, payload = {}) {
  const currentOptions = state.options || {}
  const finalOptions = { ...currentOptions, ...payload }

  state.options = Object.assign({}, state.options, finalOptions)
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function increasePage (state) {
  state.page += 1
}
