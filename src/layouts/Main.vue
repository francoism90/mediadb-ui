<template>
  <q-layout view="hHh lpR fFf">
    <back-to-top visibleoffset="300" bottom="1rem" right="1rem">
      <q-btn icon="expand_less" dense unelevated text-color="white" color="black" />
    </back-to-top>

    <q-dialog v-model="dialog" v-bind="dialogProps">
      <component :is="dialogComponent" :props="dialogData" />
    </q-dialog>

    <q-header class="header bg-black q-py-xs" height-hint="58">
      <q-toolbar class="toolbar">
        <q-btn dense round color="black-ter" icon="menu" @click="drawer = !drawer" />

        <router-link v-if="$q.screen.gt.xs" to="/" class="q-ml-md text-body2 text-grey-5">
          <q-toolbar-title shrink class="text-weight-bold">
            MediaDB
          </q-toolbar-title>
        </router-link>

        <q-space />

        <finder class="q-mx-lg" />

        <q-space />

        <div class="row no-wrap items-center">
          <q-btn class="q-mr-sm" round dense color="black-ter" icon="add">
            <q-tooltip>Upload video</q-tooltip>
          </q-btn>

          <q-btn round dense color="black-ter" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      dark
      bordered
      v-model="drawer"
      overlay
      :width="240"
      content-class="bg-black-bis"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(link, index) in links" :key="index">
          <q-item :to="{ name: link.name }" exact v-ripple>
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              {{ link.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="link.separator" spaced />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="q-pb-lg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {
    Finder: () => import('components/search/Finder'),
    VideoCollect: () => import('components/video/Collection'),
    VideoEdit: () => import('components/video/Edit')
  },

  data () {
    return {
      drawer: false,
      links: [
        { label: 'Library', name: 'home', icon: 'video_library', separator: false },
        { label: 'Collections', name: 'collections', icon: 'collections', separator: false },
        { label: 'Subscriptions', name: 'profiles', icon: 'subscriptions', separator: true },
        { label: 'History', name: 'profiles', icon: 'history', separator: false },
        { label: 'Watch later', name: 'profiles', icon: 'watch_later', separator: false },
        { label: 'Your uploads', name: 'profiles', icon: 'cloud_upload', separator: true },
        { label: 'Your account', name: 'account', icon: 'account_box', separator: false },
        { label: 'Settings', name: 'account', icon: 'settings', separator: false },
        { label: 'Sign out', name: 'account', icon: 'exit_to_app', separator: false }
      ]
    }
  },

  computed: {
    dialog: {
      get () {
        return this.$store.getters['dialog/getModel']
      },

      set (value) {
        this.$store.commit('dialog/setModel', value)
      }
    },

    dialogProps () {
      return this.$store.getters['dialog/getProps']
    },

    dialogComponent () {
      return this.$store.getters['dialog/getComponent']
    },

    dialogData () {
      return this.$store.getters['dialog/getData']
    }
  }
}
</script>
