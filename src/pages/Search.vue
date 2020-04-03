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
          <infinite namespace="video_search" item-component="Video" />
        </q-tab-panel>

        <q-tab-panel name="collect" class="q-px-none">
          <infinite namespace="collect_search" item-component="Collect" />
        </q-tab-panel>

        <q-tab-panel name="people" class="q-px-none">
          <infinite namespace="user_search" item-component="User" />
        </q-tab-panel>

        <q-tab-panel name="tags" class="q-px-none">
          <infinite namespace="tag_search" item-component="Tag" />
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
        'collect_search',
        'tag_search',
        'user_search',
        'video_search'
      ]
    }
  },

  computed: {
    ...mapGetters('search', {
      query: 'getQuery'
    })
  },

  watch: {
    query: function (value) {
      this.reset(value)
    }
  },

  created () {
    for (const store of this.stores) {
      if (!this.$store.state[store]) {
        this.$store.registerModule(store, paginateModule)
      }
    }
  },

  mounted () {
    this.reset(this.query)
  },

  methods: {
    reset (query) {
      this.resetVideo(query)
      this.resetCollect(query)
      this.resetUser(query)
      this.resetTags(query)
    },

    resetCollect (query) {
      this.$store.dispatch('collect_search/reset', {
        path: 'collect',
        params: {
          include: 'tags,user',
          'filter[query]': query || null
        }
      })
    },

    resetTags (query) {
      this.$store.dispatch('tag_search/reset', {
        path: 'tags',
        params: {
          append: 'media',
          'page[size]': 12,
          'filter[query]': query || null
        }
      })
    },

    resetUser (query) {
      this.$store.dispatch('user_search/reset', {
        path: 'user',
        params: {
          include: 'media',
          'page[size]': 12,
          'filter[query]': query || null
        }
      })
    },

    resetVideo (query) {
      this.$store.dispatch('video_search/reset', {
        path: 'media',
        params: {
          include: 'model,tags',
          'filter[query]': query || null
        }
      })
    }
  }
}
</script>
