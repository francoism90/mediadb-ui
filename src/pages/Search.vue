<template>
  <q-page class="container fluid">
    <template v-if="!query">
      <topics />
    </template>

    <template v-else>
      <q-tabs
        v-model="tab"
        inline-label
        class="q-py-md text-white"
        :breakpoint="0"
      >
        <q-tab name="videos" icon="video_library" class="text-overline" label="Videos" />
        <q-tab name="collect" icon="layers" label="Collections" />
        <q-tab name="people" icon="people" label="Users" />
      </q-tabs>

      <q-tab-panels keep-alive v-model="tab" dark animated>
        <q-tab-panel name="videos" class="q-px-none">
          <infinite namespace="video_library" item-component="Video" />
        </q-tab-panel>

        <q-tab-panel name="collect" class="q-px-none">
          <infinite namespace="collect_library" item-component="Collect" />
        </q-tab-panel>

        <q-tab-panel name="people" class="q-px-none">
          <infinite namespace="video_library" item-component="Video" />
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
    Topics: () => import('components/search/Topics')
  },

  meta () {
    return {
      title: 'Library'
    }
  },

  data () {
    return {
      tab: 'videos'
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
    if (!this.$store.state.video_library) {
      this.$store.registerModule('video_library', paginateModule)
    }

    if (!this.$store.state.collect_library) {
      this.$store.registerModule('collect_library', paginateModule)
    }
  },

  methods: {
    reset (query) {
      this.resetVideo(query)
      this.resetCollect(query)
    },

    resetCollect (query) {
      this.$store.dispatch('collect_library/reset', {
        path: 'collect',
        params: {
          include: 'tags,user',
          'filter[query]': query || null
        }
      })
    },

    resetVideo (query) {
      this.$store.dispatch('video_library/reset', {
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
