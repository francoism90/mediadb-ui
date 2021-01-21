<template>
  <q-item
    v-ripple
    clickable
    class="notification-item"
    draggable="false"
  >
    <q-item-section>
      <q-item-label
        v-if="notification.title"
        lines="2"
      >
        {{ notification.title }}
      </q-item-label>

      <q-item-label
        v-if="notification.body"
        caption
        lines="3"
      >
        {{ notification.body }}
      </q-item-label>

      <q-item-label
        class="q-pt-xs"
        overline
      >
        {{ String(notification.created_at) | datestamp }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import Notification from 'src/models/Notification'

export default {
  props: {
    notification: {
      type: Notification,
      required: true
    }
  }
}
</script>
