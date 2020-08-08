<template>
  <div class="container fluid">
    <q-btn-group
      class="q-pb-md"
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
      />
    </q-btn-group>

    <q-pull-to-refresh
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :key="state.id"
        :debounce="300"
        @load="onLoad"
      >
        <div class="row q-col-gutter-md items">
          <div
            v-for="(item, index) in state.data"
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
  </div>
</template>

<script>
import Media from 'src/models/Media'

export default {
  components: {
    MediaItem: () => import('components/media/Item')
  },

  props: {
    namespace: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most Recent', value: 'recent' },
        { label: 'Most Viewed', value: 'views' },
        { label: 'Shortest to Longest', value: 'shortest' },
        { label: 'Longest to Shortest', value: 'longest' }
      ]
    }
  },

  computed: {
    model () {
      return this.$store.state.channel
    },

    state () {
      return this.model[this.namespace]
    },

    isLoaded () {
      return this.$store.getters[`channel/${this.namespace}/isLoaded`]
    },

    isReady () {
      return this.$store.getters[`channel/${this.namespace}/isReady`]
    },

    sorter: {
      get () {
        return this.state.options.sorter || this.sorters[0]
      },

      set (value) {
        this.resetPages({ sorter: value })
      }
    }
  },

  methods: {
    resetPages (payload = {}) {
      this.$store.dispatch(`channel/${this.namespace}/resetPages`, payload)
    },

    resetItems () {
      this.$store.dispatch(`channel/${this.namespace}/resetItems`)
    },

    setPage (payload = {}) {
      this.$store.dispatch(`channel/${this.namespace}/setPage`, payload)
    },

    async setModels () {
      const response = await Media
        .where('channel', this.model.data.id)
        .include(['model', 'tags'])
        .append(['preview_url', 'thumbnail_url'])
        .orderBy(this.sorter.value)
        .page(this.state.page)
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
