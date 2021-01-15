import { updateField } from 'vuex-map-fields'
import defaultState from './state'

export const resetState = (state) => {
  state = Object.assign(state, defaultState())
}

export const setState = (state, payload) => {
  updateField(state, payload)
}

export const setId = (state, payload = null) => {
  state.id = payload
}

export const setModel = (state, payload = {}) => {
  state.model = payload
}

export const setReady = (state, payload = false) => {
  state.ready = payload
}

export const setRate = (state, payload = 1.0) => {
  state.requestRate = payload
}

export const setTime = (state, payload = 0) => {
  state.requestTime = payload
}

export const setTracks = (state, payload = []) => {
  state.requestTracks = payload
}

export const decreaseTime = (state, payload = 10) => {
  state.requestTime = state.currentTime - payload
}

export const increaseTime = (state, payload = 10) => {
  state.requestTime = state.currentTime + payload
}

export const toggleFullscreen = (state) => {
  state.requestFullscreen = !state.requestFullscreen
}

export const togglePlayback = (state) => {
  state.requestPlayback = !state.requestPlayback
}
