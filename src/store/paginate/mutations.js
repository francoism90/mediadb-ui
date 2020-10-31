import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setReady (state, payload = false) {
  state.ready = payload
}

export function setId (state, payload = null) {
  state.id = payload
}

export function setName (state, payload = null) {
  state.name = payload
}

export function concatData (state, payload = []) {
  state.data = state.data.concat(payload)
}

export function setData (state, payload = []) {
  state.data = payload
}

export function setMeta (state, payload = {}) {
  state.meta = payload
}

export function setPage (state, payload = 1) {
  state.page = payload
}

export function setOption (state, payload) {
  updateField(state.options, payload)

  // Reset data
  state.data = []
  state.meta = {}
  state.page = 1

  // Increase id
  state.id = +new Date()
}

export function setOptions (state, payload = {}) {
  const currentOptions = state.options || {}
  const finalOptions = { ...currentOptions, ...payload }

  state.options = Object.assign({}, state.options, finalOptions)
}

export function increasePage (state) {
  state.page += 1
}
