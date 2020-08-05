<template>
  <main>
    <template v-if="media.length">
      <div class="row items-center q-py-lg">
        <div class="col">
          <span class="text-body1">Media</span>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="filterQuery('media', 'search_media')"
          >
            All Media
          </a>
        </div>
      </div>

      <div class="row q-col-gutter-md items">
        <div
          v-for="(item, index) in media"
          :key="index"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-2"
        >
          <media-item :data="item" />
        </div>
      </div>
    </template>

    <template v-if="channels.length">
      <div class="row items-center q-py-lg">
        <div class="col">
          <span class="text-body1">Channels</span>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="filterQuery('channel', 'search_channels')"
          >
            All Channels
          </a>
        </div>
      </div>

      <div class="row q-col-gutter-md items">
        <div
          v-for="(item, index) in channels"
          :key="index"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-2"
        >
          <channel-item :data="item" />
        </div>
      </div>
    </template>

    <template v-if="collections.length">
      <div class="row items-center q-py-lg">
        <div class="col">
          <span class="text-body1">Collections</span>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="filterQuery('collection', 'search_collections')"
          >
            All Collections
          </a>
        </div>
      </div>

      <div class="row q-col-gutter-md items">
        <div
          v-for="(item, index) in collections"
          :key="index"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-2"
        >
          <collection-item :data="item" />
        </div>
      </div>
    </template>

    <template v-if="tags.length">
      <div class="row items-center q-py-lg">
        <div class="col">
          <span class="text-body1">Tags</span>
        </div>

        <div class="col-auto">
          <a
            class="text-caption text-uppercase cursor-pointer"
            @click="filterQuery('tag', 'search_tags')"
          >
            All Tags
          </a>
        </div>
      </div>

      <div class="row q-col-gutter-md items">
        <div
          v-for="(item, index) in tags"
          :key="index"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-2"
        >
          <tag-item :data="item" />
        </div>
      </div>
    </template>
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
    async setChannels () {
      this.channels = await Channel
        .where('query', this.query)
        .include(['model', 'tags'])
        .append(['items', 'thumbnail_url'])
        .orderBy('relevance')
        .page(1)
        .limit(4)
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
        .limit(8)
        .$get()
    },

    async setTags () {
      this.tags = await Tag
        .where('query', this.query)
        .append(['items'])
        .orderBy('relevance')
        .page(1)
        .limit(8)
        .$get()
    },

    filterQuery (type = '', store = '') {
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
