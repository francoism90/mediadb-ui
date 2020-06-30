import { axiosInstance } from 'boot/axios'

export async function create ({ commit, dispatch, state }, route = {}) {
  const { path = null } = route

  commit('setReady', false)

  if (path && state.path === null) {
    commit('resetState')
    commit('setRoute', route)

    // Fetch first page
    await dispatch('fetch')
  }

  // Set as ready
  commit('setReady', true)
}

export async function fetch ({ commit, getters, state }) {
  // We got all results
  if (getters.isLastPage) {
    return
  }

  commit('setLoading', true)

  const response = await axiosInstance.get(state.path, {
    params: state.params
  })

  commit('setItems', response.data)
  commit('increasePage')
  commit('setLoading', false)
}

export async function reset ({ commit, dispatch }, route = {}) {
  // Update route (if needed)
  commit('setReady', false)
  commit('setRoute', route)

  // Reset all items
  commit('resetId')
  commit('resetItems')
  commit('resetPage')

  // Fetch first page
  await dispatch('fetch')

  // Set ready
  commit('setReady', true)
}
