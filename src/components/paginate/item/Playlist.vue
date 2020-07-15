<template>
  <q-card
    draggable="false"
    dark
    square
    flat
    class="bg-grey-12"
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
      <q-img
        :alt="item.name"
        :src="item.thumbnail"
        :ratio="1"
        placeholder-src="~assets/placeholders/320x480.png"
        width="100%"
        height="180px"
        loading="lazy"
      />
    </a>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 text-grey-5">
        {{ item.name }}
      </div>
      <div class="text-subtitle2 text-grey-6">
        {{ Number(item.items || 0) | approximate }} items
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
        { label: 'Open', name: 'show', icon: 'folder_open' },
        { label: 'Edit', name: 'edit', icon: 'edit' },
        { label: 'Bookmark', name: 'save', icon: 'bookmark' },
        { label: 'Share', name: 'share', icon: 'share' }
      ]
    }
  },

  methods: {
    open (key) {
      switch (key) {
        case 'show':
          this.$router.push({
            name: 'playlist',
            params: {
              id: this.item.id,
              slug: this.item.slug
            }
          })
          break
        case 'edit':
          this.$store.dispatch('dialog/open', {
            component: 'PlaylistEdit',
            data: { id: this.item.id }
          })
          break
      }
    },

    onClick () {
      if (!this.menuActive) {
        this.open('show')
      }
    }
  }
}
</script>
