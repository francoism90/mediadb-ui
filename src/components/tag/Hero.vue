<template>
  <div class="container">
    <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
      {{ model.name }}
    </div>

    <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
      {{ Number(model.items) | approximate }} items •
      {{ Number(model.views) | approximate }} views
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    model () {
      return this.$store.getters['tag/getModel']
    }
  }
}
</script>
