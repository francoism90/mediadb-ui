export function isReady (state) {
  return state.ready
}

export function getData (state) {
  return state.data
}

export function getTracks (state) {
  return state.tracks
}

export function getDataBindings () {
  return [
    'buffered',
    'currentTime',
    'duration',
    'ended',
    'error',
    'muted',
    'paused',
    'readyState'
  ]
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

export function getPlayerSettings () {
  return {
    streaming: {
      rebufferingGoal: 2,
      bufferingGoal: 10,
      bufferBehind: 30,
      jumpLargeGaps: true,
      ignoreTextStreamFailures: true,
      alwaysStreamText: true
    }
  }
}
