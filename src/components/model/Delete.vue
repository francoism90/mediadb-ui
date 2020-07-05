<template>
  <q-card dark>
    <q-card-section class="row items-center">
      <q-avatar icon="delete_forever" color="primary" text-color="white" />
      <span class="q-ml-sm">Are you sure you want to delete this item?</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Confirm" color="primary" @click.prevent="onConfirm" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    namespace: {
      type: String,
      default: 'model_edit'
    }
  },

  computed: {
    data () {
      return this.$store.getters[this.namespace + '/getData']
    }
  },

  methods: {
    async onConfirm () {
      await this.$store.dispatch(this.namespace + '/remove')

      this.$q.notify({
        progress: true,
        position: 'top',
        message: `${this.data.name} has been deleted.`,
        type: 'positive'
      })

      this.$store.dispatch('dialog/close')
    }
  }
}
</script>
