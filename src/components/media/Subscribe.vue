<template>
  <div class="row items-center no-wrap">
    <div class="col">
      <router-link
        class="text-subtitle1 text-grey-5 cursor-pointer"
        :to="{ name: 'channel', params: { id: data.relationships.model.id }}"
      >
        {{ data.relationships.model.name }}
      </router-link>
      <div
        class="
        text-subtitle2
        text-grey-6"
      >
        {{ Number(data.relationships.model.views) | approximate }} subscribers
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
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('media', [
      'data'
    ])
  }
}
</script>
