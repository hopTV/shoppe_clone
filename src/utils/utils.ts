import axios, { AxiosError } from "axios"
import HttpStatusCode from "src/constants/httpStatusCode"

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
//   return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
// }