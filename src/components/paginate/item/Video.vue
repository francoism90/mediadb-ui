<template>
  <q-card dark square flat class="bg-black-bis">
    <router-link :to="{ name: 'video', params: { id: item.id, slug: item.slug }}">
      <preview :poster="item.placeholder" :src="item.preview" />
    </router-link>

    <q-card-section class="q-py-sm">
      <div class="row items-start no-wrap">
        <div class="col">
          <div @click="expanded = !expanded" class="cursor-pointer text-subtitle1 text-grey-5">{{ item.name }}</div>
          <div class="text-subtitle2 text-grey-4">
            <router-link class="text-grey-4 no-decoration" to="/">{{ item.relationships.user.name }}</router-link> •
              {{ Number(item.properties.duration) | timestamp }} •
              {{ Number(item.views) | approximate }} views
          </div>
          <div class="q-pt-xs">
            <tag v-for="(tag, index) in item.relationships.tags" :key="index" :item="tag" />
          </div>
        </div>

        <div class="col-auto">
          <q-btn
            color="grey-7"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click.native="expanded = !expanded"
          />
        </div>
      </div>
    </q-card-section>

    <div v-show="expanded">
      <q-separator />

      <q-btn-group spread stretch flat>
        <q-btn @click.prevent="openManager" flat no-wrap class="q-pa-xs" color="grey-5" size="11px" icon="create" label="Edit" />
        <q-btn @click.prevent="openCollect" flat no-wrap class="q-pa-xs" color="grey-5" size="11px" icon="add" label="Save" />
        <q-btn @click.prevent="openCollect" flat no-wrap class="q-pa-xs" color="grey-5" size="11px" icon="send" label="Share" />
      </q-btn-group>
    </div>
  </q-card>
</template>

<script>
export default {
  meta: {
    title: 'Library'
  },

  data () {
    return {
      expanded: false
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
    toggleActions () {
      this.expanded = !this.expanded
    },

    openCollect () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoCollect',
        data: { id: this.item.id }
      })
    },

    openManager () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoEdit',
        data: { id: this.item.id }
      })
    }
  }
}
</script>
