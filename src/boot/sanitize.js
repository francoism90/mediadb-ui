import sanitizeHtml from 'sanitize-html'

export default function ({ Vue }) {
  // Allow reference as this.$sanitize
  Vue.prototype.$sanitize = sanitizeHtml
}

export { sanitizeHtml }
