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
            class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
          >
            <channel-item :data="item" />
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
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Channel from 'src/models/Channel'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('channels')) {
      store.registerModule('channels', paginateModule)
    }
  },

  components: {
    ChannelItem: () => import('components/channel/Item')
  },

  data () {
    return {
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Alphabetical', value: 'name' },
        { label: 'Most Recent', value: 'recent' },
        { label: 'Most Viewed', value: 'views' }
      ]
    }
  },

  computed: {
    ...mapState('channels', [
      'id',
      'data',
      'options',
      'page',
      'ready'
    ]),

    ...mapGetters('channels', [
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
      title: 'Channels'
    }
  },

  methods: {
    ...mapActions('channels', [
      'resetPages',
      'setPage'
    ]),

    async setModels () {
      const response = await Channel
        .include(['model', 'tags'])
        .append(['items', 'thumbnail_url'])
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
      await this.resetPages()
      done()
    }
  }
}
</script>
