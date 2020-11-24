<template>
  <div
    v-if="getTotal > 0"
    class="container fluid q-pt-lg"
  >
    <div class="q-pb-md">
      <span class="text-h6 text-grey-5">Collections</span>
      <span
        class="q-ml-md text-caption text-grey-5 cursor-pointer"
        @click="onClick"
      >
        See All
      </span>
    </div>

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
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
    Item: () => import('components/collection/Item')
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
      this.$store.dispatch('collections/resetItems', {
        options: {
          query: 'tag:' + this.model.slug
        }
      })

      this.$router.push({ name: 'collection' })
    }
  }
}
</script>
