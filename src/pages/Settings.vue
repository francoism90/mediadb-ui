<template>
  <q-page class="container fluid">
    <account />
    <information />
  </q-page>
</template>

<script>
export default {
  components: {
    Account: () => import('components/settings/Account'),
    Information: () => import('components/settings/Information')
  },

  meta () {
    return {
      title: 'Settings'
    }
  }
}
</script>
