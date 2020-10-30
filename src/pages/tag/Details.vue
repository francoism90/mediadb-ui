<template>
  <q-page :key="id">
    <template v-if="error">
      {{ error }}
    </template>

    <template v-if="tag">
      <tag-title :tag="tag" />
      <tag-videos :tag="tag" />
      <tag-collections :tag="tag" />
    </template>
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'
import TagModel from 'src/models/Tag'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('tag-videos')) {
      store.registerModule('tag-videos', PaginateModule)
    }

    if (!store.hasModule('tag-collections')) {
      store.registerModule('tag-collections', PaginateModule)
    }
  },

  components: {
    TagTitle: () => import('components/tag/Title'),
    TagCollections: () => import('components/tag/Collections'),
    TagVideos: () => import('components/tag/Videos')
  },

  props: {
    id: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      error: null,
      title: null,
      tag: null
    }
  },

  watch: {
    $route: 'initialize'
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.initialize()
  },

  beforeDestroy () {
    this.unsubscribe()
  },

  methods: {
    async initialize () {
      this.unsubscribe()

      if (this.tag && this.tag.id !== this.id) {
        this.error = this.title = this.tag = null
      }

      try {
        await this.setModel()

        // Subscribe to events
        this.subscribe()
      } catch {
        this.error = 'Unable to load tag'
      }
    },

    async setModel () {
      this.tag = await TagModel.$find(this.id)
      this.title = this.tag.name
    },

    subscribe () {
      // TODO: add events
    },

    unsubscribe () {
      try {
        // TODO: remove events
      } catch {
        //
      }
    }
  }
}
</script>
