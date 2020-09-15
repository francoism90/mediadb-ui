<template>
  <div :key="id">
    <q-btn-group
      class="q-py-md"
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

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :debounce="300"
        class="row wrap justify-start items-start content-start q-col-gutter-md"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          v-close-popup
          class="col-xs-6 col-sm-4 col-md-3 col-lg-2 tag-item"
          @click="onClick(item)"
        >
          <tag-item :tag="item" />
        </q-intersection>

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
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import TagModel from 'src/models/Tag'

const { mapFields } = createHelpers({
  getterType: 'tags/getOption',
  mutationType: 'tags/setOption'
})

export default {
  components: {
    TagItem: () => import('components/tags/Item')
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
    },

    onClick (model = {}) {
      this.$router.push({
        name: 'search',
        query: {
          q: 'tag:' + model.slug,
          id: +new Date()
        }
      })
    }
  }
}
</script>
