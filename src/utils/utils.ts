import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  )
}

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}

export const rateSale = (original: number, sale: number) =>
  Math.round(((original - sale) / original) * 100) + '%'

// export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
//   return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
// }
