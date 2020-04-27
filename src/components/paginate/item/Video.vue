<template>
  <q-card dark square flat class="bg-grey-12" draggable="false">
    <q-menu touch-position context-menu dark square @before-show="menuActive = true" @hide="menuActive = false">
      <q-list bordered padding dark style="width: 260px">
        <q-item
          v-for="(entity, index) in menu"
          :key="`menu-${index}`"
          clickable
          dark
          v-close-popup
          @click.prevent="open(entity.name)"
        >
          <q-item-section side>
            <q-icon :name="entity.icon" />
          </q-item-section>
          <q-item-section>{{ entity.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <a :class="menuActive ? '' : 'cursor-pointer'" @click.prevent="onClick">
      <preview :poster="item.placeholder" :src="item.preview" />
    </a>

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 text-grey-5">{{ item.name }}</div>
      <div class="text-subtitle2 text-grey-6">
        <router-link class="text-grey-6 no-decoration" to="/">{{ item.relationships.user.name }}</router-link> •
        {{ Number(item.properties.duration || 0) | timestamp }} •
        {{ Number(item.views || 0) | approximate }} views
      </div>
      <div class="q-pt-xs">
        <tag v-for="(tag, index) in item.relationships.tags" :key="index" :item="tag" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      menuActive: false,
      menu: [
        { label: 'Play', name: 'play', icon: 'play_arrow' },
        { label: 'Edit', name: 'edit', icon: 'edit' },
        { label: 'Queue', name: 'next', icon: 'playlist_play' },
        { label: 'Save to..', name: 'save', icon: 'playlist_add' },
        { label: 'Share', name: 'share', icon: 'share' }
      ]
    }
  },

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

  methods: {
    open (key) {
      switch (key) {
        case 'play':
          this.$router.push({
            name: 'video',
            params: {
              id: this.item.id, slug: this.item.slug
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
