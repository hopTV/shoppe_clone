import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import {
  clearLs,
  getAccessTokenFromLS,
  setAccessTokenToLs,
  setProfileToLs
} from './auth'

import { path } from 'src/constants/path'
import { URL_LOGIN, URL_REGISTER } from 'src/apis/auth.api'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
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
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data?.access_token
          setAccessTokenToLs(this.accessToken)
          setProfileToLs(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLs()
        }
        return response
      },

      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        if(error.response?.status === HttpStatusCode.Unauthorized) {
          clearLs()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
