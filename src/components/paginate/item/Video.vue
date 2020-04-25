<template>
  <q-card dark square flat class="bg-grey-12" draggable="false">
    <q-menu touch-position context-menu dark square @before-show="setMenuActive(true)" @hide="setMenuActive(false)">
      <q-list bordered padding dark style="width: 260px">
        <q-item clickable dark v-close-popup>
          <q-item-section side>
            <q-icon name="playlist_play" />
          </q-item-section>
          <q-item-section>Play next</q-item-section>
        </q-item>

        <q-item clickable dark v-close-popup @click.prevent="edit">
          <q-item-section side>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>Edit</q-item-section>
        </q-item>

        <q-item clickable dark v-close-popup @click.prevent="save">
          <q-item-section side>
            <q-icon name="playlist_add" />
          </q-item-section>
          <q-item-section>Save to..</q-item-section>
        </q-item>

        <q-item clickable dark v-close-popup>
          <q-item-section side>
            <q-icon name="share" />
          </q-item-section>
          <q-item-section>Share</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <a :class="menuActive ? '' : 'cursor-pointer'" @click.prevent="open">
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
      menuActive: false
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
    edit () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoEdit',
        data: { id: this.item.id }
      })
    },

    save () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoCollect',
        data: { id: this.item.id }
      })
    },

    open () {
      if (!this.menuActive) {
        this.$router.push({
          name: 'video',
          params: {
            id: this.item.id, slug: this.item.slug
          }
        })
      }
    },

    setMenuActive (value) {
      this.menuActive = value
    }
  }
}
</script>
