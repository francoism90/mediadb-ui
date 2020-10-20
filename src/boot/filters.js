import approx from 'approximate-number'
import moment from 'moment'

export default function ({ Vue }) {
  Vue.filter('approximate', function (value) {
    return approx(value)
  })

  Vue.filter('timestamp', function (value) {
    return moment
      .utc(value * 1000)
      .format('HH:mm:ss')
      .replace(/^0(?:0:0?)?/, '')
  })

  Vue.filter('datestamp', function (value) {
    return moment(value).format('D MMMM Y')
  })
}
