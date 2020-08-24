import { filter } from 'lodash'

export function isReady (state) {
  return state.ready
}

export function getData (state) {
  return state.data
}

export function getTracks (state) {
  return state.tracks
}

export function getSubtitles (state) {
  return filter(state.tracks, { kind: 'subtitles' })
}
