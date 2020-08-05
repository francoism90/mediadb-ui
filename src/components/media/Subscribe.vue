<template>
  <div class="row items-center no-wrap">
    <div class="col">
      <router-link
        class="text-subtitle1 text-grey-5 cursor-pointer"
        :to="{ name: 'channel', params: { id: media.relationships.model.id }}"
      >
        {{ media.relationships.model.name }}
      </router-link>
      <div
        class="
        text-subtitle2
        text-grey-6"
      >
        {{ Number(media.relationships.model.views) | approximate }} subscribers
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
    media: {
      type: Object,
      required: true
    }
  }
}
</script>
