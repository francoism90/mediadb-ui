export const validateHandler = {
  props: {
    namespace: {
      type: String,
      default: 'form_edit'
    }
  },

  computed: {
    data () {
      return this.$store.getters[this.namespace + '/getData']
    }
  },

  methods: {
    validate (key) {
      if (!key || !this.$v[key]) {
        return
      }

      this.$v[key].$touch()

      this.$store.commit(this.namespace + '/setValidations', {
        [key]: {
          invalid: this.$v[key].$invalid,
          dirty: this.$v[key].$dirty,
          error: this.$v[key].$error
        }
      })
    }
  }
}
