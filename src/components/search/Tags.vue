<template>
  <section>
    <template v-if="summary">
      <div
        v-if="meta.total"
        class="row items-center q-py-lg"
      >
        <div class="col">
          <span class="text-body1">Tags</span>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="setFilter"
          >
            All Tags ({{ meta.total || 0 | approximate }})
          </a>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="row items-center q-pt-lg">
        <div class="col">
          <span class="text-caption">
            About {{ meta.total || 0 | approximate }} tags for <i>{{ query }}</i>
          </span>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="removeFilter"
          >
            Remove Filter
          </a>
        </div>
      </div>

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
        />
      </q-btn-group>
    </template>

    <q-pull-to-refresh
      :disable="!isReady || summary"
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

        <template
          v-if="!summary"
          v-slot:loading
        >
          <div class="row no-wrap justify-center q-my-md">
            <q-spinner
              color="primary"
              size="40px"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Tag from 'src/models/Tag'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('search/tags')

export default {
  components: {
    TagItem: () => import('components/tag/Item')
  },

  props: {
    summary: {
      type: Boolean,
      default: false
    },

    query: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      sorters: [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Alphabetical', value: 'name' },
        { label: 'Number of Items', value: 'items' }
      ]
    }
  },

  computed: {
    ...mapState([
      'id',
      'data',
      'meta',
      'options',
      'page'
    ]),

    ...mapGetters([
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
    }
  },

  beforeDestroy () {
    if (this.summary) {
      this.resetState()
    }
  },

  methods: {
    ...mapActions([
      'resetItems',
      'resetState',
      'setPage'
    ]),

    async setModels () {
      const response = await Tag
        .where('query', this.query)
        .append(['item_count'])
        .orderBy(this.sorter.value)
        .page(this.page)
        .limit(12)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      if (this.summary && this.page > 1) {
        done(true)
        return
      }

      await this.setModels()
      done(this.isLoaded)
    },

    async onRefresh (done) {
      await this.resetItems()
      done()
    },

    removeFilter () {
      this.resetState()

      this.$store.dispatch('search/setQuery', {
        filter: null,
        query: this.query
      })
    },

    setFilter () {
      this.resetState()

      this.$store.dispatch('search/setQuery', {
        filter: 'tags',
        query: this.query
      })
    }
  }
}
</script>
