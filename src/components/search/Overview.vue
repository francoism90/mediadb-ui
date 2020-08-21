<template>
  <main>
    <div
      v-for="type in types"
      :key="type.id"
    >
      <div v-if="hasItems(type.key)">
        <div class="row items-center q-py-lg">
          <div class="col">
            <span class="text-body1">{{ type.label }}</span>
          </div>

          <div class="col-auto">
            <a
              class="text-caption text-uppercase cursor-pointer"
              @click="filterQuery(type.key, type.store)"
            >
              {{ type.labelFilter }} ({{ getItemCount(type.key) }})
            </a>
          </div>
        </div>

        <div class="row q-col-gutter-md items">
          <div
            v-for="(item, index) in getItems(type.key)"
            :key="index"
            :class="type.columnClass"
          >
            <component
              :is="type.component"
              :data="item"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Collection from 'src/models/Collection'
import Video from 'src/models/Video'
import Tag from 'src/models/Tag'

export default {
  components: {
    CollectionItem: () => import('components/collection/Item'),
    VideoItem: () => import('components/video/Item'),
    TagItem: () => import('components/tag/Item')
  },

  props: {
    query: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      types: [
        {
          key: 'videos',
          label: 'Videos',
          labelFilter: 'All Videos',
          component: 'VideoItem',
          store: 'search_videos',
          columnClass: 'col-xs-12 col-sm-6 col-md-4 col-lg-2'
        },
        {
          key: 'collections',
          label: 'Collections',
          labelFilter: 'All Collections',
          component: 'CollectionItem',
          store: 'search_collections',
          columnClass: 'col-xs-12 col-sm-6 col-md-4 col-lg-2'
        },
        {
          key: 'tags',
          label: 'Tags',
          labelFilter: 'All Tags',
          component: 'TagItem',
          store: 'search_tags',
          columnClass: 'col-xs-12 col-sm-6 col-md-4 col-lg-2'
        }
      ],
      collections: [],
      tags: [],
      videos: []
    }
  },

  created () {
    this.setCollections()
    this.setTags()
    this.setVideos()
  },

  methods: {
    getItems (key) {
      return this[key].data
    },

    getItemCount (key) {
      return this[key].meta.total
    },

    hasItems (key) {
      if (!this[key].data || !this[key].meta) {
        return false
      }

      return this[key].data.length
    },

    async setCollections () {
      this.collections = await Collection
        .where('query', this.query)
        .include(['model', 'tags'])
        .append(['item_count', 'thumbnail_url'])
        .orderBy('relevance')
        .page(1)
        .limit(4)
        .get()
    },

    async setTags () {
      this.tags = await Tag
        .where('query', this.query)
        .append(['item_count'])
        .orderBy('relevance')
        .page(1)
        .limit(9)
        .get()
    },

    async setVideos () {
      this.videos = await Video
        .where('query', this.query)
        .include('tags')
        .append(['metadata', 'preview_url', 'thumbnail_url'])
        .orderBy('relevance')
        .page(1)
        .limit(9)
        .get()
    },

    filterQuery (type = '', store = '') {
      // Reset current store data
      this.$store.dispatch(store + '/resetPages')

      this.$router.push({
        name: 'search',
        query: {
          q: this.query,
          type: type,
          id: +new Date()
        }
      })
    }
  }
}
</script>
