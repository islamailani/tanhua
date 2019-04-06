import { apis } from '~/src/api_gateway/config/apis'

export default {
  apis,
  modules: [
    '~/src/api_gateway/modules/dashboard',
    '~/src/api_gateway/modules/oauth2'
  ]
}
