export const dialogHandler = {
  data () {
    return {
      events: [
        { name: 'dialogOk', listener: 'onDialogOk' },
        { name: 'dialogHide', listener: 'onDialogHide' },
        { name: 'dialogCancel', listener: 'onDialogCancel' }
      ]
    }
  },

  created () {
    for (const event of this.events) {
      this.$root.$once(event.name, this[event.listener])
    }
  },

  beforeDestroy () {
    for (const event of this.events) {
      this.$root.$off(event.name, this[event.listener])
    }
  },

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
