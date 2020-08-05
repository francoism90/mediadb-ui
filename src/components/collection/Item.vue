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
          <q-item-section>Edit Collection</q-item-section>
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
      <router-link :to="{ name: 'collection', params: { id: data.id, slug: data.slug }}">
        <q-img
          :alt="data.name"
          :src="data.thumbnail_url"
          :ratio="1"
          img-class="item-cover"
          placeholder-src="~assets/placeholders/320x480.png"
          width="100%"
          height="160px"
          loading="lazy"
        />
      </router-link>
    </q-card-section>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 text-grey-5">
        {{ data.name }}
      </div>
      <div class="text-subtitle2 text-grey-6">
        {{ Number(data.items || 0) | approximate }} items
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
        component: 'CollectionEdit',
        data: {
          id: this.data.id
        }
      })
    },

    shareModel () {}
  }
}
</script>
