import { User } from 'src/types/user.type'
export const LocalStorageEventTarget = new EventTarget()
export const setAccessTokenToLS = (access_token: string | '') => {
  localStorage.setItem('access_token', access_token)
}

export const setPayPurchasesToLS = (
  ShoppingCartId: number | undefined,
  purchaseIds: number[],
  address: string,
  fullName: string,
  phoneNumber: string
) => {
  const data = { ShoppingCartId, purchaseIds, address, fullName, phoneNumber }
  localStorage.setItem('PayPurchases', JSON.stringify(data))
}
export const getPayPurchasesFromLS = () => JSON.parse(localStorage.getItem('PayPurchases') || '')

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
export const setProductId = (id: number) => {
  localStorage.removeItem('productID')
  localStorage.setItem('productID', JSON.stringify(id))
}
export const getProductId = () => localStorage.getItem('productID') || ''
