<template>
  <div
    v-if="getTotal > 0"
    class="container q-pt-lg"
  >
    <div class="row no-wrap justify-between items-center content-start">
      <div class="col">
        <div class="text-h6 text-grey-5">
          Collections
        </div>
      </div>

      <div class="col-auto">
        <q-btn
          flat
          color="grey"
          @click="onClick"
        >
          See All
        </q-btn>
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
import { createHelpers } from 'vuex-map-fields'
import { mapActions, mapState, mapGetters } from 'vuex'
import TagModel from 'src/models/Tag'
import CollectionModel from 'src/models/Collection'

const { mapFields } = createHelpers({
  getterType: 'collections/getOption',
  mutationType: 'collections/setOption'
})

export default {
  components: {
    CollectionItem: () => import('components/collection/Item')
  },

  props: {
    tag: {
      type: TagModel,
      required: true
    }
  },

  computed: {
    ...mapState('tag-collections', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('tag-collections', [
      'isLoaded',
      'isReady',
      'getTotal'
    ]),

    ...mapFields([
      'query'
    ])
  },

  created () {
    this.initialize({
      name: this.tag.id
    })

    this.setModels()
  },

  methods: {
    ...mapActions('tag-collections', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await CollectionModel
        .where('query', `tag:${this.tag.slug}`)
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
      this.query = 'tag:' + this.tag.slug
      this.$router.push({ name: 'collection' })
    }
  }
}
</script>
