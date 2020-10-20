<template>
  <q-btn
    dense
    flat
    round
    icon="o_notifications"
    :to="{ name: 'notifications' }"
  >
    <q-tooltip>Notifications</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  data () {
    return {
      unread: false
    }
  },

  computed: {

  },

  created () {
    // this.setPending()

  }

//   methods: {
//     setPending () {
//       this.pending = this.$auth.user().notifications
//     }
//   }
}
</script>
