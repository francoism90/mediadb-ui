import { axiosInstance } from './axios'
import Echo from 'laravel-echo'

export default function ({ Vue }) {
  Vue.prototype.$pusher = require('pusher-js')

  Vue.prototype.$echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.WS_KEY,
    cluster: process.env.WS_CLUSTER,
    wsHost: process.env.WS_HOST,
    wsPort: process.env.WS_PORT,
    wssPort: process.env.WS_PORT,
    disableStats: true,
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: process.env.API_URL + '/broadcasting/auth',
    auth: {
      headers: {
        Authorization: null
      }
    },
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          axiosInstance.post('/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name
          })
            .then(response => {
              callback(false, response.data) // eslint-disable-line
            })
            .catch(error => {
              callback(true, error) // eslint-disable-line
            })
        }
      }
    }
  })
}
