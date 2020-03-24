<template>
  <div class="row items-center no-wrap">
    <div class="col">
      <router-link to="/" class="text-subtitle1 text-grey-5">
        {{ data.relationships.user.name }}
      </router-link>
      <div class="text-subtitle2 text-grey-4">
        {{ Number(data.relationships.user.views) | approximate }} subscribers
      </div>
    </div>

    <div class="col-auto">
      <q-btn
        unelevated
        color="grey-2"
        text-color="grey-6"
        label="Subscribe"
      />
    </div>
  </div>
</template>

<script>
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
        { label: 'Collections', name: 'collections', icon: 'favorite', action: false },
        { label: 'Users', name: 'profiles', icon: 'menu_open', action: false },
        { label: 'Library', name: 'home', icon: 'add', action: false },
        { label: 'Library', name: 'home', icon: 'flag', action: false }
      ],
      links: [
        { label: 'Library', name: 'home', icon: 'get_app', action: false },
        { label: 'Users', name: 'profiles', icon: 'share', action: false }
      ]
    }
  }
}
</script>
