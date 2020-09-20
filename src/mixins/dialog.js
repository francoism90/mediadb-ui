export const dialogHandler = {
  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onDialogOk () {
      this.$emit('ok')
      this.hide()
    },

    onDialogCancel () {
      this.hide()
    }
  }
}
