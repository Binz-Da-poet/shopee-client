import axios, { AxiosInstance } from 'axios'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { AuthResponse } from 'src/types/auth.type'

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
    const accessToken = this.AcessToken
    console.log(accessToken)
    console.log(this.AcessToken)
    this.instance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.authorization = this.AcessToken
        }
        if (config.url === '/auth/FileUpload') {
          config.headers['Content-Type'] = 'multipart/form-data'
          console.log(config)
        }
        if (config.url === '/Products/add') {
          console.log(accessToken)
        }

        return config
      },
      (error) => {
        Promise.reject(error)
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
          console.log(this.AcessToken)
          setAccessTokenToLS(this.AcessToken)
          setProfileToLS(data.user)
        } else if (url === '/logout') {
          this.AcessToken = ''
          clearLS()
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
