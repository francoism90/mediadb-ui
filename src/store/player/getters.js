export function isReady (state) {
  return state.ready
}

export function getData (state) {
  return state.data
}

export function getModel (state) {
  return state.model
}

export function getShakaOptions () {
  return {
    streaming: {
      rebufferingGoal: 2,
      bufferingGoal: 10,
      bufferBehind: 30,
      jumpLargeGaps: true
    }
  }
}

export function getEventListeners () {
  return [
    'durationchange',
    'emptied',
    'error',
    'ended',
    'loadedmetadata',
    'pause',
    'play',
    'playing',
    'progress',
    'seeked',
    'seeking',
    'stalled',
    'suspend',
    'timeupdate',
    'waiting'
  ]
}

export function getPlayerBindings () {
  return [
    'buffered',
    'currentTime',
    'duration',
    'ended',
    'error',
    'paused',
    'readyState'
  ]
}

export function getKeyBindings () {
  return {
    edit: ['c'],
    info: ['d'],
    save: ['a'],
    snapshot: ['s'],
    toggleFullscreen: ['f'],
    togglePlay: ['space']
  }
}
