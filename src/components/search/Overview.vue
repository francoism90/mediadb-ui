<template>
  <div
    v-if="ready"
    :key="query"
  >
    <template v-if="results === 0">
      <div class="fixed-center text-center text-grey">
        <div>
          <q-icon
            name="o_flag"
            size="4rem"
          />
        </div>
        <div class="text-h5 q-mb-xs">
          No results found for "{{ query }}"
        </div>
        <div class="text-body2">
          Please make sure your words are spelled correctly or use different keywords.
        </div>
      </div>
    </template>

    <template v-else>
      <items
        v-for="(type, index) in types"
        :key="index"
        :item-component="type.component"
        :label="type.label"
        :items="type.items"
        :type="type.filter"
        :query="query"
      />
    </template>
  </div>
</template>

<script>
import { set } from 'lodash'
import CollectionModel from 'src/models/Collection'
import TagModel from 'src/models/Tag'
import VideoModel from 'src/models/Video'

export default {
  components: {
    Items: () => import('components/search/Items')
  },

  props: {
    query: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      ready: false,
      types: {
        video: {
          component: 'Video',
          label: 'Videos',
          filter: 'video',
          items: []
        },
        collection: {
          component: 'Collection',
          label: 'Collections',
          filter: 'collection',
          items: []
        },
        tag: {
          component: 'Tag',
          label: 'Tags',
          filter: 'tag',
          items: []
        }
      }
    }
  },

  computed: {
    results () {
      let count = 0

      for (const type of Object.values(this.types)) {
        count += type.items.length
      }

      return count
    }
  },

  watch: {
    query () {
      this.setResults()
    }
  },

  created () {
    this.setResults()
  },

  methods: {
    async setResults () {
      this.ready = false

      try {
        await this.setCollections()
        await this.setTags()
        await this.setVideos()
      } catch {
        //
      } finally {
        this.ready = true
      }
    },

    async setCollections () {
      const response = await CollectionModel
        .where('query', this.query)
        .include('model')
        .append('item_count', 'thumbnail_url')
        .orderBy('relevance')
        .page(1)
        .limit(6)
        .$get()

      set(this.types, 'collection.items', response)
    },

    async setTags () {
      const response = await TagModel
        .where('query', this.query)
        .append('item_count')
        .orderBy('relevance')
        .page(1)
        .limit(3)
        .$get()

      set(this.types, 'tag.items', response)
    },

    async setVideos () {
      const response = await VideoModel
        .where('query', this.query)
        .append('duration', 'thumbnail_url')
        .orderBy('relevance')
        .page(1)
        .limit(6)
        .$get()

      set(this.types, 'video.items', response)
    }
  }
}
</script>
