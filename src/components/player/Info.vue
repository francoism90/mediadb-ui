<template>
  <q-card
    v-if="ready"
    :key="data.id"
    dark
    style="width: 530px"
  >
    <q-card-section
      style="max-height: 50vh"
      class="scroll q-gutter-y-md"
    >
      <p>
        {{ data.properties }}
      </p>
    </q-card-section>

    <q-card-actions
      align="right"
      class="q-mx-sm"
    >
      <q-btn
        v-close-popup
        flat
        label="OK"
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import modelModule from 'src/store/model'

export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters('model_info', {
      ready: 'isReady',
      data: 'getData'
    })
  },

  async created () {
    if (!this.$store.hasModule('model_info')) {
      this.$store.registerModule('model_info', modelModule)
    }

    await this.setModel()
  },

  beforeDestroy () {
    this.$store.unregisterModule('model_info')
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('model_info/fetch', {
        path: 'media/' + this.props.id
      })
    }
  }
}
</script>
