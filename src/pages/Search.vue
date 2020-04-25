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
        <q-tab name="videos" icon="video_library" label="Videos" />
        <q-tab name="collect" icon="collections" label="Collections" />
        <q-tab name="people" icon="people_alt" label="Users" />
        <q-tab name="tags" icon="local_offer" label="Tags" />
      </q-tabs>

      <q-tab-panels keep-alive v-model="tab" dark animated>
        <q-tab-panel name="videos" class="q-px-none">
          <infinite namespace="videos_search" item-component="Video" />
        </q-tab-panel>

        <q-tab-panel name="collect" class="q-px-none">
          <infinite namespace="collects_search" item-component="Collect" />
        </q-tab-panel>

        <q-tab-panel name="people" class="q-px-none">
          <infinite namespace="users_search" item-component="User" />
        </q-tab-panel>

        <q-tab-panel name="tags" class="q-px-none">
          <infinite namespace="tags_search" item-component="Tag" />
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
      tab: 'videos',
      stores: [
        {
          module: 'collects_search',
          path: 'collect',
          params: { include: 'tags,user' }
        },
        {
          module: 'tags_search',
          path: 'tags',
          params: { include: 'media' }
        },
        {
          module: 'users_search',
          path: 'user',
          params: { include: 'media' }
        },
        {
          module: 'videos_search',
          path: 'media',
          params: { include: 'model,tags' }
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
      if (!this.$store.state[store.module]) {
        this.$store.registerModule(store.module, paginateModule)
      }
    }
  },

  methods: {
    resetStores (query = null) {
      for (const store of this.stores) {
        if (this.$store.state[store.module]) {
          this.$store.dispatch(store.module + '/reset', {
            path: store.path,
            params: { 'filter[query]': query, ...store.params }
          })
        }
      }
    }
  }
}
</script>
