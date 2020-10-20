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

          <titles
            v-if="video.titles.length"
            :items="video.titles"
            class="q-pt-xs text-body2 text-weight-medium text-grey-4 ellipsis-2-lines"
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
          size="13px"
        />

        <div class="q-pt-lg">
          <div class="q-gutter-sm">
            <q-btn
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
              icon="o_add"
              label="Save To"
              @click="saveModal"
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
import SaveComponent from 'components/video/Save'
import WatchComponent from 'components/video/Watch'
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
  },

  methods: {
    editModal () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.video.id || null
      })
    },

    saveModal () {
      this.$q.dialog({
        component: SaveComponent,
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
