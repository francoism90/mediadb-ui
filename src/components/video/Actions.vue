<template>
  <div>
    <q-btn-group class="q-mr-md" flat>
      <q-btn
        v-for="(item, index) in manage"
        :key="index"
        dense
        text-color="grey-5"
        no-caps
        :icon="item.icon"
        @click="callback(item.action)"
      >
        <q-tooltip>{{ item.label }}</q-tooltip>
      </q-btn>
    </q-btn-group>

    <q-btn-group class="q-ml-md" flat>
      <q-btn
        v-for="(item, index) in links"
        :key="index"
        dense
        text-color="grey-5"
        no-caps
        :icon="item.icon"
        @click="callback(item.action)"
      >
        <q-tooltip>{{ item.label }}</q-tooltip>
      </q-btn>
    </q-btn-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },

    meta: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      manage: [
        { label: 'Favorite', icon: 'favorite_border', action: false },
        { label: 'Snapshot', icon: 'photo', action: { type: 'snapshot' } },
        { label: 'Edit', icon: 'menu_open', action: { type: 'edit' } }
      ],
      links: [
        { label: 'Download', icon: 'get_app', action: { type: 'download' } },
        { label: 'Report', icon: 'flag', action: false },
        { label: 'Share', icon: 'share', action: false }
      ]
    }
  },

  methods: {
    ...mapActions('player', [
      'callback'
    ])
  }
}
</script>
