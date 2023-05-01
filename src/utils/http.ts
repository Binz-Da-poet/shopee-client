import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { AuthResponse } from 'src/types/auth.type'

import { toast } from 'react-toastify'
import { AUTHORIZED_URLS } from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private AcessToken: string

  constructor() {
    this.AcessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = getAccessTokenFromLS()
        config.headers.authorization = accessToken ? `Bearer ${accessToken}` : ''
        config.headers['Content-Type'] = config.url === '/FileUpload' ? 'multipart/form-data' : 'application/json'
        if (config != undefined && AUTHORIZED_URLS.includes(config.url as string)) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const data = response.data as AuthResponse
        if (url === '/auth/authenticate' || url === '/auth/register') {
          if (data.token) {
            this.AcessToken = data.token
          }
          setAccessTokenToLS(this.AcessToken)
          setProfileToLS(data.user)
        } else if (url === '/logout') {
          this.AcessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data

          const message = data.message || error.request.status
          toast.error(message === HttpStatusCode.Forbidden ? 'Token sai hoặc hết hạn' : data.message)
        }
        if (error.response?.status === HttpStatusCode.Forbidden) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
