<template>
  <q-item clickable dark class="no-padding" @click.prevent="onClick(item)" v-ripple>
      <q-item-section side>
        <q-avatar square size="48px" color="grey-6" text-color="grey-3">
          {{ item.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label class="text-grey-5" caption>{{ item.media }} items</q-item-label>
      </q-item-section>
    </q-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    onClick (value) {
      // TODO: push user route
    }
  }
}
</script>
