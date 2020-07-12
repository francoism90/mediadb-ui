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
      @before-show="menuActive = true"
      @hide="menuActive = false"
    >
      <q-list
        bordered
        padding
        dark
        style="width: 260px"
      >
        <q-item
          v-for="(entity, index) in menu"
          :key="`menu-${index}`"
          v-close-popup
          clickable
          dark
          @click.prevent="open(entity.name)"
        >
          <q-item-section side>
            <q-icon :name="entity.icon" />
          </q-item-section>
          <q-item-section>{{ entity.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <a
      class="block item-preview"
      :class="menuActive ? '' : 'cursor-pointer'"
      @click.prevent="onClick"
    >
      <preview
        class="item-preview"
        :name="item.name"
        :poster="item.thumbnail"
        :src="item.preview"
      />
    </a>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 text-grey-5">
        {{ item.name }}
      </div>
      <div class="text-subtitle2 text-grey-6">
        <a
          v-if="$route.name !== 'channel'"
          class="text-grey-6 no-decoration cursor-pointer"
          @click.prevent="open('channel')"
        >
          {{ item.relationships.model.name }}
        </a>
        <span v-else>
          {{ String(item.created_at) | datestamp }}
        </span> •
        {{ Number(item.properties.duration || 0) | timestamp }} •
        {{ Number(item.views || 0) | approximate }} views
      </div>
      <div
        v-if="item.relationships.tags.length"
        class="q-pt-xs"
      >
        <tag
          v-for="(tag, index) in item.relationships.tags"
          :key="index"
          :item="tag"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {

  components: {
    Preview: () => import('components/ui/Preview'),
    Tag: () => import('components/ui/Tag')
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      menuActive: false,
      menu: [
        { label: 'Play', name: 'play', icon: 'play_arrow' },
        { label: 'Edit', name: 'edit', icon: 'edit' },
        { label: 'Add to Playlist', name: 'save', icon: 'playlist_add' },
        { label: 'Favorite Video', name: 'like', icon: 'favorite' },
        { label: 'View Channel', name: 'channel', icon: 'live_tv' },
        { label: 'Share', name: 'share', icon: 'share' }
      ]
    }
  },

  methods: {
    open (key) {
      switch (key) {
        case 'play':
          this.$router.push({
            name: 'video',
            params: {
              id: this.item.id,
              slug: this.item.slug
            }
          })
          break
        case 'channel':
          this.$router.push({
            name: 'channel',
            params: {
              id: this.item.relationships.model.id
            }
          })
          break
        case 'edit':
          this.$store.dispatch('dialog/open', {
            component: 'VideoEdit',
            data: { id: this.item.id }
          })
          break
        case 'save':
          this.$store.dispatch('dialog/open', {
            component: 'VideoSave',
            data: { id: this.item.id }
          })
          break
      }
    },

    onClick () {
      if (!this.menuActive) {
        this.open('play')
      }
    }
  }
}
</script>
