import { axiosInstance } from './axios'
import auth from '@websanova/vue-auth'
import authBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js'
import httpAxiosResource from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js'
import routerVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js'

export default function ({ Vue, router }) {
  Vue.axios = axiosInstance
  Vue.router = router

  Vue.use(auth, {
    auth: authBearer,
    http: httpAxiosResource,
    router: routerVueRouter,
    rolesKey: 'roles',
    notFoundRedirect: { name: '404' },
    forbiddenRedirect: { name: '403' }
  })
}
