<template>
  <q-page class="container fluid">
    <hero />
    <account />
  </q-page>
</template>

<script>
export default {
  components: {
    Account: () => import('components/settings/Account'),
    Hero: () => import('components/settings/Hero')
  },

  meta () {
    return {
      title: 'Settings'
    }
  }
}
</script>
