<template>
  <main>
    <div class="q-pt-lg text-caption">
      About {{ meta.total || 0 | approximate }} media for <i>{{ query }}</i>
    </div>

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
      :key="id"
      :disable="!ready"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
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
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Media from 'src/models/Media'

export default {
  components: {
    MediaItem: () => import('components/media/Item')
  },

  props: {
    query: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      sorters: [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most Recent', value: 'recent' },
        { label: 'Most Viewed', value: 'views' },
        { label: 'Shortest to Longest', value: 'shortest' },
        { label: 'Longest to Shortest', value: 'longest' }
      ]
    }
  },

  computed: {
    ...mapState('search_media', [
      'id',
      'data',
      'meta',
      'options',
      'page',
      'ready'
    ]),

    ...mapGetters('search_media', [
      'getIsLoaded'
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
      title: this.query
    }
  },

  methods: {
    ...mapActions('search_media', [
      'resetPages',
      'setPage'
    ]),

    async setModels () {
      const response = await Media
        .where('query', this.query)
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
      done(this.getIsLoaded)
    },

    async onRefresh (done) {
      await this.resetPages()
      done()
    }
  }
}
</script>
