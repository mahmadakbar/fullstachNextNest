import { APIBaseURL } from '@utils/environment'
import axios from 'axios'

const satellite = axios.create({
  baseURL: APIBaseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

// Menambahkan interceptor ketika menerima response
satellite.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error.response)
  }
)

export default satellite
