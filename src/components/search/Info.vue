<template>
  <div class="fixed-center text-center">
    <template v-if="!ready && !query">
      <p>
        <q-icon
          name="search"
          style="font-size: 4rem;"
        />
      </p>
      <p class="text-h5 q-mb-xs">
        Search MediaDB
      </p>
      <p class="text-body2">
        Find videos, channels, playlists and tags.
      </p>
    </template>

    <template v-else-if="ready && !store && query && items === 0">
      <p>
        <q-icon
          name="error_outline"
          style="font-size: 4rem;"
        />
      </p>
      <p class="text-h5 q-mb-xs">
        No results found for "{{ query }}"
      </p>
      <p class="text-body2">
        Please make sure your words are spelled correctly or use less or different keywords.
      </p>
    </template>
  </div>
</template>
<script>

export default {
  props: {
    ready: {
      type: Boolean,
      default: false
    },

    store: {
      type: Object,
      default: () => {
        return {}
      }
    },

    query: {
      type: String,
      default: null
    },

    items: {
      type: Number,
      default: 0
    }
  }
}
</script>
