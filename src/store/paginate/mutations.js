import { updateField } from 'vuex-map-fields'
import { findIndex, remove } from 'lodash'
import defaultState from './state'

export const resetState = (state) => {
  state = Object.assign(state, defaultState())
}

export const setReady = (state, payload = false) => {
  state.ready = payload
}

export const setId = (state, payload = null) => {
  state.id = payload || +new Date()
}

export const setName = (state, payload = null) => {
  state.name = payload
}

export const concatData = (state, payload = []) => {
  state.data = state.data.concat(payload)
}

export const removeData = (state, payload = []) => {
  remove(state.data, payload)
}

export const setData = (state, payload = []) => {
  state.data = payload
}

export const updateData = (state, payload = {}) => {
  const { attributes = {}, values = null } = payload

  const index = findIndex(state.data, attributes)

  if (index >= 0) {
    state.data.splice(index, 1, values)
  }
}

export const setMeta = (state, payload = []) => {
  state.meta = payload
}

export const setPage = (state, payload = 1) => {
  state.page = payload
}

export const setOption = (state, payload) => {
  updateField(state.options, payload)

  // Reset data
  state.data = []
  state.meta = {}
  state.page = 1

  // Increase id
  state.id = +new Date()
}

export const setOptions = (state, payload = {}) => {
  const currentOptions = state.options || {}
  const finalOptions = { ...currentOptions, ...payload }

  state.options = Object.assign({}, state.options, finalOptions)
}

export const increasePage = (state) => {
  state.page += 1
}
