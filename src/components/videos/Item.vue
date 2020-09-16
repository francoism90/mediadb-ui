<template>
  <q-card
    square
    class="bg-grey-12 cursor-pointer video-item"
    draggable="false"
  >
    <q-img
      :alt="video.name"
      :src="video.thumbnail_url"
      height="180px"
      loading="lazy"
      class="bg-grey-8"
      img-class="video-placeholder"
    >
      <div class="absolute-bottom-right">
        <q-badge class="transparent-dimmed text-caption q-ma-sm">
          {{ Number(video.duration || 0) | timestamp }}
        </q-badge>
      </div>
    </q-img>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 ellipsis-2-lines text-grey-5">
        {{ video.name }}
      </div>

      <div
        v-if="video.titleNames.length"
        class="text-subtitle1 ellipsis-2-lines text-grey-6"
      >
        {{ video.titleNames.join(', ') }}
      </div>

      <div class="text-subtitle1 ellipsis-2-lines text-grey-6">
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
    Tags: () => import('components/ui/Tags')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  }
}
</script>
