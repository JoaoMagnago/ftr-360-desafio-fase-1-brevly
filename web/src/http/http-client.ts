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
    const message =
      error.response?.data?.message ||
      error.message ||
      'Unknown API error occurred'
    return Promise.reject(new Error(message))
  }
)
