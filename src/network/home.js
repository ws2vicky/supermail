import { request } from "./request"
export function getHomeMultidate() {
  return request({
    url: '/home/multidata',
  })
}



