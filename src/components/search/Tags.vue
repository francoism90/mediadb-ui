<template>
  <div>
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
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import TagModel from 'src/models/Tag'
import PaginateModule from 'src/store/paginate'

const { mapFields } = createHelpers({
  getterType: 'tag-search/getOption',
  mutationType: 'tag-search/setOption'
})

export default {
  components: {
    TagItem: () => import('components/tag/Item')
  },

  props: {
    query: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      sorters: [
        { label: 'Relevance', value: 'relevance' },
        { label: 'A-Z', value: 'name' },
        { label: 'Number of Items', value: 'items' }
      ]
    }
  },

  meta () {
    return {
      title: this.query || 'Tags'
    }
  },

  computed: {
    ...mapState('tag-search', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('tag-search', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter'
    ])
  },

  created () {
    if (!this.$store.hasModule('tag-search')) {
      this.$store.registerModule('tag-search', PaginateModule)
    }

    this.initialize({
      name: this.$route.query.q || null,
      options: {
        sorter: this.sorters[0]
      }
    })
  },

  methods: {
    ...mapActions('tag-search', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await TagModel
        .where('query', this.query)
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
