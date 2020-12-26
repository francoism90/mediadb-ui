<template>
  <hero :style="{ backgroundImage: 'url(' + model.thumbnail_url + ')' }">
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
      class="q-pt-xs text-subtitle1 ellipsis-2-lines text-grey-4"
    />

    <tags
      v-if="model.relationships.tags.length"
      :items="model.relationships.tags"
      class="q-pt-md"
      item-color="grey-11"
    />

    <div
      v-if="model.overview"
      class="q-pt-md text-subtitle1 text-grey-4 ellipsis-3-lines"
    >
      {{ model.overview }}
    </div>

    <div class="q-py-lg q-gutter-sm">
      <q-btn
        v-if="model.stream_url"
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="primary"
        size="13px"
        icon="o_play_arrow"
        label="Watch"
        @click="watchModel"
      />

      <q-btn
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="grey-1"
        size="13px"
        label="Favorite"
        :icon="model.is_favorited ? 'favorite' : 'o_favorite_outline'"
        @click="favoriteModel"
      />

      <q-btn
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="grey-1"
        size="13px"
        label="Watchlist"
        :icon="model.is_liked ? 'o_turned_in' : 'o_turned_in_not'"
        @click="likeModel"
      />

      <q-btn
        v-if="$auth.check({ permissions: 'edit videos'})"
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="grey-1"
        size="13px"
        label="Edit"
        icon="o_article"
        @click="editModel"
      />
    </div>
  </hero>
</template>

<script>
import EditComponent from 'components/video/Edit'
import WatchComponent from 'components/video/Watch'

export default {
  components: {
    Collections: () => import('components/collection/List'),
    Hero: () => import('components/ui/Hero'),
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
        this.model.favorite({ method: 'DELETE' })
        return
      }

      this.model.favorite()
    },

    likeModel () {
      if (this.model.is_liked) {
        this.model.like({ method: 'DELETE' })
        return
      }

      this.model.like()
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
