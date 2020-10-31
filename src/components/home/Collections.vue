<template>
  <div
    v-if="data.length"
    class="q-pt-lg"
  >
    <div class="text-h6 text-grey-5">
      New collections
    </div>

    <div class="row wrap justify-start items-start content-start q-col-gutter-md q-pt-md">
      <q-intersection
        v-for="(item, index) in data"
        :key="index"
        :disable="!isReady"
        class="col-xs-12 col-sm-6 col-md-3 col-lg-2 collection-item"
      >
        <item :collection="item" />
      </q-intersection>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CollectionModel from 'src/models/Collection'

export default {
  components: {
    Item: () => import('components/collection/Item')
  },

  props: {
    refreshedAt: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState('new-collections', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('new-collections', [
      'isReady'
    ])
  },

  created () {
    this.initialize({
      name: this.refreshedAt
    })

    this.setModels()
  },

  methods: {
    ...mapActions('new-collections', [
      'initialize',
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
