<template>
  <div class="container scroll-y q-pb-md">
    <div class="q-py-lg text-caption text-uppercase">
      Featured in Collections
    </div>

    <div class="row q-col-gutter-md items">
      <div
        v-for="(item, index) in state.data"
        :key="index"
        class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
      >
        <collection-item :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Collection from 'src/models/Collection'

export default {
  components: {
    CollectionItem: () => import('components/collection/Item')
  },

  props: {
    namespace: {
      type: String,
      required: true
    }
  },

  computed: {
    model () {
      return this.$store.state.video
    },

    state () {
      return this.model[this.namespace]
    },

    isLoaded () {
      return this.$store.getters[`video/${this.namespace}/isLoaded`]
    },

    isReady () {
      return this.$store.getters[`video/${this.namespace}/isReady`]
    }
  },

  created () {
    this.setModels()
  },

  methods: {
    setPage (payload = {}) {
      this.$store.dispatch(`video/${this.namespace}/setPage`, payload)
    },

    async setModels () {
      const response = await Collection
        .where('video', this.model.data.id)
        .include(['model', 'tags'])
        .append(['item_count', 'thumbnail_url'])
        .orderBy('relevance')
        .page(1)
        .limit(4)
        .get()

      this.setPage(response)
    }
  }
}
</script>
