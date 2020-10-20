import Shortkey from 'vue-shortkey'

export default ({ Vue }) => {
  Vue.use(Shortkey, {
    prevent: ['input', 'textarea']
  })
}
