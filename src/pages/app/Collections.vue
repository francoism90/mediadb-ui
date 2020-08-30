<template>
  <q-page class="container fluid">
    <q-btn-group
      class="q-py-md"
      unelevated
    >
      <q-select
        v-model="sorter"
        :options="sorters"
        :loading="!isReady"
        dark
        dense
        dropdown-icon="keyboard_arrow_down"
        options-dark
        square
        class="q-mr-lg"
      />

      <q-select
        v-model="type"
        :options="types"
        :loading="!isReady"
        dark
        dense
        dropdown-icon="keyboard_arrow_down"
        options-dark
        square
      />
    </q-btn-group>

    <q-pull-to-refresh
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :key="id"
        :debounce="300"
        @load="onLoad"
      >
        <div class="row q-col-gutter-md items">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
          >
            <collection-item :data="item" />
          </div>
        </div>

        <template v-slot:loading>
          <div class="row no-wrap justify-center q-my-md">
            <q-spinner
              color="primary"
              size="40px"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Collection from 'src/models/Collection'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('collections')) {
      store.registerModule('collections', paginateModule)
    }
  },

  components: {
    CollectionItem: () => import('components/collection/Item')
  },

  data () {
    return {
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Alphabetical', value: 'name' },
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Most Viewed', value: 'views' }
      ],
      types: [
        { label: 'All Collections', value: '*' },
        { label: 'My Collections', value: 'user' },
        { label: 'Community', value: 'community' }
      ]
    }
  },

  computed: {
    ...mapState('collections', [
      'id',
      'data',
      'options',
      'page'
    ]),

    ...mapGetters('collections', [
      'isLoaded',
      'isReady'
    ]),

    sorter: {
      get () {
        return this.options.sorter || this.sorters[0]
      },

      set (value) {
        this.resetState({ sorter: value })
      }
    },

    type: {
      get () {
        return this.options.type || this.types[0]
      },

      set (value) {
        this.resetState({ type: value })
      }
    }
  },

  meta () {
    return {
      title: 'Collections'
    }
  },

  methods: {
    ...mapActions('collections', [
      'resetItems',
      'resetState',
      'setPage'
    ]),

    async setModels () {
      const response = await Collection
        .where('type', this.type.value)
        .include(['model', 'tags'])
        .append(['item_count', 'thumbnail_url'])
        .orderBy(this.sorter.value)
        .page(this.page)
        .limit(16)
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
