import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/mn',
    timeout: 50000,
  })
  instance.interceptors.request.use(config => {
    return config
  })
  instance.interceptors.response.use(res => {
    return res.data
  })
  return instance(config)
}