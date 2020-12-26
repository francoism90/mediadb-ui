<template>
  <q-page :key="model.id">
    <info />
    <videos />
    <collections />
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import ModelModule from 'src/store/model'
import PaginateModule from 'src/store/paginate'
import TagModel from 'src/models/Tag'

export default {
  async preFetch ({ store, currentRoute, redirect }) {
    if (!store.hasModule('tag')) {
      store.registerModule('tag', ModelModule)
      store.registerModule(['tag', 'collections'], PaginateModule)
      store.registerModule(['tag', 'videos'], PaginateModule)
    }

    try {
      const model = await TagModel.$find(currentRoute.params.id)

      store.dispatch('tag/initialize', {
        id: currentRoute.params.id,
        model: model || null
      })
    } catch {
      redirect({ name: '404' })
    }
  },

  components: {
    Collections: () => import('components/tag/List'),
    Info: () => import('components/tag/Info'),
    Videos: () => import('components/tag/List')
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
    ...mapState('tag', [
      'model'
    ])
  },

  methods: {
    async setModel (id = null) {
      const model = await TagModel.$find(id)

      this.$store.commit('tag/setModel', model)
    },

    subscribe (id = null) {
      this.$echo.private(`tag.${id}`)
        .listen('.tag.deleted', async (e) => {
          this.$q.notify({
            type: 'info',
            message: 'Tag has been deleted.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })

          if (this.$store.hasModule('tags')) {
            this.$store.commit('tags/removeData', { id: id })
          }
        })
        .listen('.tag.updated', async (e) => {
          await this.setModel(id)

          this.$q.notify({
            type: 'info',
            message: 'Tag has been updated.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })

          if (this.$store.hasModule('tags')) {
            this.$store.commit('tags/updateData', {
              attributes: { id: id },
              values: this.model
            })
          }
        })
    },

    unsubscribe (id = null) {
      this.$echo.leave(`tag.${id}`)
    }
  }
}
</script>
