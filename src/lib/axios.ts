import axios from 'axios'

const axs = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
})
// Axios interceptor to attach JWT token to headers
axs.interceptors.request.use(
  (config) => {
    const storage = localStorage.getItem('userData')
    const userData = storage ? JSON.parse(storage) : null
    const token = userData.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default axs
