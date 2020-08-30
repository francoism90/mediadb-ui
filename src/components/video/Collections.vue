<template>
  <div
    :key="id"
    class="container scroll-y q-pb-md"
  >
    <div class="q-py-lg text-caption text-uppercase">
      Featured in Collections
    </div>

    <div class="row q-col-gutter-md items">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
      >
        <collection-item :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Collection from 'src/models/Collection'

const { mapState, mapActions } = createNamespacedHelpers('video/collections')

export default {
  components: {
    CollectionItem: () => import('components/collection/Item')
  },

  props: {
    model: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState([
      'id',
      'data'
    ])
  },

  async created () {
    await this.setModels()
  },

  beforeDestroy () {
    this.resetState()
  },

  methods: {
    ...mapActions([
      'resetState',
      'setPage'
    ]),

    async setModels () {
      const response = await Collection
        .where('video', this.model.id)
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
