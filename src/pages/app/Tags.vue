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
        class="q-mr-lg"
      />

      <q-select
        v-model="type"
        :options="types"
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
            class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
          >
            <tag-item :data="item" />
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
import Tag from 'src/models/Tag'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('tags')) {
      store.registerModule('tags', paginateModule)
    }
  },

  components: {
    TagItem: () => import('components/tag/Item')
  },

  data () {
    return {
      sorters: [
        { label: 'Alphabetical', value: 'name' },
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

  computed: {
    ...mapState('tags', [
      'id',
      'data',
      'options',
      'page',
      'ready'
    ]),

    ...mapGetters('tags', [
      'isLoaded'
    ]),

    sorter: {
      get () {
        return this.options.sorter || this.sorters[0]
      },

      set (value) {
        this.resetPages({ sorter: value })
      }
    },

    type: {
      get () {
        return this.options.type || this.types[0]
      },

      set (value) {
        this.resetPages({ type: value })
      }
    }
  },

  meta () {
    return {
      title: 'Tags'
    }
  },

  methods: {
    ...mapActions('tags', [
      'resetItems',
      'resetPages',
      'setPage'
    ]),

    async setModels () {
      const response = await Tag
        .where('type', this.type.value)
        .append(['item_count'])
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
