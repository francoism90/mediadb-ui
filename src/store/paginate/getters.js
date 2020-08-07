export function getId (state) {
  return state.id
}

export function getData (state) {
  return state.data
}

export function getMeta (state) {
  return state.meta
}

export function getOptions (state) {
  return state.options
}

export function getItems (state) {
  return state.meta && state.meta.total ? state.meta.total : 0
}

export function isReady (state) {
  return state.ready
}

export function isLoaded (state) {
  // We don't have any reference
  if (!state.meta || !state.meta.last_page) {
    return true
  }

  // We have no more pages
  if (
    state.meta.total === 0 ||
    state.meta.last_page < state.page
  ) {
    return true
  }

  return false
}
