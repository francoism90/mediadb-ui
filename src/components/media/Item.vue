<template>
  <q-card
    dark
    square
    flat
    class="bg-grey-12"
    draggable="false"
  >
    <q-menu
      touch-position
      context-menu
      dark
      square
    >
      <q-list
        bordered
        dark
      >
        <q-item
          v-close-popup
          clickable
          @click="editModel"
        >
          <q-item-section side>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>Edit Media</q-item-section>
        </q-item>

        <q-item
          v-close-popup
          clickable
          @click="saveModel"
        >
          <q-item-section side>
            <q-icon name="playlist_add" />
          </q-item-section>
          <q-item-section>Save to Collection</q-item-section>
        </q-item>

        <q-item
          v-close-popup
          clickable
          @click="createCollection"
        >
          <q-item-section side>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>New Collection</q-item-section>
        </q-item>

        <q-item
          v-close-popup
          clickable
          @click="shareModel"
        >
          <q-item-section side>
            <q-icon name="share" />
          </q-item-section>
          <q-item-section>Share</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-card-section class="q-pa-none">
      <router-link :to="{ name: 'media', params: { id: data.id, slug: data.slug }}">
        <preview
          class="block item-placeholder"
          :name="data.name"
          :poster="data.thumbnail_url"
          :src="data.preview_url"
        />
      </router-link>
    </q-card-section>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 text-grey-5">
        {{ data.name }}
      </div>
      <div
        v-if="data.metadata"
        class="text-subtitle2 text-grey-6"
      >
        <router-link
          v-if="$route.name !== 'channel'"
          class="text-grey-6 no-decoration cursor-pointer"
          :to="{ name: 'channel', params: { id: data.relationships.model.id }}"
        >
          {{ data.relationships.model.name }}
        </router-link>
        <span v-else>
          {{ String(data.created_at) | datestamp }}
        </span> •
        {{ Number(data.metadata.duration || 0) | timestamp }} •
        {{ Number(data.views || 0) | approximate }} views
      </div>
      <tags
        v-if="data.relationships.tags.length"
        :items="data.relationships.tags"
        class="q-pt-xs"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  components: {
    Preview: () => import('components/ui/Preview'),
    Tags: () => import('components/ui/Tags')
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    editModel () {
      this.$store.dispatch('dialog/open', {
        component: 'MediaEdit',
        data: {
          id: this.data.id
        }
      })
    },

    saveModel () {
      this.$store.dispatch('dialog/open', {
        component: 'MediaSave',
        data: {
          id: this.data.id
        }
      })
    },

    async createCollection () {
      await this.$axios.put(`api/v1/media/${this.data.id}/save`, {
        collections: [
          { id: this.data.id, name: this.data.name }
        ]
      })

      this.$q.notify({
        progress: true,
        timeout: 1500,
        position: 'top',
        message: `${this.data.name} has been saved.`,
        type: 'positive'
      })
    },

    shareModel () {}
  }
}
</script>
