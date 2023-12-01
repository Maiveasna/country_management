import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT,
  isServer = typeof window === "undefined"

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})
API.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("token")?.value
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    )

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    var responseLogger = (response: AxiosResponse) => {
      return response
    }
    const responseErrorLogger = (error: AxiosError) => {
      error && error.response && console.log(error.response.data)
      return Promise.reject(error)
    }
    API.interceptors.response.use(responseLogger, responseErrorLogger)
  }
  return config
})

export default API
