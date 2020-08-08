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
              {{ type.labelFilter }}
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
import Channel from 'src/models/Channel'
import Collection from 'src/models/Collection'
import Media from 'src/models/Media'
import Tag from 'src/models/Tag'

export default {
  components: {
    ChannelItem: () => import('components/channel/Item'),
    CollectionItem: () => import('components/collection/Item'),
    MediaItem: () => import('components/media/Item'),
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
          key: 'media',
          label: 'Media',
          labelFilter: 'All Media',
          component: 'MediaItem',
          store: 'search_media',
          columnClass: 'col-xs-12 col-sm-6 col-md-4 col-lg-2'
        },
        {
          key: 'channels',
          label: 'Channels',
          labelFilter: 'All Channels',
          component: 'ChannelItem',
          store: 'search_channels',
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
      channels: [],
      collections: [],
      media: [],
      tags: []
    }
  },

  created () {
    this.setChannels()
    this.setCollections()
    this.setMedia()
    this.setTags()
  },

  methods: {
    getItems (key) {
      return this[key]
    },

    hasItems (key) {
      return this[key].length
    },

    async setChannels () {
      this.channels = await Channel
        .where('query', this.query)
        .include(['model', 'tags'])
        .append(['items', 'thumbnail_url'])
        .orderBy('relevance')
        .page(1)
        .limit(8)
        .$get()
    },

    async setCollections () {
      this.collections = await Collection
        .where('query', this.query)
        .include(['model', 'tags'])
        .append(['items', 'thumbnail_url'])
        .orderBy('relevance')
        .page(1)
        .limit(4)
        .$get()
    },

    async setMedia () {
      this.media = await Media
        .where('query', this.query)
        .include(['model', 'tags'])
        .append(['preview_url', 'thumbnail_url'])
        .orderBy('relevance')
        .page(1)
        .limit(9)
        .$get()
    },

    async setTags () {
      this.tags = await Tag
        .where('query', this.query)
        .append(['items'])
        .orderBy('relevance')
        .page(1)
        .limit(9)
        .$get()
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
