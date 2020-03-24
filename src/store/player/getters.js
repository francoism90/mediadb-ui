export function getData (state) {
  return state.data
}

export function isReady (state) {
  return state.ready
}

export function getShakaOptions () {
  return {
    retryParameters: {
      timeout: 0,
      maxAttempts: 5,
      baseDelay: 400,
      backoffFactor: 2,
      fuzzFactor: 0.5
    },
    streaming: {
      rebufferingGoal: 10,
      bufferingGoal: 120,
      bufferBehind: 90,
      ignoreTextStreamFailures: true,
      jumpLargeGaps: true,
      stallEnabled: true
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
    'volumechange',
    'waiting'
  ]
}

export function getKeyBindings () {
  return {
    edit: ['c'],
    snapshot: ['s'],
    toggleFullscreen: ['f'],
    toggleMute: ['m'],
    togglePlay: ['space']
  }
}
