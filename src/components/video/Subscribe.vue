<template>
  <div class="row items-center no-wrap">
    <div class="col">
      <router-link to="/" class="text-subtitle1 text-grey-5">
        {{ data.relationships.user.name }}
      </router-link>
      <div class="text-subtitle2 text-grey-6">
        {{ Number(data.relationships.user.views) | approximate }} subscribers
      </div>
    </div>

    <div class="col-auto">
      <q-btn
        unelevated
        color="grey-8"
        text-color="grey-4"
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
  }
}
</script>
