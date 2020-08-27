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

    setMessage (error = {}) {
      this.message = get(error, 'data.message', null)
    },

    setErrors (error = {}) {
      this.errors = get(error, 'data.errors', {})
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
