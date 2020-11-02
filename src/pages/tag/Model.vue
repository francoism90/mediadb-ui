<template>
  <q-page :key="model.id">
    <tag-title />
    <tag-videos />
    <tag-collections />
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
    TagTitle: () => import('components/tag/Title'),
    TagCollections: () => import('components/tag/Collections'),
    TagVideos: () => import('components/tag/Videos')
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
  }
}
</script>
