export function isReady (state) {
  return state.ready
}

export function getData (state) {
  return state.data
}

export function getTracks (state) {
  return state.tracks
}

export function getKeyBindings () {
  return {
    edit: ['c'],
    rewind: ['arrowleft'],
    forward: ['arrowright'],
    info: ['d'],
    save: ['a'],
    frameshot: ['s'],
    toggleFullscreen: ['f'],
    togglePlay: ['space']
  }
}
