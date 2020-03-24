import defaultState from './state'

export function resetState (state) {
  state = Object.assign(state, defaultState())
}

export function setRoute (state, payload) {
  const { path = null, params = {} } = payload

  const currentParams = state.params || {}
  const finalParams = { ...currentParams, ...params }

  state.path = path || state.path
  state.params = Object.assign({}, state.params, finalParams)
}

export function setLoading (state, payload) {
  state.loading = payload
}

export function setReady (state, payload) {
  state.ready = payload
}

export function resetItems (state) {
  state.data = []
  state.meta = {}
}

export function setItems (state, payload) {
  const { data = [], meta = {} } = payload

  if (meta) {
    state.meta = meta

    if (data.length && meta.current_page <= meta.last_page) {
      const moduleData = state.data.concat(data)

      state.data = moduleData
    }
  }
}

export function resetPage (state) {
  state.params['page[number]'] = 1
}

export function increasePage (state) {
  state.params['page[number]']++
}
