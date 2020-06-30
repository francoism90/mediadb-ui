export function getData (state) {
  return state.data
}

export function getMeta (state) {
  return state.meta
}

export function getTotal (state) {
  return state.meta && state.meta.total ? state.meta.total : 0
}

export function isReady (state) {
  return state.ready
}

export function isLastPage (state) {
  if (state.meta && state.meta.current_page &&
      state.meta.current_page >= state.meta.last_page) {
    return true
  }

  // Fail-save
  if (state.params['page[number]'] > 1 && !state.meta.current_page) {
    return true
  }

  return false
}

export function isLoading (state) {
  return state.loading
}
