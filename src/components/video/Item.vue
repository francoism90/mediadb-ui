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
          v-if="$auth.check({'permissions': 'edit videos'})"
          v-close-popup
          clickable
          @click="editModel"
        >
          <q-item-section side>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>Edit Video</q-item-section>
        </q-item>

        <q-item
          v-if="$auth.check({'permissions': 'create collections'})"
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
          v-if="$auth.check({'permissions': 'create collections'})"
          v-close-popup
          clickable
          @click="createCollection"
        >
          <q-item-section side>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>Create Collection</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-card-section class="q-pa-none">
      <router-link :to="{ name: 'video', params: { id: data.id, slug: data.slug }}">
        <preview
          class="block item-placeholder"
          :name="data.name"
          :poster="data.thumbnail_url"
          :src="data.preview_url"
        />
      </router-link>
    </q-card-section>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 ellipsis-3-lines text-grey-5">
        {{ data.name }}
      </div>
      <div
        v-if="data.metadata"
        class="text-subtitle2 ellipsis-2-lines text-grey-6"
      >
        {{ Number(data.metadata.duration || 0) | timestamp }} •
        {{ Number(data.views || 0) | approximate }} views
      </div>
      <tags
        v-if="data.relationships && data.relationships.tags.length"
        :items="data.relationships.tags"
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
        component: 'VideoEdit',
        props: {
          id: this.data.id
        }
      })
    },

    saveModel () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoSave',
        props: {
          id: this.data.id
        }
      })
    },

    async createCollection () {
      await this.$axios.post(`videos/${this.data.id}/save`, {
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
    }
  }
}
</script>
