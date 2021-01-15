import approx from 'approximate-number'
import dayjs from 'dayjs'

export default function ({ Vue }) {
  Vue.prototype.$dayjs = dayjs

  Vue.filter('approximate', function (value) {
    return approx(value)
  })

  Vue.filter('timestamp', function (value) {
    if (value === Infinity) {
      value = 0
    }

    return new Date(value * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/^0(?:0:0?)?/, '')
  })

  Vue.filter('datestamp', function (value) {
    return dayjs(value).format('D MMMM YYYY')
  })
}
