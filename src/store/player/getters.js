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
      rebufferingGoal: 10,
      bufferingGoal: 90,
      bufferBehind: 60,
      ignoreTextStreamFailures: true,
      jumpLargeGaps: true,
      retryParameters: {
        timeout: 0,
        maxAttempts: 5,
        baseDelay: 300,
        backoffFactor: 2,
        fuzzFactor: 0.5
      }
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
