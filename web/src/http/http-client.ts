import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

httpClient.interceptors.response.use(
  response => response,
  error => {
    const normalizedError = new Error(
      error.response?.data?.message || error.message || 'Unknown API error'
    )
    return Promise.reject(normalizedError)
  }
)
