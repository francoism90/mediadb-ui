import { sync } from 'vuex-router-sync'

export default function ({ Vue, router, store }) {
  sync(store, router)
}
