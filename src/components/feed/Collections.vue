<template>
  <div :key="id">
    <template v-if="data.length">
      <div class="q-pb-md text-h6 text-grey-5">
        New collections
      </div>

      <div class="row wrap justify-start items-start content-start q-col-gutter-lg">
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 collection-item"
        >
          <item :collection="item" />
        </q-intersection>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CollectionModel from 'src/models/Collection'

export default {
  components: {
    Item: () => import('components/collection/Item')
  },

  computed: {
    ...mapState('feed-collections', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('feed-collections', [
      'isReady'
    ])
  },

  watch: {
    id (value) {
      this.setModels()
    }
  },

  created () {
    this.setModels()
  },

  methods: {
    ...mapActions('feed-collections', [
      'setPage'
    ]),

    async setModels () {
      if (this.page >= 2) {
        return
      }

      const response = await CollectionModel
        .include('tags')
        .append('item_count', 'thumbnail_url')
        .orderBy('-created_at')
        .page(1)
        .limit(6)
        .get()

      this.setPage(response)
    }
  }
}
</script>
