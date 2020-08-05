import { get, has } from 'lodash'

export const formHandler = {
  data () {
    return {
      form: null,
      message: null,
      errors: {}
    }
  },

  methods: {
    setForm (data = {}) {
      this.form = data
    },

    resetErrors () {
      this.message = null
      this.errors = {}
    },

    setMessage (message = '') {
      this.message = message
    },

    setErrors (errors = {}) {
      this.errors = errors
    },

    hasError (field) {
      return has(this.errors, field)
    },

    getError (field) {
      return get(this.errors, `${field}[0]`)
    },

    getErrors (field) {
      return get(this.errors, field)
    }
  }
}
