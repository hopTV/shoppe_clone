import { User } from 'src/types/user.type'

export const setAccessTokenToLs = (access_token: string) => {
  console.log('vào đây')

  localStorage.setItem('access_token', access_token)
}

export const LocalStorageEventTarget = new EventTarget()

export const clearLs = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLsEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLsEvent)
}

export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') || ''

export const getProfileFormLs = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLs = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
