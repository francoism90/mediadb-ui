<template>
  <div v-if="state.ready" :key="namespace">
    <q-select
      dark
      borderless
      square
      dense
      v-model="model"
      dropdown-icon="keyboard_arrow_down"
      :options="options"
      :options-dark="true"
      :options-square="true"
      :options-sanitize="true"
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
    onChange (option) {
      this.$store.dispatch(this.namespace + '/reset', {
        params: { [this.field]: option.value || null }
      })
    }
  }
}
</script>
