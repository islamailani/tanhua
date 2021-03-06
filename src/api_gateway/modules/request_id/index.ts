export default function requestId ({ hook }): void {
  hook('tanhua:proxy:userResHeaderDecorator', function (headers, userReq, userRes, proxyReq, proxyRes): void {
    headers['x-request-id'] = userReq['request_id']
  })

  hook('tanhua:proxy:proxyReqOptDecorator', function (proxyReqOpts, srcReq): void {
    proxyReqOpts.headers['x-request-id'] = srcReq['request_id']
  })
}
