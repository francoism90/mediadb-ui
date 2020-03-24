<template>
  <q-page padding>
    <q-btn flat label="Logout" color="primary" @click.prevent="logout" />
  </q-page>
</template>

<script>
export default {
  meta: {
    title: 'Account'
  },

  methods: {
    async logout () {
      try {
        await this.$store.dispatch('user/logout')

        this.$router.push({ name: 'home' })
      } catch (e) {
        alert(e || 'Unable to logout. Please try again later.')
      }
    }
  }
}
</script>
