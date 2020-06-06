<template>
  <q-page class="container fluid">
    <template v-if="!query">
      <tags />
    </template>

    <template v-else>
      <q-tabs
        v-model="tab"
        inline-label
        class="q-py-md text-white"
        :breakpoint="0"
      >
        <q-tab
          v-for="(item, index) in stores"
          :key="`tab-${index}`"
          :name="item.name"
          :icon="item.icon"
          :label="item.label"
        />
      </q-tabs>

      <q-tab-panels keep-alive v-model="tab" dark animated>
        <q-tab-panel
          v-for="(item, index) in stores"
          :key="`panel-${index}`"
          :name="item.name"
          class="q-px-none"
        >
          <infinite :namespace="item.name" :item-component="item.component" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'
import { mapGetters } from 'vuex'

export default {
  components: {
    Infinite: () => import('components/paginate/Infinite'),
    Tags: () => import('components/search/Tags')
  },

  meta () {
    return {
      title: 'Search'
    }
  },

  data () {
    return {
      tab: 'videos_search',
      stores: [
        {
          name: 'videos_search',
          label: 'Videos',
          icon: 'video_library',
          component: 'Video',
          path: 'media',
          params: { include: 'model,tags', 'page[size]': 15 }
        },
        {
          name: 'collects_search',
          label: 'Collections',
          icon: 'collections',
          component: 'Collect',
          path: 'collect',
          params: { include: 'tags,user', 'page[size]': 15 }

        },
        {
          name: 'users_search',
          label: 'Users',
          icon: 'people_alt',
          component: 'User',
          path: 'user',
          params: { include: 'media', 'page[size]': 10 }
        }
      ]
    }
  },

  computed: {
    ...mapGetters('search', {
      query: 'getQuery'
    })
  },

  created () {
    for (const store of this.stores) {
      if (!this.$store.state[store.name]) {
        this.$store.registerModule(store.name, paginateModule)

        // setup each store
        this.$store.dispatch(store.name + '/create', {
          path: store.path,
          params: { 'filter[query]': this.query, ...store.params }
        })
      }
    }

    this.$store.subscribeAction((action, state) => {
      if (action.type === 'search/query') {
        this.resetStores(action.payload)
      }
    })
  },

  methods: {
    resetStores (query = null) {
      for (const store of this.stores) {
        if (this.$store.state[store.name]) {
          this.$store.dispatch(store.name + '/reset', {
            path: store.path,
            params: { 'filter[query]': query }
          })
        }
      }
    }
  }
}
</script>
