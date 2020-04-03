export function getData (state) {
  return state.data
}

export function getMeta (state) {
  return state.meta
}

export function isAuthenticated (state) {
  return (state.data && typeof state.data.id !== 'undefined')
}

export function isReady (state) {
  return state.ready
}
