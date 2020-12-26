<template>
  <q-page>
    <info />
    <account />
  </q-page>
</template>

<script>
export default {
  components: {
    Account: () => import('components/settings/Account'),
    Info: () => import('components/settings/Info')
  },

  meta () {
    return {
      title: 'Settings'
    }
  }
}
</script>
