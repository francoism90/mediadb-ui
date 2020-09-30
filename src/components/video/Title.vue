<template>
  <q-img
    :alt="video.name"
    :src="video.thumbnail_url"
    height="100%"
    width="100%"
    loading="lazy"
    class="details-header"
    img-class="details-placeholder"
  >
    <div class="absolute-full details-elements">
      <div class="container absolute-top">
        <q-card-section class="q-px-none row items-center">
          <q-space />

          <q-btn
            v-close-popup
            icon="close"
            size="16px"
            class="q-mt-sm transparent-dimmed"
            dense
            round
            unelevated
          />
        </q-card-section>
      </div>

      <div class="container absolute-bottom">
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-white ellipsis-2-lines">
            {{ video.name }}
          </div>

          <titles
            v-if="video.titles.length"
            :items="video.titles"
            class="text-subtitle1 ellipsis-2-lines text-grey-1"
          />

          <div class="text-subtitle2 text-grey-1 ellipsis">
            {{ String(video.created_at) | datestamp }} •
            {{ Number(video.duration) | timestamp }} •
            {{ Number(video.views) | approximate }} views
          </div>

          <div
            v-if="video.description"
            class="text-subtitle1 text-grey ellipsis-3-lines"
          >
            {{ video.description }}
          </div>
        </q-card-section>

        <q-card-section
          v-if="video.relationships.tags.length"
          class="q-px-none q-mt-sm"
        >
          <tags
            style="max-width: 500px;"
            :items="video.relationships.tags"
            :avatar-color="null"
            :label-color="null"
            clickable
            size="13px"
          />
        </q-card-section>

        <q-card-section class="q-px-none q-mt-sm">
          <q-btn
            v-shortkey="['p']"
            class="q-mr-sm"
            size="13px"
            label="Watch Video"
            color="primary"
            @click="watchModal"
            @shortkey="watchModal"
          />

          <q-btn
            v-shortkey="['a']"
            class="q-mr-sm"
            size="13px"
            label="Save To"
            color="grey-8"
            @click="saveModal"
            @shortkey="saveModal"
          />

          <q-btn
            v-if="$auth.check({ permissions: 'edit videos'})"
            v-shortkey="['e']"
            size="13px"
            label="Edit Item"
            color="grey-8"
            @click="editModal"
            @shortkey="editModal"
          />
        </q-card-section>
      </div>
    </div>

    <div class="details-header-gradient-left absolute-left" />
    <div class="details-header-gradient-right absolute-right" />
    <div class="details-header-gradient-bottom absolute-bottom" />
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
        id: this.video.id
      })
    },

    saveModal () {
      this.$q.dialog({
        component: SaveComponent,
        parent: this,
        id: this.video.id
      })
    },

    watchModal () {
      this.$q.dialog({
        component: WatchComponent,
        parent: this,
        id: this.video.id
      })
    }
  }
}
</script>
