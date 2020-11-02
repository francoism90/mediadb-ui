<template>
  <q-img
    :alt="model.name"
    :src="model.thumbnail_url"
    loading="lazy"
    class="video-title"
    img-class="video-title-placeholder"
  >
    <div class="absolute-full video-title-elements">
      <div class="container absolute-top">
        <div class="video-title-details">
          <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
            {{ model.name }}
          </div>

          <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
            {{ String(model.created_at) | datestamp }} •
            {{ Number(model.duration) | timestamp }} •
            {{ Number(model.views) | approximate }} views
          </div>

          <collections
            v-if="model.relationships.collections.length"
            :items="model.relationships.collections"
            class="text-subtitle1 ellipsis-2-lines text-grey-4"
          />

          <div
            v-if="model.overview"
            class="q-pt-md text-subtitle1 text-grey-3 ellipsis-3-lines"
          >
            {{ model.overview }}
          </div>
        </div>

        <tags
          v-if="model.relationships.tags.length"
          :items="model.relationships.tags"
          item-component="Video"
          class="q-pt-lg"
        />

        <div class="q-pt-lg q-gutter-sm">
          <q-btn
            v-if="model.stream_url"
            flat
            dense
            class="transparent-1 q-pr-sm"
            text-color="primary"
            size="13px"
            icon="o_play_arrow"
            label="Watch"
            @click="watchModel"
          />

          <q-btn
            flat
            round
            class="transparent-1"
            text-color="grey-1"
            size="13px"
            :icon="model.is_favorited ? 'o_favorite' : 'o_favorite_outline'"
            @click="favoriteModel"
          />

          <q-btn
            v-if="$auth.check({ permissions: 'edit videos'})"
            flat
            round
            class="transparent-1"
            text-color="grey-1"
            size="13px"
            icon="o_article"
            @click="editModel"
          />
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

export default {
  components: {
    Collections: () => import('components/collection/List'),
    Tags: () => import('components/tag/List')
  },

  computed: {
    model () {
      return this.$store.getters['video/getModel']
    }
  },

  methods: {
    editModel () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.model.id
      })
    },

    favoriteModel () {
      if (this.model.is_favorited) {
        this.model.unfavorite()
        return
      }

      this.model.favorite()
    },

    watchModel () {
      this.$q.dialog({
        component: WatchComponent,
        parent: this,
        id: this.model.id
      })
    }
  }
}
</script>
