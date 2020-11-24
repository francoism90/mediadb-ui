<template>
  <q-card
    flat
    class="transparent video-item"
    draggable="false"
  >
    <router-link :to="{ name: 'video-model', params: { id: video.id, slug: video.slug }}">
      <q-img
        :alt="video.name"
        :src="video.thumbnail_url"
        height="200px"
        class="bg-grey-9 video-thumbnail cursor-pointer"
        img-class="video-thumbnail"
      >
        <div class="absolute-bottom-right">
          <q-badge class="q-py-xs q-px-sm transparent-5 no-border-radius text-caption">
            {{ Number(video.duration || 0) | timestamp }}
          </q-badge>
        </div>
      </q-img>
    </router-link>

    <q-card-section class="q-px-none">
      <collections
        v-if="video.relationships.collections.length"
        :items="video.relationships.collections"
        class="q-pb-sm text-overline text-uppercase text-grey-5 ellipsis-2-lines"
      />

      <div class="q-pb-xs text-subtitle1 ellipsis-2-lines">
        {{ video.name }}
      </div>

      <div class="q-pb-sm text-caption text-grey-5 ellipsis-2-lines">
        {{ String(video.created_at) | datestamp }} •
        {{ Number(video.views || 0) | approximate }} views
      </div>

      <tags
        v-if="video.relationships.tags.length"
        :items="video.relationships.tags"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  components: {
    Collections: () => import('components/collection/List'),
    Tags: () => import('components/tag/Video')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  }
}
</script>
