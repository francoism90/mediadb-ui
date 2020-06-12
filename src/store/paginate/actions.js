import { axiosInstance } from 'boot/axios'

export function create ({ commit, state }, route = {}) {
  const { path = null } = route

  if (path && state.path === null) {
    commit('resetState')
    commit('setRoute', route)
  }

  commit('setReady', true)
}

export async function fetch ({ commit, state }) {
  if (
    state.meta &&
    state.meta.current_page &&
    state.meta.current_page >= state.meta.last_page
  ) {
    return { stop: true }
  }

  // Fail-safe on invalid requests
  if (!state.meta.current_page && state.params['page[number]'] > 1) {
    return { stop: true }
  }

  commit('setLoading', true)

  const response = await axiosInstance.get(state.path, {
    params: state.params
  })

  commit('setItems', response.data)
  commit('increasePage')
  commit('setLoading', false)

  return { stop: false }
}

export function reset ({ commit }, route = {}) {
  // Update route (if needed)
  commit('setRoute', route)

  // Reset all items
  commit('resetId')
  commit('resetItems')
  commit('resetPage')
}
