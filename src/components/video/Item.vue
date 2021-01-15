<template>
  <q-card
    flat
    square
    class="transparent video-item"
    draggable="false"
  >
    <router-link :to="{ name: 'video', params: { id: video.id, slug: video.slug }}">
      <q-img
        :alt="video.name"
        :src="video.thumbnail_url"
        placeholder-src="~assets/placeholder/16x16.webp"
        class="cursor-pointer"
        height="100%"
        width="100%"
        img-class="video-placeholder"
      >
        <div class="absolute-bottom">
          <div class="video-description q-px-md">
            <div class="text-h5 text-white ellipsis">
              {{ video.name }}
            </div>

            <div class="text-overline">
              {{ Number(video.duration || 0) | timestamp }} •
              {{ video.resolution }}
            </div>

            <tags
              v-if="video.relationships.tags.length"
              :items="video.relationships.tags"
              class="q-pt-xs"
            />
          </div>
        </div>
      </q-img>
    </router-link>
  </q-card>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  components: {
    Tags: () => import('components/tag/List')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  }
}
</script>
