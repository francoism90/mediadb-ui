<template>
  <q-card
    square
    flat
    class="bg-grey-12 video-item"
    draggable="false"
  >
    <router-link :to="{ name: 'video-details', params: { id: video.id, slug: video.slug }}">
      <q-img
        :alt="video.name"
        :src="video.thumbnail_url"
        height="180px"
        loading="lazy"
        class="bg-grey-8 cursor-pointer"
        img-class="video-placeholder"
      >
        <div class="absolute-bottom-right">
          <q-badge class="transparent-3 text-caption q-ma-sm">
            {{ Number(video.duration || 0) | timestamp }}
          </q-badge>
        </div>
      </q-img>
    </router-link>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 ellipsis-2-lines text-grey-5">
        {{ video.name }}
      </div>

      <titles
        v-if="video.titles.length"
        :items="video.titles"
        class="text-subtitle1 ellipsis-2-lines text-grey-6"
      />

      <div class="text-subtitle2 ellipsis-2-lines text-grey-6">
        {{ String(video.created_at) | datestamp }} •
        {{ Number(video.views || 0) | approximate }} views
      </div>

      <tags
        v-if="video.relationships.tags.length"
        :items="video.relationships.tags"
        class="q-pt-xs"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  components: {
    Tags: () => import('components/ui/Tags'),
    Titles: () => import('components/ui/Titles')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  }
}
</script>
