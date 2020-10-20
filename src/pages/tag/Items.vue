<template>
  <q-page class="container horizontal fluid">
    <q-btn-group
      class="q-pb-md"
      unelevated
    >
      <q-select
        v-model="sorter"
        :options="sorters"
        :loading="!isReady"
        dropdown-icon="keyboard_arrow_down"
        dense
        square
      />

      <q-select
        v-model="type"
        :options="types"
        :loading="!isReady"
        class="q-ml-lg"
        dropdown-icon="keyboard_arrow_down"
        dense
        square
      />
    </q-btn-group>

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :disable="!isReady"
        class="row wrap justify-start items-start content-start q-col-gutter-md"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 tag-item"
        >
          <tag-item :tag="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import PaginateModule from 'src/store/paginate'
import TagModel from 'src/models/Tag'

const { mapFields } = createHelpers({
  getterType: 'tags/getOption',
  mutationType: 'tags/setOption'
})

export default {
  preFetch ({ store }) {
    if (!store.hasModule('tags')) {
      store.registerModule('tags', PaginateModule)
    }
  },

  components: {
    TagItem: () => import('components/tag/Item')
  },

  data () {
    return {
      sorters: [
        { label: 'A-Z', value: 'name' },
        { label: 'Number of Items', value: 'items' }
      ],
      types: [
        { label: 'All Types', value: '*' },
        { label: 'Genres', value: 'genre' },
        { label: 'Actors', value: 'actor' },
        { label: 'Studios', value: 'studio' },
        { label: 'Languages', value: 'language' }
      ]
    }
  },

  meta () {
    return {
      title: 'Tags'
    }
  },

  computed: {
    ...mapState('tags', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('tags', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter',
      'type'
    ])
  },

  created () {
    this.initialize({
      options: {
        sorter: this.sorters[0],
        type: this.types[0]
      }
    })
  },

  methods: {
    ...mapActions('tags', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await TagModel
        .where('type', this.type.value)
        .append('item_count')
        .orderBy(this.sorter.value)
        .page(this.page)
        .limit(30)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      await this.setModels()
      done(this.isLoaded)
    },

    async onRefresh (done) {
      await this.resetItems()
      done()
    }
  }
}
</script>
