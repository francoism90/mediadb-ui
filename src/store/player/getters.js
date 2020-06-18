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
      ignoreTextStreamFailures: true,
      jumpLargeGaps: true,
      retryParameters: {
        timeout: 0,
        maxAttempts: 3,
        baseDelay: 250,
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
    'waiting'
  ]
}

export function getPropsBindings () {
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
    save: ['a'],
    snapshot: ['s'],
    toggleFullscreen: ['f'],
    togglePlay: ['space']
  }
}
