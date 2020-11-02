<template>
  <div
    v-if="getTotal > 0"
    class="container fluid q-pt-lg"
  >
    <div class="row no-wrap justify-between items-center content-start">
      <div class="col">
        <div class="text-caption text-uppercase text-grey">
          Collections
        </div>
      </div>

      <div class="col-auto">
        <a
          class="text-caption text-uppercase text-grey cursor-pointer"
          @click="onClick"
        >
          See All
        </a>
      </div>
    </div>

    <q-separator spaced />

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <div class="row wrap justify-start items-start content-start q-col-gutter-md q-pt-sm">
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-3 col-lg-2 collection-item"
        >
          <collection-item :collection="item" />
        </q-intersection>
      </div>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import CollectionModel from 'src/models/Collection'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('tag/collections')

const { mapFields } = createHelpers({
  getterType: 'tag/collections/getOption',
  mutationType: 'tag/collections/setOption'
})

export default {
  components: {
    CollectionItem: () => import('components/collection/Item')
  },

  computed: {
    ...mapState([
      'id',
      'data',
      'page'
    ]),

    ...mapGetters([
      'isLoaded',
      'isReady',
      'getTotal'
    ]),

    ...mapFields([
      'query'
    ]),

    model () {
      return this.$store.getters['tag/getModel']
    }
  },

  created () {
    this.initialize({
      name: this.model.id
    })

    this.setModels()
  },

  methods: {
    ...mapActions([
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await CollectionModel
        .where('query', `tag:${this.model.slug}`)
        .include('tags')
        .append('item_count', 'thumbnail_url')
        .orderBy('recommended')
        .page(1)
        .limit(16)
        .get()

      this.setPage(response)
    },

    async onRefresh (done) {
      await this.setModels()
      done()
    },

    onClick () {
      this.query = 'tag:' + this.model.slug
      this.$router.push({ name: 'collection' })
    }
  }
}
</script>
