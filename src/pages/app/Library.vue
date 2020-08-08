<template>
  <q-page class="container fluid">
    <q-btn-group
      class="q-py-md"
      unelevated
    >
      <q-select
        v-model="sorter"
        :options="sorters"
        :loading="!ready"
        dark
        dense
        dropdown-icon="keyboard_arrow_down"
        options-dark
        square
      />
    </q-btn-group>

    <q-pull-to-refresh
      :disable="!ready"
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
            class="col-xs-12 col-sm-6 col-md-4 col-lg-2"
          >
            <media-item :data="item" />
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
import Media from 'src/models/Media'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('library')) {
      store.registerModule('library', paginateModule)
    }
  },

  components: {
    MediaItem: () => import('components/media/Item')
  },

  data () {
    return {
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most Recent', value: 'recent' },
        { label: 'Most Viewed', value: 'views' }
      ]
    }
  },

  computed: {
    ...mapState('library', [
      'id',
      'data',
      'options',
      'page',
      'ready'
    ]),

    ...mapGetters('library', [
      'isLoaded'
    ]),

    sorter: {
      get () {
        return this.options.sorter || this.sorters[0]
      },

      set (value) {
        this.resetPages({ sorter: value })
      }
    }
  },

  meta () {
    return {
      title: 'Library'
    }
  },

  methods: {
    ...mapActions('library', [
      'resetItems',
      'resetPages',
      'setPage'
    ]),

    async setModels () {
      const response = await Media
        .include(['model', 'tags'])
        .append(['preview_url', 'thumbnail_url'])
        .orderBy(this.sorter.value)
        .page(this.page)
        .limit(12)
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
