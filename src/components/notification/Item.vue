<template>
  <q-item
    v-ripple
    clickable
  >
    <q-item-section
      side
      top
    >
      <q-icon
        name="o_message"
        color="grey-5"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ notification.data.message }}</q-item-label>
      <q-item-label overline>
        {{ notification.data.message }}
      </q-item-label>
      <q-item-label
        caption
        lines="1"
      >
        some@email.com
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import NotificationModel from 'src/models/Notification'

export default {
  props: {
    notification: {
      type: NotificationModel,
      required: true
    }
  }
}
</script>
