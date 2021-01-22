<template>
  <div class="container">
    <div class="text-h3 text-grey-1 text-weight-bold ellipsis-2-lines">
      {{ video.name }}
    </div>

    <div class="text-body2 text-grey-3 ellipsis-2-lines">
      {{ String(video.created_at) | datestamp }} •
      {{ Number(video.duration || 0) | timestamp }} •
      {{ video.resolution }}
    </div>

    <tags
      v-if="video.relationships.tags.length"
      :items="video.relationships.tags"
      class="q-pt-sm"
    />

    <div
      v-if="video.overview"
      class="q-pt-md text-body2 text-grey-4 ellipsis-3-lines"
    >
      {{ video.overview }}
    </div>

    <div class="q-py-lg q-gutter-sm">
      <q-btn
        v-shortkey="['p']"
        no-caps
        unelevated
        rounded
        class="btn-outline btn-primary"
        label="Watch"
        icon="play_arrow"
        @click="watchModel"
        @shortkey="watchModel"
      />

      <q-btn
        v-shortkey="['s']"
        no-caps
        unelevated
        rounded
        class="btn-outline btn-secondary"
        label="My List"
        :icon="video.is_favorited ? 'check' : 'add'"
        @click="saveModel"
        @shortkey="saveModel"
      />

      <q-btn
        v-shortkey="['e']"
        no-caps
        unelevated
        rounded
        class="btn-outline btn-secondary"
        :label="$q.screen.gt.xs ? 'Edit' : null"
        icon="subject"
        @click="editModel"
        @shortkey="editModel"
      />
    </div>
  </div>
</template>

<script>
import EditComponent from 'components/video/Edit'
import WatchComponent from 'components/video/Watch'

export default {
  components: {
    Tags: () => import('components/tag/List')
  },

  computed: {
    video () {
      return this.$store.getters['video/getModel']
    }
  },

  methods: {
    editModel () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        dark: true,
        id: this.video.id
      })
    },

    saveModel () {
      if (this.video.is_favorited) {
        this.video.favorite({ method: 'DELETE' })
        return
      }

      this.video.favorite()
    },

    watchModel () {
      this.$q.dialog({
        component: WatchComponent,
        parent: this,
        dark: true,
        id: this.video.id
      })
    }
  }
}
</script>
