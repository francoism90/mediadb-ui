<template>
  <q-input
    v-model="description"
    dark
    square
    filled
    label="Description"
    clearable
    counter
    bottom-slots
    :error="$v.description.$invalid"
  >
    <template v-slot:prepend>
      <q-icon name="notes" />
    </template>

    <template v-slot:error>
      <span v-if="!$v.description.maxLength">Must have at most {{$v.description.$params.maxLength.max}} characters</span>
    </template>
  </q-input>
</template>

<script>
import { validateHandler } from 'src/mixins/form'
import { maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validateHandler],

  validations: {
    description: {
      maxLength: maxLength(4096)
    }
  },

  computed: {
    description: {
      get () {
        return this.data.description
      },

      set (value) {
        this.$store.commit(this.namespace + '/setData', {
          description: value
        })

        this.validate('description')
      }
    }
  }
}
</script>
