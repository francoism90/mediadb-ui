<template>
  <div :key="namespace">
    <q-select
      v-model="model"
      :name="field"
      :loading="!state.ready"
      dark
      square
      dense
      dropdown-icon="keyboard_arrow_down"
      :options="options"
      option-label="label"
      option-value="value"
      options-dark
      options-sanitize
      :display-value="model.label"
      popup-content-class="dropdown"
      @input="onChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    namespace: {
      type: String,
      required: true
    },

    field: {
      type: String,
      required: true
    },

    options: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      model: null
    }
  },

  computed: {
    state () {
      return this.$store.state[this.namespace]
    }
  },

  created () {
    const selected = this.state.params[this.field] || this.options[0].value

    this.model = this.options.find(x => x.value === selected)
  },

  methods: {
    async onChange (option) {
      await this.$store.dispatch(this.namespace + '/reset', {
        params: { [this.field]: option.value || null }
      })
    }
  }
}
</script>
