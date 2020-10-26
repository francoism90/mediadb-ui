<template>
  <q-img
    :alt="video.name"
    :src="video.thumbnail_url"
    loading="lazy"
    class="video-title"
    img-class="video-title-placeholder"
  >
    <div class="absolute-full video-title-elements">
      <div class="container absolute-top">
        <div class="video-title-details">
          <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
            {{ video.name }}
          </div>

          <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
            {{ String(video.created_at) | datestamp }} •
            {{ Number(video.duration) | timestamp }} •
            {{ Number(video.views) | approximate }} views
          </div>

          <collections
            v-if="video.relationships.collections.length"
            :items="video.relationships.collections"
            class="text-subtitle1 ellipsis-2-lines text-grey-5"
          />

          <div
            v-if="video.overview"
            class="q-pt-md text-subtitle1 text-grey ellipsis-3-lines"
          >
            {{ video.overview }}
          </div>
        </div>

        <tags
          v-if="video.relationships.tags.length"
          :items="video.relationships.tags"
          class="q-pt-lg"
        />

        <div class="q-pt-lg">
          <div class="q-gutter-sm">
            <q-btn
              v-if="video.stream_url"
              stack
              unelevated
              class="transparent-1"
              text-color="primary"
              size="13px"
              icon="o_play_arrow"
              label="Watch"
              @click="watchModal"
            />

            <q-btn
              stack
              unelevated
              class="transparent-1"
              text-color="grey-1"
              size="13px"
              icon="o_favorite_outline"
              label="Favorite"
            />

            <q-btn
              v-if="$auth.check({ permissions: 'edit videos'})"
              stack
              unelevated
              class="transparent-1"
              text-color="grey-1"
              size="13px"
              icon="o_wysiwyg"
              label="Edit Item"
              @click="editModal"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute-left video-gradient-left" />
    <div class="absolute-right video-gradient-right" />
    <div class="absolute-bottom video-gradient-bottom" />
  </q-img>
</template>

<script>
import EditComponent from 'components/video/Edit'
import WatchComponent from 'components/video/Watch'
import VideoModel from 'src/models/Video'

export default {
  components: {
    Collections: () => import('components/ui/Collections'),
    Tags: () => import('components/ui/Tags')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  methods: {
    editModal () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.video.id || null
      })
    },

    watchModal () {
      this.$q.dialog({
        component: WatchComponent,
        parent: this,
        id: this.video.id || null
      })
    }
  }
}
</script>
