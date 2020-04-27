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
      title: 'Library'
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
          params: { include: 'model,tags' }
        },
        {
          name: 'collects_search',
          label: 'Collections',
          icon: 'collections',
          component: 'Collect',
          path: 'collect',
          params: { include: 'tags,user' }

        },
        {
          name: 'users_search',
          label: 'Users',
          icon: 'people_alt',
          component: 'User',
          path: 'user',
          params: { include: 'media' }
        },
        {
          name: 'tags_search',
          label: 'Tags',
          icon: 'local_offer',
          component: 'Tag',
          path: 'tags',
          params: { include: 'media' }
        }
      ]
    }
  },

  computed: {
    ...mapGetters('search', {
      query: 'getQuery'
    })
  },

  watch: {
    query: function (value = null) {
      this.resetStores(value)
    }
  },

  created () {
    for (const store of this.stores) {
      if (!this.$store.state[store.name]) {
        this.$store.registerModule(store.name, paginateModule)
      }
    }
  },

  methods: {
    resetStores (query = null) {
      for (const store of this.stores) {
        if (this.$store.state[store.name]) {
          this.$store.dispatch(store.name + '/reset', {
            path: store.path,
            params: { 'filter[query]': query, ...store.params }
          })
        }
      }
    }
  }
}
</script>
