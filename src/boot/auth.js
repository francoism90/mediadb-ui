import { axiosInstance } from './axios'
import auth from '@websanova/vue-auth/dist/v2/vue-auth.common.js'
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.js'
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.js'
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.js'

export default function ({ Vue, router }) {
  Vue.use(auth, {
    plugins: {
      http: axiosInstance,
      router: router
    },
    drivers: {
      auth: driverAuthBearer,
      http: driverHttpAxios,
      router: driverRouterVueRouter
    },
    options: {
      rolesKey: 'roles',
      authRedirect: { name: 'login' },
      notFoundRedirect: { name: '404' },
      forbiddenRedirect: { name: '403' }
    }
  })
}
