<template>
  <q-page :key="model.id">
    <collection-title />
    <collection-videos />
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import CollectionModel from 'src/models/Collection'
import ModelModule from 'src/store/model'
import PaginateModule from 'src/store/paginate'

export default {
  async preFetch ({ store, currentRoute, redirect }) {
    if (!store.hasModule('collection')) {
      store.registerModule('collection', ModelModule)
      store.registerModule(['collection', 'videos'], PaginateModule)
    }

    try {
      const model = await CollectionModel.$find(currentRoute.params.id)

      store.dispatch('collection/initialize', {
        id: currentRoute.params.id,
        model: model || null
      })
    } catch {
      redirect({ name: '404' })
    }
  },

  components: {
    CollectionTitle: () => import('components/collection/Title'),
    CollectionVideos: () => import('components/collection/Videos')
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.subscribe(to.params.id)
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.unsubscribe(from.params.id)
    this.subscribe(to.params.id)
    next()
  },

  beforeRouteLeave (to, from, next) {
    this.unsubscribe(from.params.id)
    next()
  },

  meta () {
    return {
      title: this.model.name
    }
  },

  computed: {
    ...mapState('collection', [
      'model'
    ])
  },

  methods: {
    async setModel (id = null) {
      const model = await CollectionModel.$find(id)

      this.$store.commit('collection/setModel', model)
    },

    subscribe (id = null) {
      this.$echo.private(`collection.${id}`)
        .listen('.collection.subscribed', async (e) => {
          await this.setModel(id)
        })
        .listen('.collection.updated', async (e) => {
          await this.setModel(id)

          this.$q.notify({
            type: 'info',
            message: 'Collection has been updated.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })
        })
    },

    unsubscribe (id = null) {
      this.$echo.leave(`collection.${id}`)
    }
  }
}
</script>
