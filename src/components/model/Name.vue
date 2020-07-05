<template>
  <q-input
    v-model="name"
    dark
    square
    filled
    label="Name"
    clearable
    counter
    bottom-slots
    :error="$v.name.$invalid"
  >
    <template v-slot:prepend>
      <q-icon name="label" />
    </template>

    <template v-slot:error>
      <span v-if="!$v.name.required">Field is required</span>
      <span v-if="!$v.name.maxLength">Must have at most {{$v.name.$params.maxLength.max}} characters</span>
    </template>
  </q-input>
</template>

<script>
import { validateHandler } from 'src/mixins/form'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validateHandler],

  validations: {
    name: {
      required,
      maxLength: maxLength(255)
    }
  },

  computed: {
    name: {
      get () {
        return this.data.name
      },

      set (value) {
        this.$store.commit(this.namespace + '/setData', {
          name: value
        })

        this.validate('name')
      }
    }
  }
}
</script>
