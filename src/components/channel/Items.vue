<template>
  <div
    v-if="channel"
    class="container fluid"
  >
    <div class="scroll">
      <q-btn-group
        class="q-pb-md"
        unelevated
      >
        <q-select
          v-model="sorter"
          :options="sorters"
          :loading="!state.ready"
          dark
          dense
          dropdown-icon="keyboard_arrow_down"
          options-dark
          square
        />
      </q-btn-group>

      <q-pull-to-refresh
        :key="state.id"
        :disable="!state.ready"
        @refresh="onRefresh"
      >
        <q-infinite-scroll
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
              <q-spinner-dots
                color="primary"
                size="40px"
              />
            </div>
          </template>
        </q-infinite-scroll>
      </q-pull-to-refresh>
    </div>
  </div>
</template>

<script>
import Media from 'src/models/Media'

export default {
  components: {
    MediaItem: () => import('components/media/Item')
  },

  props: {
    channel: {
      type: Object,
      required: true
    },

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
    state () {
      return this.$store.state[this.namespace]
    },

    getIsLoaded () {
      return this.$store.getters[this.namespace + '/getIsLoaded']
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
    async resetPages (options = {}) {
      await this.$store.dispatch(this.namespace + '/resetPages', options)
    },

    async setModels () {
      const response = await Media
        .where('channel', this.channel.id)
        .include(['model', 'tags'])
        .append(['preview_url', 'thumbnail_url'])
        .orderBy(this.sorter.value)
        .page(this.state.page)
        .limit(12)
        .get()

      await this.$store.dispatch(this.namespace + '/setPage', response)
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
