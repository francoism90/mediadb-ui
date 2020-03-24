export function getUser (state) {
  return state.data
}

export function isAuthenticated (state) {
  return (state.data && typeof state.data.id !== 'undefined')
}

export function isReady (state) {
  return state.ready
}
