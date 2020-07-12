<template>
  <div
    v-if="items > 0"
    class="q-pb-md"
  >
    <div class="row items-center q-py-lg">
      <template v-if="summary">
        <div class="col">
          <span class="text-body2">{{ label }}</span>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="setQuery(namespace)"
          >
            Filter {{ label }} ({{ items }})
          </a>
        </div>
      </template>

      <template v-else>
        <div class="col">
          <q-btn-group unelevated>
            <filters
              :namespace="namespace"
              field="sort"
              :options="sorters"
            />
          </q-btn-group>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="setQuery"
          >
            Show Overview
          </a>
        </div>
      </template>
    </div>

    <infinite
      :namespace="namespace"
      :item-component="itemComponent"
      :loadable="!summary"
    />
  </div>
</template>

<script>
export default {
  components: {
    Infinite: () => import('components/paginate/Infinite'),
    Filters: () => import('components/paginate/Filters')
  },

  props: {
    namespace: {
      type: String,
      default: null
    },

    summary: {
      type: Boolean,
      default: false
    },

    itemComponent: {
      type: String,
      default: null
    },

    label: {
      type: String,
      default: null
    },

    items: {
      type: Number,
      default: 0
    },

    query: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      sorters: [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most recent', value: 'recent' },
        { label: 'Most viewed', value: 'views' }
      ]
    }
  },

  methods: {
    async setQuery (namespace = null) {
      await this.$store.dispatch('search/query', {
        store: namespace,
        query: this.query
      })
    }
  }
}
</script>
